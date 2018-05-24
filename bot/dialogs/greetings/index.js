"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var botbuilder = require("botbuilder");
var userData = require("../../shared/userData");
var _lang = require("./en");
var greetingsLib = new botbuilder.Library("greetings");

// Manage user session to customize message for first run Dialog
greetingsLib
    .dialog("firstRun", session => {
        userData.setFirstRun(session, true);
        session.endDialog(_lang.firstRun.message);
    })
    .triggerAction({
        onFindAction: (context, callback) => {
            if (!userData.getFirstRun(context)) {
                callback(null, 0.0);
            } else {
                callback(null, 0.0);
            }
        }
    });

greetingsLib
    .dialog("hello", session => {
        // Toggle user first run to show behaviour
        userData.setFirstRun(session, true);
        session.endDialog(_lang.firstRun.message);
    })
    .triggerAction({
        //matches: /^hello.*$/i,
        //matches: /^hi.*$/i,
        matches: /^.*(ciao|hello|hi).*/
    });

module.exports = greetingsLib;