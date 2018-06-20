var getRequest = require('request');

function loginRequest(username, password, callback) {

    // Set the headers
    var authString = username + ":" + password;
    var authEncoded = Buffer.from(authString).toString('base64');
    var sender = "kp_devops_bot";
    var randomId = Math.random().toString(36).substring(7);
    var options = {
        uri: 'https://eu-west-1.integration.cloud.tibcoapps.com/surzktl7kx3nldap2dc5hixtnjrlddku/checkCredentials/checkcredentials?correlationId=' + randomId + '&sender=' + sender,
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + authEncoded,
            //'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var res = '';

    getRequest(options, function (error, response, body) {
        //login successful
        if (!error && response.statusCode == 200) {
            res = body;
            exitCode = 0;
        } else if (!error && response.statusCode == 500 || !error && response.statusCode == 404) {
            res = body;
            exitCode = 1;
        } else {
            res = error;
            exitCode = 1;
        } 
        callback(res, exitCode);
    });
}

module.exports = loginRequest;