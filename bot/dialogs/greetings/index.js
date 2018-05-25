"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var botbuilder = require("botbuilder");
var userData = require("../../shared/userData");
var _lang = require("./en");
var greetingsLib = new botbuilder.Library("greetings");

// Manage user session to customize message for first run Dialog
//Disattivato fino a quando non riusciremo a capire come stracazzo funziona
/*greetingsLib
    .dialog("firstRun", session => {
        userData.setFirstRun(session, true);
        session.endDialog(_lang.firstRun.message);
    })
    .triggerAction({
        onFindAction: (context, callback) => {
            // controlla se è la prima esecuzione
            if (!userData.getFirstRun(context)) {
                //se false restituisci uno score di 1.1
                callback(null, 1.1);
            } else {
                //se true o unset restituisci uno score di 0.0
                callback(null, 0.0);
            }
        }
    });
*/
greetingsLib
    .dialog("hello", session => {
        // Toggle user first run to show behaviour
        userData.setFirstRun(session, false);
        //come sopra, fino a che non capiremo come funziona per noi è sempre il first greeting
        //session.endDialog(_lang.hello.message);
        session.endDialog(_lang.firstRun.message);
    })
    .triggerAction({
        matches: /^.*hello.*|^.*hi.*|^.*ciao.*/
        //matches: /^hi.*$/i
    });

module.exports = greetingsLib;