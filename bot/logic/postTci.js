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
            url: 'http://grltbqm0.appl.campari.priv:8090/job/TIBCO_' + framework + '/job/' + env + '/job/P_' + env + '_' + framework + '_BUILD_DEPLOY/buildWithParameters',
            method: 'POST',
            headers: headers,
            form: { 'ApplicationName': appName, 'SANDBOX': sandbox }
        }
    }
    else {
        // Configure the request (PROD)
        var options = {
            //prototype: http://grltbqm0.appl.campari.priv:8090/job/TIBCO_TCI/job/PROD/job/P_PROD_TCI_BUILD_DEPLOY/buildWithParameters
            url: 'http://grltbqm0.appl.campari.priv:8090/job/TIBCO_' + framework + '/job/' + env + '/job/P_' + env + '_' + framework + '_BUILD_DEPLOY/buildWithParameters',
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
        else if (error) {
            res = error;
        } else {
            res = response.statusMessage;
        }
        callback(res);
    });
}

module.exports = prepareTciRequest;