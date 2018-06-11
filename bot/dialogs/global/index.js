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
        item: "deployTci:deployTci"
    },
    "Create GitHub Repository": {
        item: "createRepo:createRepo"
    },
    "Active Directory Login / Change User": {
        item: "login:checkCredentials"
    },
    "Active Directory Logout": {
        item: "login:logout"
    },
}

globalDialog
    .dialog("menu", [
    //session.endDialog(lang.menu.message);

    function (session) {
        //botbuilder.Prompts.text(session, lang.menu.intro);
        botbuilder.Prompts.choice(session, lang.menu.intro, menuActions, {
            listStyle: botbuilder.ListStyle.button,
            retryPrompt: lang.menu.retry
        })
    },

    function (session, results) {
        var chosenAction = results.response.entity;
        session.endDialog("You have selected: " + chosenAction);
        session.beginDialog(menuActions[chosenAction].item);
    }
    ])
    .triggerAction({
    matches: /^menu|help$/i
    })
    .endConversationAction(
        "annullaDeploy", "OK BYE NOW.",
        {
            matches: /^cancel.*$|^annull.*|^sbagl.*$/i,
    });
;

module.exports = globalDialog;