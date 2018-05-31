var postRequest = require('request');

var exitCode = 1;

function loginRequest(username, password) {


    // Set the headers
    var authString = username + ":" + password;
    var authEncoded = Buffer.from(authString).toString('base64');
    var headers = {
        'Authorization': authEncoded,
        //'Content-Type': 'application/x-www-form-urlencoded'
    }

    // Configure the request
    var options = {
        url: 'https://eu-west-1.integration.cloud.tibcoapps.com/j2pwq5djvlle5xdskw4ba3r2chy53byg/checkCredentials/checkcredentials',
        method: 'GET',
        headers: headers,
        form: { }
    }

    // Start the request
    postRequest(options, function (error, response, body) {
        if (response.body == "Login successful") {
            exitCode = 0;
        }
    })

    return exitCode;
}

module.exports = loginRequest;