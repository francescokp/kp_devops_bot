var postRequest = require('request');

function prepareRequest(username, password, framework, env, appName) {
    // Converte l'environment in "formato Jenkins"
    if (env == 'QAS') {
        env = 'TEST';
    }

    // Set the headers
    var headers = {
        // al momento utilizza la mia utenza -Fra
        'Authorization': 'Basic OTkwMDU1MDU6U2FuZC01NTA1',
        //'Content-Type': 'application/x-www-form-urlencoded'
    }

    // Configure the request
    var options = {
        //prototype: http://grltbqm0.appl.campari.priv:8090/job/TIBCO_BW6/job/TEST/job/P_TEST_BW6_BUILD_DEPLOY/buildWithParameters
        url: 'http://grltbqm0.appl.campari.priv:8090/job/TIBCO_' + framework + '/job/' + env + '/job/P_TEST_' + framework + '_BUILD_DEPLOY/buildWithParameters',
        method: 'POST',
        headers: headers,
        form: { 'ApplicationName': appName/*, 'key2': 'yyy' */ }
    }

    // Start the request
    postRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
        }
    })
}

module.exports = prepareRequest;