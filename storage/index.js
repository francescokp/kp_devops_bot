"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var botbuilder = require("botbuilder");
var botbuilder_azure = require("botbuilder-azure");
var settings = require("../settings");

var storage;
console.log('################# BotEnv is -> ' + process.env.BotEnv);
if (process.env.BotEnv !== "prod") {
    console.log('Memory storage');
    storage = new botbuilder.MemoryBotStorage();
} else {
    console.log('Azure Storage');
    /*----------------------------------------------------------------------------------------
    * Bot Storage: This is a great spot to register the private state storage for your bot. 
    * We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
    * For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
    * ---------------------------------------------------------------------------------------- */
    var azureTableClient = new botbuilder_azure.AzureTableClient(settings.tableName, process.env['AzureWebJobsStorage']);
    storage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);
}





module.exports = storage;