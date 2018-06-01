var getRequest = require('request');

function loginRequest(username, password, callback) {

    // Set the headers
    var authString = username + ":" + password;
    var authEncoded = Buffer.from(authString).toString('base64');
    var options = {
        uri: 'https://eu-west-1.integration.cloud.tibcoapps.com/j2pwq5djvlle5xdskw4ba3r2chy53byg/checkCredentials/checkcredentials',
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + authEncoded,
            //'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var res = '';
    getRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res = body;
        }
        else {
            res = response.statusCode;
        }
        callback(res);
    });
}

module.exports = loginRequest;