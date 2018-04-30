"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var _lang = require("./en");
var greetingsLib = new botbuilder.Library("greetings");

greetingsLib
    .dialog("hello", session => {
        session.endDialog(_lang.firstRun.message);
    })
    .triggerAction({
    matches: /^hello$/i
});

module.exports = greetingsLib;