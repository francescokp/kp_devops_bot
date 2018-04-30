"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function getFirstRun(context) {
    return context.userData.firstRun;
}
function setFirstRun(session, shown) {
    session.userData.firstRun = shown;
}

exports.getFirstRun = getFirstRun;
exports.setFirstRun = setFirstRun;