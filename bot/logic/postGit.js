var postRequest = require('request');

function createRepoRequest(framework, appName, callback) {

    // Set the headers
    var options = {
        uri: 'https://api.github.com/orgs/DavideCampariMilano/repos?access_token=57dfcd3ef367d870f6a5191f8110ab9aede9f811',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'kp_devops_bot'
        },
        json: {
            "name": "TIBCO_" + framework + "_" + appName,
            "private": true,
            "auto_init": true
        }
    };

    var res = '';
    postRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 201) {
            console.log(body.html_url);
            res = body.html_url;
            exitCode = 0;
        }
        else {
            res = body.errors[0].message;
            exitCode = 1;
        }
        callback(exitCode, res);
    });
}

module.exports = createRepoRequest;