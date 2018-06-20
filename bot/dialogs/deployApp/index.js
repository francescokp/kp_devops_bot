"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
// proxied
//var poster = require("../../logic/post");
var poster = require("../../logic/proxiedPost");
//
var tGetter = require("../../logic/getTopicListGit");
var getter = require("../../logic/getAppListGit");
var login = require("../login")
var authenticator = require("../../logic/authenticate");
var formLib = new botbuilder.Library("deployApp");

var framework = "BW6";

formLib
    .dialog("deployApp", [
        function (session) {
            //attendere prego
            session.say(lang.gitTopicWait);
            session.sendTyping();
            //scarica elenco topic da GitHub
            tGetter(framework, function (exitCode, resp) {
                if (exitCode == 0) {
                    botbuilder.Prompts.choice(session, lang.chooseTopic.intro, resp, {
                        listStyle: botbuilder.ListStyle.button,
                        retryPrompt: lang.chooseTopic.retry
                    });
                } else {
                    var gitErrorMessage = utils.format(lang.errorMessage, resp);
                    session.say(gitErrorMessage);
                    session.endConversation;
                }
            });
        },
        function (session, results) {
            //memorizza topic per filtrare successiva chiamata
            var chosenTopic = results.response.entity;
            //attendere prego
            //attendere prego
            var gitWait = utils.format(lang.gitWait, chosenTopic);
            session.say(gitWait);
            session.sendTyping();
            //scarica elenco App da GitHub
            getter(framework, chosenTopic, function (exitCode, resp) {
                if (exitCode == 0) {
                    botbuilder.Prompts.choice(session, lang.welcome.intro, resp, {
                        listStyle: botbuilder.ListStyle.button,
                        retryPrompt: lang.welcome.retry
                    });
                } else {
                    var gitErrorMessage = utils.format(lang.errorMessage, resp);
                    session.say(gitErrorMessage);
                    session.endConversation;
                }
            });
        },
        function(session, results) {
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
        function(session, results) {
            //memorizza envName per girarlo all'azione di deploy
            session.conversationData.envName = results.response.entity;
            //messaggio di conferma dell'env selezionato
            var confirmEnv = utils.format(lang.confirmEnv, session.conversationData.envName);
            session.say(confirmEnv);
            //se l'env è PROD richiede anche la versione dell'app da deployare
            if (session.conversationData.envName == "PROD") {
                session.beginDialog("insertVersion");
            }
            //inizia il dialogo di check credenziali se non conosce già l'utente
            if (session.userData.username == null) {
                session.beginDialog("login:checkCredentials");
            } else {
                //se conosce già l'utente chiede conferma sull'utenza loggata
                var confirmUser = utils.format(lang.loginBypass, session.userData.username);
                session.say(confirmUser);
                botbuilder.Prompts.choice(session, lang.keepLogin, lang.yesNo, {
                    listStyle: botbuilder.ListStyle.button
                });
            }
        },
        function(session, results, next) {
            // se l'utente vuole cambiare utenza parte il dialogo di login
            if (results.response.entity == "NO") {
                session.beginDialog("login:checkCredentials");
            } else {
                next();
            }
        },
        function(session, results) {
            //chiede l'ultima conferma del deploy
            if (session.conversationData.envName == "QAS") {
                var startDeploy = utils.format(lang.startDeploy, session.conversationData.appToDeploy, session.conversationData.envName);
                botbuilder.Prompts.choice(session, startDeploy, lang.yesNo, {
                    listStyle: botbuilder.ListStyle.button
                });
            } else {
                var startDeployProd = utils.format(lang.startDeployProd, session.conversationData.appToDeploy, session.conversationData.appVersion, session.conversationData.envName);
                botbuilder.Prompts.choice(session, startDeployProd, lang.yesNo, {
                    listStyle: botbuilder.ListStyle.button
                });
            }
        },
        function(session, results) {
            if (results.response.entity == "YES") {
                session.say(lang.confirmDeploy);
                session.sendTyping();
                //chiamata POST: dati utente, env e app presi dall'input del bot
                poster(session.userData.username, session.userData.password, session.conversationData.envName, session.conversationData.appToDeploy, session.conversationData.appVersion, function(resp) {
                    console.log(resp);
                    if (resp != "started") {
                        var errorMessage = utils.format(lang.errorMessage, resp);
                        session.say(errorMessage);
                        session.endConversation;
                    } else {
                        var endMessage = utils.format(lang.endMessage, session.conversationData.appToDeploy, session.conversationData.envName);
                        session.say(endMessage);
                        session.endConversation;
                    }
                });
            } else {
                session.say(lang.cancelDeploy);
                session.endConversation;
            }

        }]
    )
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
            matches: /^cancel.*$|^annull.*|^.*sbagl.*$/i,
            confirmPrompt: "This will cancel the deploy. Are you sure?"
    });

module.exports = formLib;