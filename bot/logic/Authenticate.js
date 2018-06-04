var getRequest = require('request');

function loginRequest(username, password, callback) {

    // Set the headers
    var authString = username + ":" + password;
    var authEncoded = Buffer.from(authString).toString('base64');
    var sender = "kp_devops_bot";
    var randomId = Math.random().toString(36).substring(7);
    var options = {
        uri: 'https://eu-west-1.integration.cloud.tibcoapps.com/j2pwq5djvlle5xdskw4ba3r2chy53byg/checkCredentials/checkcredentials?correlationId=' + randomId + '&sender=' + sender,
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + authEncoded,
            //'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var res = '';
    console.log(options.uri);
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