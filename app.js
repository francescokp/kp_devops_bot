/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });

var restify = require('restify');
var connector = require("./bot");
var settings = require("./settings");

// Setup Restify Server
var server = restify.createServer();
console.log('port is ' + (process.env.port || process.env.PORT || settings.port));
server.listen(settings.port, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Listen for messages from users 
// istanzia il connector definito nella folder bot
server.post('/api/messages', connector.listen());
