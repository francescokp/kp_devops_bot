"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
const lang = require("./en");

var globalDialog = new botbuilder.Library("global");

globalDialog
    .dialog("help", (session) => {
    session.endDialog(lang.help.message);
})
    .triggerAction({
    matches: /^help$/i
});

module.exports = globalDialog;