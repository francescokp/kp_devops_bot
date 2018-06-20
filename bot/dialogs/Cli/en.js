"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

var lang_en = {
    cliWelcome: "This is the bot CLI. Type 'commands' to see a list of commands, 'exit' to go back to the bot.",
    cliReady: "You are still in the CLI. Type 'commands' to see a list of commands, 'exit' to go back to the bot.",
    syntaxError: "Command not recognized or wrong command syntax. Type 'commands' to see a list of commands.",
    endCommands: "This is a list of available commands:\ndeploy < framework(BW6 | TCI) > <applicationName> <environment(QAS|PROD)> <sandbox(if TCI)> <version(if PROD)> <ADlogin> <ADpassword>\nexamples:\ndeploy BW6 AppToDeploy QAS 99009900 Pswd-9900\ndeploy TCI AppToDeploy PROD ProdPublicSandbox 1.0.0 99009900 Pswd-9900",
    wrongAppName: "There is no %s Application \"*%s*\" on GitHub. Please check the command syntax and retry.",
    confirmDeploy: "The deploy is being started. \n\n ..Please wait a few seconds..",
errorMessage: "Oooops... something went wrong. Please don't panic and contact the support before retrying. Error code: \"*%s*\"",
endMessage: "Deploy for app %s has been successfully started in %s environment. Please check your application logs.",
yesNo: ["YES", "NO"]
};

module.exports = lang_en;