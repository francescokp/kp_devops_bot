"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
const lang = require("./en");

var globalDialog = new botbuilder.Library("global");
var funcChoise = "";

globalDialog
    .dialog("help", [
    //session.endDialog(lang.help.message);

    function (session) {
        botbuilder.Prompts.text(session, lang.help.intro);
        //botbuilder.Prompts.choice(session, lang.help.intro, lang.help.actions, {
          //  listStyle: botbuilder.ListStyle.button,
          //  retryPrompt: lang.help.retry
        //})

    }
    ])
    .triggerAction({
    matches: /^help$/i
});

module.exports = globalDialog;