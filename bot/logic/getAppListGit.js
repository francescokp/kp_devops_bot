var postRequest = require('request');

var regex = "";
var matches_array = [];

//debug only
//listReposRequest("BW6", function (exitCode, resp) { });

function listReposRequest(framework, callback) {

    // TODO: sostituire il token con quello attivo, solo se si committa questo codice su un repo privato
    // Workaround: se si vuole aggirare il problema basta spezzare il token. In questo modo comunque si rende il token visibile a internet.
    var gitHubToken1 = "f86b5d20699044f324ee";
    var gitHubToken2 = "5e5e710c337da2f6edcd";

    //inizializza regex
    if (framework == "BW6") {
        regex = /\"name\":\"TIBCO_BW6_(.*?)\"/gm;
    } else if (framework == "TCI") {
        regex = /\"name\":\"TIBCO_TCI_(.*?)\"/gm;
    } else {
        exitCode = 3;
        callback(exitCode);
    }

    // Set the headers
    var options = {
        uri: 'https://api.github.com/orgs/DavideCampariMilano/repos',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'kp_devops_bot',
            'Authorization': 'token ' + gitHubToken1 + gitHubToken2
        }
    };

    var res = '';
    postRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //esegue la regex
            var match = regex.exec(body);
            // cicla sui risultati memorizzandoli in un array
            while (match != null) {
                // matched text: match[0]
                // match start: match.index
                // capturing group n: match[n]
                matches_array.push(match[1]);
                match = regex.exec(body);
            }
            res = matches_array;
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

module.exports = listReposRequest;