"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
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
            var appName = results.response.entity;
            var msg = utils.format(lang.responseApp, appName);
            //conferma app selezionata
            //session.send(msg);
            botbuilder.Prompts.text(session, msg);
        },
        function (session, results) {
            botbuilder.Prompts.choice(session, lang.chooseEnv.intro, lang.chooseEnv.envs, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.chooseEnv.retry
            })
        },
        function (session, results) {
            //memorizza envName per girarlo all'azione di deploy
            var envName = results.response.entity;
            var msg = utils.format(lang.responseEnv, envName);
            //conferma env selezionato
            //session.send(msg);
        },
        function (session, results) {
            var envName = results.response.entity;
            var msg = utils.format(lang.responseEnv, envName);
            //session.send(msg);
            var endMsg = utils.format(lang.endMessage, appName, envName);
            session.endDialog(endMsg);
        }])
    .triggerAction({
    matches: /^deploy app$/i
});

module.exports = formLib;