"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const lang = require("./en");

var userData = require("../../shared/userData");
var greetings = require("../greetings")

var defaultDialog = [
    function (session) {
        console.log(session.userData.firstRun);
        //se è la prima run saluta l'utente
        if (session.userData.firstRun == undefined) {
            session.beginDialog("greetings:hello");
        }
        else {
            //altrimenti: non ho capito
            session.endDialog(lang.default.message);
        }
    }
];

module.exports = defaultDialog;