"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

var lang_en = {
    gitTopicWait: "I'm checking on GitHub for a list of existing topics. Please wait.",
    chooseTopic: {
        intro: "These are the available topics",
        retry: "Sorry I didn’t understand. Please choose a topic from the list"
    },
    gitWait: "Now I'm checking on GitHub for a list of deployable BW6 applications that match your topic *%s*. Be patient.",
    welcome: {
        intro: "These are the available BW6 applications that can be deployed",
        //apps: ["AccountingDocument", "Bank", "BillOfMaterial", "CommonSAPListener", "CommonSAPResources", "CommonWMSResources", "Conai", "Customer", "Delivery", "DeployTest", "GoodsMovement", "GoodsReceipt", "InternalOrders", "Invoice", "LiquidMovement", "LogisticsOperators", "Material", "MaterialClassification", "MyNewFantasticApp", "Order", "PickList", "ProductionOrder", "PurchaseOrder", "SAPListener", "SalesOrder", "SignatureManager", "Stocks", "Vendor"],
        retry: "Sorry I didn’t understand. Please choose an app from the list"
    },
    confirmApp: "Ok. *%s* is the app to deploy",
    chooseEnv: {
        intro: "Which is the target environment?",
        envs: ["QAS"/*, "PROD"*/],
        retry: "Sorry I didn’t understand. Please choose an environment from the list by either entering the number or environment name."
    },
    confirmEnv: "You chose environment %s",
    insertVersion: "Please specify which version of the app you want to deploy",
    loginBypass: "You are currently logged in as %s",
    keepLogin: "Is this the correct user?",
    startDeploy: "Are you sure you want to deploy *%s* in %s environment?",
    startDeployProd: "Are you sure you want to deploy *%s*, version %s, in %s environment?",
    cancelDeploy: "The deploy was cancelled",
    confirmDeploy: "The deploy is being started. \n\n ..Please wait a few seconds..",
    errorMessage: "Oooops... something went wrong. Please don't panic and contact the support before retrying. Error code: \"*%s*\"",
    endMessage: "Deploy for app %s has been successfully started in %s environment. Please check your application logs.",
    yesNo: ["YES", "NO"]
};

module.exports = lang_en;