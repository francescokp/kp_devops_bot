"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var builder = require('botbuilder');
var storage = require("../storage");
var settings = require("../settings");

// import dialogs
var defaultDialog = require("./dialogs/default");
var globalDialog = require("./dialogs/global");
var greetingsDialog = require("./dialogs/greetings");
var loginDialog = require("./dialogs/login");
var testForm = require("./dialogs/formTest");
var deployApp = require("./dialogs/deployApp");
var deployTci = require("./dialogs/deployTci");
var createRepo = require("./dialogs/createRepo");
var cli = require("./dialogs/Cli");


console.log('settings -> ' + JSON.stringify(settings));

// Create chat connector for communicating with the Bot Framework Service
const connector = new builder.ChatConnector({
    appId: settings.appId,
    appPassword: settings.appPassword,
    openIdMetadata: settings.BotOpenIdMetadata
});

// Create your bot with a function to receive messages from the user and set a default dialog
var bot = new builder.UniversalBot(connector, defaultDialog);

// bot.set('storage', storage);

//Add Dialogs
bot.library(greetingsDialog.clone());
bot.library(globalDialog.clone());
bot.library(testForm.clone());
bot.library(deployApp.clone());
bot.library(deployTci.clone());
bot.library(loginDialog.clone());
bot.library(createRepo.clone());
bot.library(cli.clone());

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, "greetings:hello");
            }
        });
    }
}); 

/* bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.send(new builder.Message()
                    .address(message.address)
                    .text("Hello!  I'm a bot."));
            }
        });
    }
}); */

module.exports = connector;