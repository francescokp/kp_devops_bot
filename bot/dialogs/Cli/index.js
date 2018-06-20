"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
// PROXIED 
//var poster = require("../../logic/post");
//var posterTci = require("../../logic/postTci");
var poster = require("../../logic/proxiedPost");
var posterTci = require("../../logic/proxiedPostTci");
//
var appGetter = require("../../logic/getAppListGit");
var formLib = new botbuilder.Library("Cli");

//init
var first = true;
var framework = null;
var matchQasBW6, matchQasTCI, matchProdBW6, matchProdTCI = null;
// possibili sintassi:
// deploy BW6 AppName ENV username password
// deploy TCI AppName ENV sandbox username password
// deploy BW6 AppName ENV version username password
// deploy TCI AppName ENV sandbox version username password
// TO-DO: trovare un modo di gestire dinamicamente le sandbox
var deployRegexQasBW6 = /^deploy\s(BW6)\s(\S*)\s(QAS)\s(\d*)\s(\S*)$/;
var deployRegexQasTCI = /^deploy\s(TCI)\s(\S*)\s(QAS)\s(TestPublicSandbox)\s(\d*)\s(\S*)$/;
var deployRegexProdBW6 = /^deploy\s(TCI)\s(\S*)\s(QAS)\s(\d\.\d\.\d)\s(\d*)\s(\S*)$/;
var deployRegexProdTCI = /^deploy\s(TCI)\s(\S*)\s(QAS)\s(ProdPublicSandbox)\s(\d\.\d\.\d)\s(\d*)\s(\S*)$/
//inserire la regexProd

formLib
    .dialog("Cli", [
        function (session) {
            //welcome to the CLI
            if (first) {
                botbuilder.Prompts.text(session, lang.cliWelcome);
                first = false;
            } else {
                botbuilder.Prompts.text(session, lang.cliReady);
            }
        },
        function (session, results, next) {
            session.sendTyping();
            //memorizza comando
            var command = results.response;
            //lancia regex contro il comando
            matchQasBW6 = deployRegexQasBW6.exec(command);
            matchQasTCI = deployRegexQasTCI.exec(command);
            matchProdBW6 = deployRegexProdBW6.exec(command);
            matchProdTCI = deployRegexProdTCI.exec(command);
            //se le regex restituiscono tutte null la sintassi non è corretta
            if (matchQasBW6 != null && matchQasTCI == null && matchProdBW6 == null && matchProdTCI == null) {
                //associa i gruppi estratti dalla regex alle variabili da inviare alla chiamata POST
                framework = matchQasBW6[1];
                session.conversationData.appToDeploy = matchQasBW6[2];
                session.conversationData.envName = matchQasBW6[3];
                session.userData.username = matchQasBW6[4];
                session.userData.password = matchQasBW6[5];
            } else if (matchQasBW6 == null && matchQasTCI != null && matchProdBW6 == null && matchProdTCI == null) {
                //associa i gruppi estratti dalla regex alle variabili da inviare alla chiamata POST
                framework = matchQasTCI[1];
                session.conversationData.appToDeploy = matchQasTCI[2];
                session.conversationData.envName = matchQasTCI[3];
                session.conversationData.sandbox = matchQasTCI[4];
                session.userData.username = matchQasTCI[5];
                session.userData.password = matchQasTCI[6];
            } else if (matchQasBW6 == null && matchQasTCI == null && matchProdBW6 != null && matchProdTCI == null) {
                //associa i gruppi estratti dalla regex alle variabili da inviare alla chiamata POST
                framework = matchProdBW6[1];
                session.conversationData.appToDeploy = matchProdBW6[2];
                session.conversationData.envName = matchProdBW6[3];
                session.conversationData.appVersion = matchProdBW6[4];
                session.userData.username = matchProdBW6[5];
                session.userData.password = matchProdBW6[6];
            } else if (matchQasBW6 == null && matchQasTCI == null && matchProdBW6 == null && matchProdTCI != null) {
                //associa i gruppi estratti dalla regex alle variabili da inviare alla chiamata POST
                framework = matchProdTCI[1];
                session.conversationData.appToDeploy = matchProdTCI[2];
                session.conversationData.envName = matchProdTCI[3];
                session.conversationData.appVersion = matchProdTCI[4];
                session.userData.username = matchProdTCI[5];
                session.userData.password = matchProdTCI[6];
            } else {
                session.say(lang.syntaxError);
                session.endConversation;
                session.beginDialog("Cli");
                var ko = true;
            } 
            if (!ko) {
                session.sendTyping();
                //controlla che un'applicazione con questo nome esista su Git
                //non passo topic in modo da scaricare tutte le app
                appGetter(framework, null, function (exitCode, resp) {
                    if (exitCode != 0) {
                        var gitErrorMessage = utils.format(lang.errorMessage, resp);
                        session.say(gitErrorMessage);
                        session.endConversation;
                        session.beginDialog("Cli");
                    } else if (resp.indexOf(session.conversationData.appToDeploy) == -1) {
                        var wrongAppMessage = utils.format(lang.wrongAppName, framework, session.conversationData.appToDeploy);
                        session.say(wrongAppMessage);
                        session.endConversation;
                        session.beginDialog("Cli");
                    } else {
                        next();
                    }
                });}
        },
        function (session, results) {
            session.say(lang.confirmDeploy);
            session.sendTyping();
            //chiamata POST per BW6: dati utente, env e app presi dall'input del bot
            if (framework == "BW6") {
                poster(session.userData.username, session.userData.password, session.conversationData.envName, session.conversationData.appToDeploy, session.conversationData.appVersion, function (resp) {
                    console.log(resp);
                    if (resp != "started") {
                        var errorMessage = utils.format(lang.errorMessage, resp);
                        session.say(errorMessage);
                        session.endConversation;
                        session.beginDialog("Cli");
                    } else {
                        var endMessage = utils.format(lang.endMessage, session.conversationData.appToDeploy, session.conversationData.envName);
                        session.say(endMessage);
                        session.endConversation;
                        session.beginDialog("Cli");
                    }
                })
            }
            //chiamata POST per framework TCI: dati utente, env e app presi dall'input del bot
            else {
                posterTci(session.userData.username, session.userData.password, session.conversationData.envName, session.conversationData.sandbox, session.conversationData.appToDeploy, session.conversationData.appVersion, function (resp) {
                    console.log(resp);
                    if (resp != "started") {
                        var errorMessage = utils.format(lang.errorMessage, resp);
                        session.say(errorMessage);
                        session.endConversation;
                        session.beginDialog("Cli");
                    } else {
                        var endMessage = utils.format(lang.endMessage, session.conversationData.appToDeploy, session.conversationData.envName);
                        session.say(endMessage);
                        session.endConversation;
                        session.beginDialog("Cli");
                    }
                })
            }
        }])
    .triggerAction({
        matches: /^cli$/
    })
    .endConversationAction(
    "exitCli", "CLI session terminated",
    {
        matches: /^exit$/
    });

formLib
    .dialog("commands", [
        function (session) {
            session.say(lang.endCommands);
            session.beginDialog("Cli");
        }])
    .triggerAction({
        matches: /^commands$/
    })

module.exports = formLib;