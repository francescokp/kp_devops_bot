var postRequest = require('request');

function createRepoRequest(framework, appName, callback) {

    // TODO: sostituire il token oppure autenticarsi diversamente
    var gitHubToken1 = "b75e53128307fe92ea22";
    var gitHubToken2 = "45669c0d0b8688a28ea0";

    // Set the headers
    var options = {
        uri: 'https://api.github.com/orgs/DavideCampariMilano/repos',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'kp_devops_bot',
            'Authorization': 'token ' + gitHubToken1 + gitHubToken2
        },
        json: {
            "name": "TIBCO_" + framework + "_" + appName,
            "private": true,
            "auto_init": true
        }
    };

    var res = '';
    console.log(options.headers.Authorization);
    postRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            console.log(body.html_url);
            res = body.html_url;
            exitCode = 0;
        }
        else if (error) {
            console.log(error);
            res = error;
            exitCode = 1;
        } else {
            console.log(body);
            exitCode = 2;
        }
        callback(exitCode, res);
    });
}

module.exports = createRepoRequest;