"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
var posterGit = require("../../logic/postGit");
var authenticator = require("../../logic/authenticate")
var formLib = new botbuilder.Library("createRepo");

formLib
    .dialog("createRepo", [
        function (session) {
            //presenta la lista dei framework
            botbuilder.Prompts.choice(session, lang.welcome.intro, lang.welcome.frameworks, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.welcome.retry
            })
        },
        function (session, results) {
            //memorizza framework per girarlo all'azione di create
            session.conversationData.framework = results.response.entity;
            //messaggio di conferma del framework selezionato
            var confirmMsg = utils.format(lang.confirmFramework, session.conversationData.framework);
            session.say(confirmMsg);
            //richiede il nome dell'app
            botbuilder.Prompts.text(session, lang.insertAppName);
        },
        function (session, results) {
            //memorizza il nome dell'app per girarlo all'azione di create
            session.conversationData.appName = results.response
            //richiede eventuale descrizione del repo
            botbuilder.Prompts.text(session, lang.insertRepoDesc);
        },
        function (session, results) {
            //memorizza il nome del repo per girarlo all'azione di create
            session.conversationData.repoDescription = results.response
            //inizia il dialogo di check credenziali se non conosce già l'utente
            if (session.userData.username == null) {
                session.beginDialog("checkCredentials");
            } else {
                //se conosce già l'utente chiede conferma sull'utenza loggata
                var confirmUser = utils.format(lang.loginBypass, session.userData.username);
                session.say(confirmUser);
                botbuilder.Prompts.choice(session, lang.keepLogin, lang.yesNo, {
                    listStyle: botbuilder.ListStyle.button
                });
            }
        },
        function (session, results, next) {
            // se l'utente vuole cambiare utenza parte il dialogo di login
            if (results.response.entity == "NO") {
                session.beginDialog("checkCredentials");
            } else {
                next();
            }
        },
        function (session, results) {
            var confirmApp = utils.format(lang.confirmApp, session.conversationData.appName, session.conversationData.framework, session.conversationData.appName);
            botbuilder.Prompts.choice(session, confirmApp, lang.yesNo, {
                listStyle: botbuilder.ListStyle.button
            });
        },
        function (session, results, next) {
            // se l'utente ha sbagliato a digitare azzera il dialogo
            if (results.response.entity == "NO") {
                session.replaceDialog('createRepo', { reprompt: true });
                session.endConversation;
            } else {
                next();
            }
        },
        function (session, results) {
            //chiamata POST: framework e appName presi dall'input del bot
            posterGit(session.conversationData.framework, session.conversationData.appName, session.conversationData.repoDescription, function (exitCode, resp) {
                console.log(exitCode);
                console.log(resp);
                if (exitCode == 1) {
                    var errorMessage = utils.format(lang.errorMessage, resp);
                    session.say(errorMessage);
                } else if (exitCode == 2) {
                    session.say(lang.genericErrorMessage);
                } else {
                    var endMessage = utils.format(lang.endMessage, resp);
                    session.say(endMessage);
                }
            })
        }]
    )
    .endConversationAction(
        "annullaCreate", "OK BYE NOW.",
        {
            matches: /^cancel.*$|^annull.*$/i,
            confirmPrompt: "This will cancel the repository creation. Are you sure?"
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
                    if (exitCode != 0) {
                        var errorMessage = utils.format(lang.errorMessage, resp);
                        session.say(errorMessage);
                        session.endDialog;
                    } else {
                        session.say(lang.wrongCredentials);
                        session.replaceDialog('checkCredentials', { reprompt: true });
                        session.endDialog;
                    }
                } else {
                    //memorizza password per girarla all'azione di deploy
                    session.conversationData.password = results.response;
                    //memorizza nome e pwd dell'utente in sessione
                    session.userData.username = session.conversationData.username;
                    session.userData.password = session.conversationData.password;
                    //conferma login
                    session.say(lang.loginConfirm);
                    //torna al dialogo padre
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

module.exports = formLib;