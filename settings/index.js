"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


function normalizePort(val) {
    const parsedPort = parseInt(val, 10);
    if (isNaN(parsedPort)) {
        return val;
    }
    if (parsedPort >= 0) {
        return parsedPort;
    }
    return false;
}

exports.appId = process.env.MICROSOFT_APP_ID;
exports.appPassword = process.env.MICROSOFT_APP_PASSWORD;
exports.port = normalizePort(process.env.PORT || "3978");
exports.tableName = process.env.TABLE_NAME || "botdata";
exports.storageAccountName = process.env.STORAGE_ACCOUNT_NAME;
exports.storageAccountKey = process.env.STORAGE_ACCOUNT_KEY;