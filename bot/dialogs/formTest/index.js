"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
var formLib = new botbuilder.Library("formTest");

formLib
    .dialog("testDialog", [
        function (session) {
            botbuilder.Prompts.text(session, lang.welcome);
        },
        function (session, results) {
            session.userData.name = results.response;
            var msg = utils.format(lang.responseName, results.response);
            botbuilder.Prompts.number(session, msg);
        },
        function (session, results) {
            session.userData.coding = results.response;
            botbuilder.Prompts.choice(session, lang.languageCode.intro, lang.languageCode.languages, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.languageCode.retry
            });
        },
        function (session, results) {
            session.userData.language = results.response.entity;
            var msg = utils.format(lang.finalMessage, session.userData.name, session.userData.coding, session.userData.language);
            session.endDialog(msg);
            // session.endDialog("Got it... " + session.userData.name + 
            //             " you've been programming for " + session.userData.coding + 
            //             " years and use " + session.userData.language + ".");
        }])
    .triggerAction({
    matches: /^test dialog$/i
});

module.exports = formLib;