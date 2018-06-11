"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const lang = require("./en");

var defaultDialog = [
    function (session) {
        session.endDialog(lang.default.message);
    }
];

module.exports = defaultDialog;