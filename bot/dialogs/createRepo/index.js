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
            posterGit(session.conversationData.framework, session.conversationData.appName, function (exitCode, resp) {
                console.log(exitCode);
                console.log(resp);
                  if (exitCode != 0) {
                    var errorMessage = utils.format(lang.errorMessage, resp);
                    session.say(errorMessage);
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

module.exports = formLib;