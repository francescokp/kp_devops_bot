"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

var lang_en = {

    welcome: {
        intro: "These are the available BW6 applications that can be deployed",
        apps: ["AccountingDocument", "Bank", "BillOfMaterial", "CommonSAPListener", "CommonSAPResources", "CommonWMSResources", "Conai", "Customer", "Delivery", "DeployTest", "GoodsMovement", "GoodsReceipt", "InternalOrders", "Invoice", "LiquidMovement", "LogisticsOperators", "Material", "MaterialClassification", "MyNewFantasticApp", "Order", "PickList", "ProductionOrder", "PurchaseOrder", "SAPListener", "SalesOrder", "SignatureManager", "Stocks", "Vendor"],
        retry: "Sorry I didn’t understand. Please choose an app from the list"
    },
    confirmApp: "Ok. *%s* is the app to deploy",
    chooseEnv: {
        intro: "Which is the target environment?",
        envs: ["QAS", "PROD"],
        retry: "Sorry I didn’t understand. Please choose an environment from the list by either entering the number or environment name."
    },
    confirmEnv: "You chose environment %s",
    insertVersion: "Please specify which version of the app you want to deploy",
    insertUsername: "Please insert your Active Directory username",
    confirmUser: "Your username is %s",
    insertPassword: "Please insert your Active Directory password",
    wrongCredentials: "Your credentials seem to be invalid",
    confirmDeploy: "Ok. I'm going to start *%s* deploy in %s environment \n\n ..Please wait a few seconds..",
    confirmDeployPROD: "Ok. I'm going to start *%s* deploy, version %s in %s environment \n\n ..Please wait a few seconds..",
    deployErrorMessage: "Oooops... something went wrong. Please don't panic and contact the support before retrying. Error code: %s",
    endMessage: "Deploy for app %s has been successfully started in %s environment. Please check your application logs."
};

module.exports = lang_en;