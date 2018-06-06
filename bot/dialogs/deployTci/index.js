"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
var posterTci = require("../../logic/postTci");
var tGetter = require("../../logic/getTopicListGit");
var getter = require("../../logic/getAppListGit");
var authenticator = require("../../logic/authenticate")
var formLib = new botbuilder.Library("deployTci");

var framework = "TCI";

formLib
    .dialog("deployTci", [
        function (session) {
            //attendere prego
            session.say(lang.gitTopicWait);
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
            var gitWait = utils.format(lang.gitWait, chosenTopic);
            session.say(gitWait);
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
        function (session, results, next) {
            //memorizza envName per girarlo all'azione di deploy
            session.conversationData.envName = results.response.entity;
            //messaggio di conferma dell'env selezionato
            var confirmEnv = utils.format(lang.confirmEnv, session.conversationData.envName);
            session.say(confirmEnv);
            //se l'env � PROD richiede anche la versione dell'app da deployare
            if (session.conversationData.envName == "PROD") {
                session.beginDialog("insertVersion");
            } else {
                next();
            }
        },
        function (session, results) {
            //chiede in quale sandbox si desidera deployare
            if (session.conversationData.envName == "PROD") {
                botbuilder.Prompts.choice(session, lang.chooseSandbox.intro, lang.chooseSandbox.prodSandboxes, {
                    listStyle: botbuilder.ListStyle.button,
                    retryPrompt: lang.chooseSandbox.retry
                })
            } else {
                botbuilder.Prompts.choice(session, lang.chooseSandbox.intro, lang.chooseSandbox.testSandboxes, {
                    listStyle: botbuilder.ListStyle.button,
                    retryPrompt: lang.chooseSandbox.retry
                })
            }
        },
        function (session, results) {
            //memorizza sandbox per girarla all'azione di deploy
            session.conversationData.sandboxName = results.response.entity;
            //messaggio di conferma della sandbox selezionata
            var confirmSandbox = utils.format(lang.confirmSandbox, session.conversationData.sandboxName);
            session.say(confirmSandbox);
            //inizia il dialogo di check credenziali se non conosce gi� l'utente
            if (session.userData.username == null) {
                session.beginDialog("checkCredentials");
            } else {
                //se conosce gi� l'utente chiede conferma sull'utenza loggata
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
            //chiede l'ultima conferma del deploy
            if (session.conversationData.envName == "QAS") {
                var startDeploy = utils.format(lang.startDeploy, session.conversationData.appToDeploy, session.conversationData.envName, session.conversationData.sandboxName);
                botbuilder.Prompts.choice(session, startDeploy, lang.yesNo, {
                    listStyle: botbuilder.ListStyle.button
                });
            } else {
                var startDeployProd = utils.format(lang.startDeployProd, session.conversationData.appToDeploy, session.conversationData.appVersion, session.conversationData.envName, session.conversationData.sandboxName);
                botbuilder.Prompts.choice(session, startDeploy, lang.yesNo, {
                    listStyle: botbuilder.ListStyle.button
                });
            }
        },
        function (session, results) {
            if (results.response.entity == "YES") {
                session.say(lang.confirmDeploy);
                //chiamata POST: dati utente, env app e sandbox presi dall'input del bot
                posterTci(session.userData.username, session.userData.password, session.conversationData.envName, session.conversationData.sandboxName, session.conversationData.appToDeploy, session.conversationData.appVersion, function (resp) {
                    console.log(resp);
                    if (resp != "started") {
                        var errorMessage = utils.format(lang.errorMessage, resp);
                        session.say(errorMessage);
                        session.endConversation;
                    } else {
                        var endMessage = utils.format(lang.endMessage, session.conversationData.appToDeploy, session.conversationData.envName, session.conversationData.sandboxName);
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

formLib
    .dialog("insertVersion", [
        function (session) {
            //richiede la versione
            botbuilder.Prompts.text(session, lang.insertVersion);
        },
        function (session, results) {
            //memorizza la versione
            session.conversationData.appVersion = results.response;
            //torna al dialogo chiamante
            session.endDialog();
        }
    ])
    .endConversationAction(
        "annullaDeploy", "OK BYE NOW.",
        {
            matches: /^cancel.*$|^annull.*$/i,
            confirmPrompt: "This will cancel the deploy. Are you sure?"
        });

module.exports = formLib;