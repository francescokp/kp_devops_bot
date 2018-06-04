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

module.exports = connector;