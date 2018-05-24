"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
var formLib = new botbuilder.Library("deployApp");
var appToDeploy = "";

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
            //session.userData.name = results.response.entity;
            appToDeploy = results.response.entity;
            session.say("Ok. *"+ appToDeploy + "* is the app to deploy");

            botbuilder.Prompts.choice(session, lang.chooseEnv.intro, lang.chooseEnv.envs, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.chooseEnv.retry
            })
        },
        function (session, results) {
            var envName = results.response.entity;
            var endMsg = utils.format(lang.endMessage, appToDeploy, envName);
    
            session.say("Ok. I'm going to start *"+ appToDeploy + "* deploy in "+envName+" environment \n\n ..wait few seconds..");    
            
            setTimeout(function() {
                session.say("OK. Deploy launched, please check your application log");
                //session.userData.TimeoutStarted = false;
            }, 5000);

        }]
    )
    .triggerAction({
    //matches: /^deploy$/i
    matches: /^.*deploy.*/
});

module.exports = formLib;