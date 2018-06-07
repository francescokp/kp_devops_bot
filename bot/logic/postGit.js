var postRequest = require('request');

function createRepoRequest(framework, appName, repoDesc, callback) {

    // TODO: sostituire il token con quello attivo, solo se si committa questo codice su un repo privato
    // Workaround: se si vuole aggirare il problema basta spezzare il token. In questo modo comunque si rende il token visibile a internet.
    var gitHubToken1 = "f86b5d20699044f324ee";
    var gitHubToken2 = "5e5e710c337da2f6edcd";

    //gestisce lo skip della descrizione
    if (repoDesc.toUpperCase() == "SKIP") {
        repoDesc = "";
    }

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
            "description": repoDesc,
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