"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var authenticator = require("../../logic/authenticate")
const lang = require("./en");

var loginDialog = new botbuilder.Library("login");

loginDialog
    .dialog("checkCredentials", [
        function(session) {
            //richiede il nomeUtente Active Directory
            botbuilder.Prompts.text(session, lang.insertUsername);
        },
        function(session, results) {
            //memorizza username per girarlo all'azione di deploy
            session.conversationData.username = results.response;
            //messaggio di conferma username
            var confirmUser = utils.format(lang.confirmUser, session.conversationData.username);
            session.say(confirmUser);
            //richiede la password ActiveDirectory
            botbuilder.Prompts.text(session, lang.insertPassword);
        },
        function (session, results) {
            session.sendTyping();
            authenticator(session.conversationData.username, results.response, function(resp) {
                console.log(resp);
                if (resp != "Login successful") {
                    //credenziali errate
                    if (exitCode == 1) {
                        session.say(lang.wrongCredentials);
                        session.replaceDialog('checkCredentials', { reprompt: true });
                        session.endDialog;
                    } else //errore generico
                    {
                        var errorMessage = utils.format(lang.errorMessage, resp);
                        session.say(errorMessage);
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
        "annullaLogin", "Login cancelled",
        {
            matches: /^cancel.*$|^annull.*$/i,
            confirmPrompt: "This will cancel the login. Are you sure?"
        }
    );

loginDialog
    .dialog("logout", function (session) {
        if (session.userData.username == null && session.userData.password == null) {
            session.say(lang.alreadyLoggedOut);
        } else {
            var tmp = session.userData.username
            //sbianca nome e pwd dell'utente
            session.userData.username = null;
            session.userData.password = null;
            var logoutConfirm = utils.format(lang.logoutConfirm, tmp);       
            session.say(logoutConfirm);
        }
    });

module.exports = loginDialog;