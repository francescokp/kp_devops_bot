var postRequest = require('request');

function prepareTciRequest(username, password, env, sandbox, appName, appVersion, callback) {
    //hardcoded Framework
    framework = "TCI";
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
            //prototype: http://grltbqm0.appl.campari.priv:8090/job/TIBCO_TCI/job/TEST/job/P_TEST_TCI_BUILD_DEPLOY/buildWithParameters
            url: 'http://grltbqm0.appl.campari.priv:8090/job/TIBCO_' + framework + '/job/' + env + '/job/P_TEST_' + framework + '_BUILD_DEPLOY/buildWithParameters',
            method: 'POST',
            headers: headers,
            form: { 'ApplicationName': appName, 'SANDBOX': sandbox }
        }
    }
    else {
        // Configure the request (PROD)
        var options = {
            //prototype: http://grltbqm0.appl.campari.priv:8090/job/TIBCO_BW6/job/TEST/job/P_TEST_BW6_BUILD_DEPLOY/buildWithParameters
            url: 'http://grltbqm0.appl.campari.priv:8090/job/TIBCO_' + framework + '/job/' + env + '/job/P_TEST_' + framework + '_BUILD_DEPLOY/buildWithParameters',
            method: 'POST',
            headers: headers,
            form: { 'ApplicationName': appName, 'Version': appVersion, 'SANDBOX': sandbox }
        }
    }

    // Start the request
    var res = '';
    console.log(options.url);
    postRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            res = "started";
        }
        else {
            res = response.statusCode;
        }
        callback(res);
    });
}

module.exports = prepareTciRequest;