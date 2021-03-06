var postRequest = require('request');

function prepareRequest(username, password, env, appName, appVersion, callback) {
    //hardcoded Framework
    framework = "BW6";
    // Converte l'environment in "formato Jenkins"
    if (env == 'QAS') {
        env = 'TEST';
    }

    // Set the headers
    var authString = username + ":" + password;
    var authEncoded = Buffer.from(authString).toString('base64');
    var headers = {
        'Authorization': 'Basic ' + authEncoded,
        //'Content-Type': 'application/x-www-form-urlencoded'
    }

    if (env == 'TEST') {
        // Configure the request (QAS)
        var options = {
            //prototype: http://grltbqm0.appl.campari.priv:8090/job/TIBCO_BW6/job/TEST/job/P_TEST_BW6_BUILD_DEPLOY/buildWithParameters
            url: 'http://grltbqm0.appl.campari.priv:8090/job/TIBCO_' + framework + '/job/' + env + '/job/P_' + env + '_' + framework + '_BUILD_DEPLOY/buildWithParameters',
            method: 'POST',
            headers: headers,
            form: { 'ApplicationName': appName/*, 'key2': 'yyy' */ }
        }
    }
    else {
        // Configure the request (PROD)
        var options = {
            //prototype: http://grltbqm0.appl.campari.priv:8090/job/TIBCO_BW6/job/PROD/job/P_PROD_BW6_BUILD_DEPLOY/buildWithParameters
            url: 'http://grltbqm0.appl.campari.priv:8090/job/TIBCO_' + framework + '/job/' + env + '/job/P_' + env + '_' + framework + '_BUILD_DEPLOY/buildWithParameters',
            method: 'POST',
            headers: headers,
            form: { 'ApplicationName': appName, 'Version': appVersion }
        }
    }

    // Start the request
    var res = '';
    postRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
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

module.exports = prepareRequest;