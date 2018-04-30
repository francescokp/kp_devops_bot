"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var settings = require("../settings");

// import dialogs
var defaultDialog = require("./dialogs/default");
var globalDialog = require("./dialogs/global");
var greetingsDialog = require("./dialogs/greetings");
var testForm = require("./dialogs/formTest");


console.log('settings -> ' + JSON.stringify(settings));
// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
    appId: settings.appId,
    appPassword: settings.appPassword//,
    // openIdMetadata: process.env.BotOpenIdMetadata
});

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var azureTableClient = new botbuilder_azure.AzureTableClient(settings.tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user nad set a default dialog
var bot = new builder.UniversalBot(connector, defaultDialog);
// bot.set('storage', tableStorage);

//Add Dialogs
bot.library(globalDialog.clone());
bot.library(greetingsDialog.clone());
bot.library(testForm.clone());

module.exports = connector;