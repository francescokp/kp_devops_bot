"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

var lang_en = {

    welcome: {
        intro: "These are the available TCI applications that can be deployed",
        apps: ["AccountingDocument", "CommonUtils", "DeployTest", "EmployeeCentral", "JournalEntries", "LogProvider", "LogisticsOperators", "Material", "PickList", "Proxy", "PurchaseOrder", "ServiceNow", "Vendor"],
        retry: "Sorry I didn’t understand. Please choose an app from the list"
    },
    confirmApp: "Ok. *%s* is the app to deploy",
    chooseEnv: {
        intro: "Which is the target environment?",
        envs: ["QAS", "PROD"],
        retry: "Sorry I didn’t understand. Please choose an environment from the list by either entering the number or environment name."
    },
    confirmEnv: "You chose environment %s",
    chooseSandbox: {
        intro: "Which is the target sandbox?",
        testSandboxes: ["TestPublicSandbox"],
        prodSandboxes: ["ProdPublicSandbox"],
        retry: "Sorry I didn’t understand. Please choose a sandbox from the list by either entering the number or sandbox name."
    },
    confirmSandbox: "You chose sandbox %s",
    insertVersion: "Please specify which version of the app you want to deploy",
    insertUsername: "Please insert your Active Directory username",
    confirmUser: "Your username is %s",
    insertPassword: "Please insert your Active Directory password",
    wrongCredentials: "Your credentials seem to be invalid",
    loginConfirm: "Login successful",
    loginBypass: "You are currently logged in as %s",
    keepLogin: "Is this the correct user?",
    startDeploy: "Are you sure you want to deploy *%s* in %s environment and %s sandbox?",
    startDeployProd: "Are you sure you want to deploy *%s*, version %s, in %s environment and %s sandbox?",
    cancelDeploy: "The deploy was cancelled",
    confirmDeploy: "The deploy was started. \n\n ..Please wait a few seconds..",
    deployErrorMessage: "Oooops... something went wrong. Please don't panic and contact the support before retrying. Error code: %s",
    endMessage: "Deploy for app %s has been successfully started in %s environment, %s sandbox. Please check your application logs.",
    yesNo: ["YES", "NO"]
};

module.exports = lang_en;