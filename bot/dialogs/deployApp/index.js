"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
var formLib = new botbuilder.Library("deployApp");

formLib
    .dialog("deployApp", [
        function (session) {
            var appName = results.response.enti;
            botbuilder.Prompts.choice(session, lang.welcome.intro, lang.welcome.apps, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.welcome.retry
            })
        },
        function (session, results) {
            var msg = utils.format(lang.responseApp, appName);
            session.endDialog(msg);
        }])
    .triggerAction({
    matches: /^deploy app$/i
});

module.exports = formLib;