"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

var lang_en = {

    welcome: {
        intro: "Which app would you like to deploy?",
        apps: ["Proxy", "CippaLippa", "Vendor"],
        retry: "Sorry I didn’t understand. Please choose an app from the list by either entering the number or app name."
    },
    responseApp: "You chose app %s",
    chooseEnv: {
        intro: "In which environment would you like to deploy?",
        envs: ["QAS", "PROD"],
        retry: "Sorry I didn’t understand. Please choose an environment from the list by either entering the number or environment name."
    },
    responseEnv: "You chose environment %s",
    endMessage: "App %s has been successfully deployed in environment %s",
};

module.exports = lang_en;