"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

var lang_en = {

    welcome: {
        intro: "These are the available BW6 applications that can be deployed",
        apps: ["LogisticsOperators", "Material", "Vendor","Stock", "BillOfMaterial", "PurchaseOrder"],
        retry: "Sorry I didn’t understand. Please choose an app from the list"
    },
    responseApp: "You chose app %s",
    chooseEnv: {
        intro: "Which is the target environment?",
        envs: ["QAS", "PROD"],
        retry: "Sorry I didn’t understand. Please choose an environment from the list by either entering the number or environment name."
    },
    responseEnv: "You chose environment %s",
    endMessage: "App %s has been successfully deployed in %s environment"
};

module.exports = lang_en;