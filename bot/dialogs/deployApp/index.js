"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
var poster = require("../../logic/post");
var authenticator = require("../../logic/authenticate")
var formLib = new botbuilder.Library("deployApp");

formLib
    .dialog("deployApp", [
        function (session) {

            botbuilder.Prompts.choice(session, lang.welcome.intro, lang.welcome.apps, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.welcome.retry
            })
        },
        function (session, results) {
            //memorizza appName per girarlo all'azione di deploy
            session.conversationData.appToDeploy = results.response.entity;
            //messaggio di conferma dell'App selezionata
            var confirmMsg = utils.format(lang.confirmApp, session.conversationData.appToDeploy);
            session.say(confirmMsg);
            //richiede su quale Env deployare
            botbuilder.Prompts.choice(session, lang.chooseEnv.intro, lang.chooseEnv.envs, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.chooseEnv.retry
            })
        },
        function (session, results) {
            //memorizza envName per girarlo all'azione di deploy
            session.conversationData.envName = results.response.entity;
            //messaggio di conferma dell'env selezionato
            var confirmEnv = utils.format(lang.confirmEnv, session.conversationData.envName);
            session.say(confirmEnv);
            //se l'env è PROD richiede anche la versione dell'app da deployare
            if (session.conversationData.envName == "PROD") {
                session.beginDialog("insertVersion");
            }
            //inizia il dialogo di check credenziali
            session.beginDialog("checkCredentials");
        },
        function (session, results) {
            if (session.conversationData.envName == "QAS") {
                var confirmDeploy = utils.format(lang.confirmDeploy, session.conversationData.appToDeploy, session.conversationData.envName);
                session.say(confirmDeploy);
            } else {
                var confirmDeployProd = utils.format(lang.confirmDeployPROD, session.conversationData.appToDeploy, session.conversationData.appVersion, session.conversationData.envName);
                session.say(confirmDeployProd);
            }
            //chiamata POST: dati utente, framework BW6 hardcoded, env e app presi dall'input del bot
            poster(session.conversationData.username, session.conversationData.password, 'BW6', session.conversationData.envName, session.conversationData.appToDeploy, session.conversationData.appVersion, function (resp) {
                console.log(resp);
                if (resp != "started") {
                    var errorMessage = utils.format(lang.deployErrorMessage, resp);
                    session.say(errorMessage);
                } else {
                    var endMessage = utils.format(lang.endMessage, session.conversationData.appToDeploy, session.conversationData.envName);
                    session.say(endMessage);
                }
            });
        }]
    )
    .endConversationAction(
    "annullaDeploy", "OK BYE NOW.",
    {
        matches: /^cancel.*$|^annull.*$/i,
        confirmPrompt: "This will cancel the deploy. Are you sure?"
    });

formLib
    .dialog("checkCredentials", [
        function (session) {
            //richiede il nomeUtente Active Directory
            botbuilder.Prompts.text(session, lang.insertUsername);
        },
        function (session, results) {
            //memorizza username per girarlo all'azione di deploy
            session.conversationData.username = results.response;
            //messaggio di conferma username
            var confirmUser = utils.format(lang.confirmUser, session.conversationData.username);
            session.say(confirmUser);
            //richiede la password ActiveDirectory
            botbuilder.Prompts.text(session, lang.insertPassword);
        },
        function (session, results) {

            authenticator(session.conversationData.username, results.response, function (resp) {
                console.log(resp);
                if (resp != "Login successful") {
                    session.say(lang.wrongCredentials);
                    session.replaceDialog('checkCredentials', { reprompt: true });
                    session.endDialog;
                } else {
                    //memorizza password per girarla all'azione di deploy
                    session.conversationData.password = results.response;
                    session.endDialogWithResult(results);
                }
            });
        }])
        .endConversationAction(
            "annullaDeploy", "OK BYE NOW.",
            {
                matches: /^cancel.*$|^annull.*$/i,
                confirmPrompt: "This will cancel the deploy. Are you sure?"
            });

formLib
    .dialog("insertVersion", [
        function (session) {
            //richiede la versione
            botbuilder.Prompts.text(session, lang.insertVersion);
        },
        function (session, results) {
            //memorizza la versione
            session.conversationData.appVersion = results.response;
            //restituisce la versione al dialogo chiamante
            session.endDialogWithResult(results);
        }
        ])
    .endConversationAction(
        "annullaDeploy", "OK BYE NOW.",
        {
            matches: /^cancel.*$|^annull.*$/i,
            confirmPrompt: "This will cancel the deploy. Are you sure?"
    });

module.exports = formLib;