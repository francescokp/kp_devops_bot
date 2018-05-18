"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var utils = require("util");
var lang = require("./en");
var formLib = new botbuilder.Library("formTest");

formLib
    .dialog("testDialog", [
        function (session) {
            //stampa il messaggio di welcome
            botbuilder.Prompts.text(session, lang.welcome);
        },
        //prende in input la risposta al welcome (nome dell'utente)
        function (session, results) {
            //memorizza la risposta in una variabile 
            session.userData.name = results.response;
            //crea un messaggio inserendo nel template di risposta al nome il nome dell'utente (%s)
            var msg = utils.format(lang.responseName, results.response);
            //stampa il messaggio di responseName e chiede un numero
            botbuilder.Prompts.number(session, msg);
        },
        //prende in input la risposta al responseName (numero di anni)
        function (session, results) {
            session.userData.coding = results.response;
            botbuilder.Prompts.choice(session, lang.languageCode.intro, lang.languageCode.languages, {
                listStyle: botbuilder.ListStyle.button,
                retryPrompt: lang.languageCode.retry
            });
        },
        function (session, results) {
            session.userData.language = results.response.entity;
            var msg = utils.format(lang.finalMessage, session.userData.name, session.userData.coding, session.userData.language);
            session.endDialog(msg);
            // session.endDialog("Got it... " + session.userData.name + 
            //             " you've been programming for " + session.userData.coding + 
            //             " years and use " + session.userData.language + ".");
        }])
    .triggerAction({
    matches: /^test dialog$/i
});

module.exports = formLib;