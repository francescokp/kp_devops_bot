var postRequest = require('request');

function prepareProxiedTciRequest(username, password, env, sandbox, appName, appVersion, callback) {
    //hardcoded Framework
    framework = "TCI";
    // Converte l'environment in "formato Jenkins"
    if (env == 'QAS') {
        env = 'TEST';
    }

    // Set the headers
    var authString = username + ":" + password;
    var authEncoded = Buffer.from(authString).toString('base64');

    if (env == 'TEST') {
       var headers = {
            'Authorization': 'Basic dGliY290Y2k6VGliY28xMjM=',
            'x-campari-host': '10.30.2.45',
            'x-campari-port': '8090',
            'x-campari-method': 'POST',
            'x-campari-uri': '/job/TIBCO_' + framework + '/job/' + env + '/job/P_' + env + '_' + framework + '_BUILD_DEPLOY/buildWithParameters?ApplicationName=' + appName + '&SANDBOX=' + sandbox,
            'x-campari-protocol': 'HTTP',
            'x-campari-authorization': 'Basic ' + authEncoded,
            'Content-Type': 'application/json'
        }
        // Configure the request (QAS)
        var options = {
            url: 'https://eu-west-1.integration.cloud.tibcoapps.com/kb3w3k2sbqbsfrccoapymuyyyihuombb/proxy',
            method: 'POST',
            headers: headers
            //form: { 'ApplicationName': appName, 'SANDBOX': sandbox }
        }
    }
    else {
        var headers = {
            'Authorization': 'Basic dGliY290Y2k6VGliY28xMjM=',
            'x-campari-host': '10.30.2.45',
            'x-campari-port': '8090',
            'x-campari-method': 'POST',
            'x-campari-uri': '/job/TIBCO_' + framework + '/job/' + env + '/job/P_' + env + '_' + framework + '_BUILD_DEPLOY/buildWithParameters?ApplicationName=' + appName + '&version=' + appVersion + '&SANDBOX=' + sandbox,
            'x-campari-protocol': 'HTTP',
            'x-campari-authorization': 'Basic ' + authEncoded,
            'Content-Type': 'application/json'
        }
        // Configure the request (PROD)
        var options = {
            url: 'https://eu-west-1.integration.cloud.tibcoapps.com/kb3w3k2sbqbsfrccoapymuyyyihuombb/proxy',
            method: 'POST',
            headers: headers,
            //form: { 'ApplicationName': appName, 'Version': appVersion, 'SANDBOX': sandbox }
        }
    }

    // Start the request
    var res = '';
    console.log(options.url);
    postRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res = "started";
        }
        else if (error) {
            res = error;
        } else {
            res = response.statusMessage;
        }
        callback(res);
    });
}

module.exports = prepareProxiedTciRequest;