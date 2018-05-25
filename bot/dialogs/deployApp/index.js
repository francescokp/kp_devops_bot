"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
var appDeployer = new botbuilder.Library("deployApp");
var appToDeploy = "";

appDeployer
    .dialog("deployApp", [
        function (session) {
            //seleziona quale app deployare
            botbuilder.Prompts.choice(session, lang.welcome.intro, lang.welcome.apps, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.welcome.retry
            })
        },
        function (session, results) {
            //memorizza appName per girarlo all'azione di deploy
            session.dialogData.appToDeploy = results.response.entity;
            session.send("Ok. *" + session.dialogData.appToDeploy + "* is the app to deploy");
            //seleziona in quale ambiente deployare
            botbuilder.Prompts.choice(session, lang.chooseEnv.intro, lang.chooseEnv.envs, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.chooseEnv.retry
            })
        },
        function (session, results) {
            session.dialogData.envName = results.response.entity;
            var endMsg = utils.format(lang.endMessage, session.dialogData.appToDeploy, session.dialogData.envName);

            session.say("Ok. I'm going to start *" + session.dialogData.appToDeploy + "* deploy in " + session.dialogData.envName + " environment \n\n ..Please wait few seconds..");

            setTimeout(function () {
                //endConversation conclude definitivamente una conversazione
                session.endConversation("Deploy has been launched, please check advancement and results in your application log");
                //session.userData.TimeoutStarted = false;
            }, 5000);

        }]
    )
    .endConversationAction(
    "annullaDeploy", "Ok. Ciaone.",
    {
        matches: /^cancel.*$|^annull.*$/i,
        confirmPrompt: "This will cancel the deploy. Are you sure?"
    }
);

module.exports = appDeployer;