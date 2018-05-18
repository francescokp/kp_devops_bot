"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
var formLib = new botbuilder.Library("deployApp");
var Appname = null;
var envName = null;

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
            appName = results.response.entity;
            //var msg = utils.format(lang.responseApp, appName);
            botbuilder.Prompts.choice(session, lang.chooseEnv.intro, lang.chooseEnv.envs, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.chooseEnv.retry
            })
        },
        function (session, results) {
            //memorizza envName per girarlo all'azione di deploy
            envName = results.response.entity;
            //var msg = utils.format(lang.responseEnv, envName);
            var endMsg = utils.format(lang.endMessage, appName, envName);
            session.endDialog(endMsg);
        }])
    .triggerAction({
    matches: /^deploy app$/i
});

module.exports = formLib;