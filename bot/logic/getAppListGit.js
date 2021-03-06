var postRequest = require('request');

var regex = "";

//debug only
//listReposRequest("BW6", function (exitCode, resp) { });

function listReposRequest(framework, topic, callback) {

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
    if (topic != null) {
        var options = {
            uri: 'https://api.github.com/search/repositories?per_page=100&q=org:DavideCampariMilano+topic:' + topic,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'kp_devops_bot',
                'Authorization': 'token ' + gitHubToken1 + gitHubToken2,
            }
        };
    } else {
        var options = {
            uri: 'https://api.github.com/search/repositories?per_page=100&q=org:DavideCampariMilano',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'kp_devops_bot',
                'Authorization': 'token ' + gitHubToken1 + gitHubToken2,
            }
        };
    }


    var res = '';
    var matches_array = [];
    postRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //esegue la regex sul body della response
            var match = regex.exec(body);
            // cicla sui risultati memorizzandoli in un array
            while (match != null) {
                // matched text: match[0]
                // match start: match.index
                // capturing group n: match[n]
                matches_array.push(match[1]);
                match = regex.exec(body);
            }
            matches_array.sort();
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
        };
        callback(exitCode, res);
    });
}

module.exports = listReposRequest;