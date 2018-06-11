"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
var greetingsLib = new botbuilder.Library("greetings");

greetingsLib
    .dialog("hello", session => {
        if (session.message.user.name != null) {
            var welcomeBack = utils.format(lang.welcomeBack, session.message.user.name);
            session.endDialog(welcomeBack);
            session.conversationData.firstRun = false;
        } else {
            session.endDialog(lang.unidentified);
            session.conversationData.firstRun = false;
        }
    })
    .triggerAction({
        matches: /^hello.*|^hi.*|^ciao.*/i
    });

module.exports = greetingsLib;