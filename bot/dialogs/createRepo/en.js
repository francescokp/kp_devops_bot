"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

var lang_en = {

    welcome: {
        intro: "Which kind of repository do you want to create?",
        frameworks: ["BW6", "TCI"],
        retry: "Sorry I didn’t understand. Please choose a framework from the list"
    },
    confirmFramework: "Ok, a *%s* repository will be created",
    insertAppName: "Please type the name of the App",
    insertRepoDesc: "Type an optional description for the repository, if you like. Type \"skip\" to skip.",
    confirmApp: "Are you sure the exact name of the App is \"*%s*\"? The repo will be created as: \"TIBCO_%s_%s\"",
    endMessage: "The repository has been created. URL: %s",
    errorMessage: "The repository has NOT been created. Error: %s",
    genericErrorMessage: "The repository has NOT been created. Please don't panic and contact the support before retrying.",
    loginBypass: "You are currently logged in as %s",
    keepLogin: "Is this the correct user?",
    yesNo: ["YES", "NO"]
};

module.exports = lang_en;