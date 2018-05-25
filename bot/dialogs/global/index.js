"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
const lang = require("./en");

var globalDialog = new botbuilder.Library("global");

var menuActions = {
    "Deploy BW6": {
        //nomelibrary:nomedialog
        item: "deployApp:deployApp"
    },
    "Deploy TCI": {
        item: "deploytci"
    },
    "Create GitHub Repository": {
        item: "createrepo"
    },
}

globalDialog
    .dialog("help", [
    //session.endDialog(lang.help.message);

    function (session) {
        //botbuilder.Prompts.text(session, lang.help.intro);
        botbuilder.Prompts.choice(session, lang.help.intro, menuActions, {
            listStyle: botbuilder.ListStyle.button,
            retryPrompt: lang.help.retry
        })

    },

    function (session, results) {
        var chosenAction = results.response.entity;
        session.endDialog("You have selected: " + chosenAction);
        session.beginDialog(menuActions[chosenAction].item);
    }
    ])
    .triggerAction({
    matches: /^help.*$/i
});

module.exports = globalDialog;