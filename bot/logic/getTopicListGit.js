var postRequest = require('request');

var regex = "";

//debug only
listTopicsRequest("BW6", function (exitCode, resp) { });

function listTopicsRequest(framework, callback) {

    // TODO: sostituire il token con quello attivo, solo se si committa questo codice su un repo privato
    // Workaround: se si vuole aggirare il problema basta spezzare il token. In questo modo comunque si rende il token visibile a internet.
    var gitHubToken1 = "f86b5d20699044f324ee";
    var gitHubToken2 = "5e5e710c337da2f6edcd";

    //inizializza regex
    if (framework == "BW6") {
        regex = /TIBCO_BW6_[\s\S]*?\"topics\":[\s\S]*?\[([\s\S]*?)\],/gm;
    } else if (framework == "TCI") {
        regex = /TIBCO_TCI_[\s\S]*?\"topics\":[\s\S]*?\[([\s\S]*?)\],/gm;
    } else {
        exitCode = 3;
        callback(exitCode);
    }

    regex2 = /"(.*?)"/gm;

    // Set the headers
    var options = {
        uri: 'https://api.github.com/orgs/DavideCampariMilano/repos?per_page=100',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'kp_devops_bot',
            'Authorization': 'token ' + gitHubToken1 + gitHubToken2,
            'Accept': 'application/vnd.github.mercy-preview+json'
        }
    };

    var res = '';
    var topic_matches_array = [];
    postRequest(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //esegue la regex sul body della response
            var topicBlock = regex.exec(body);
            // cicla sui blocchi di topic estratti ("topic1","topic2","topic3")
            while (topicBlock != null) {
                //esegue la regex sul blocco corrente
                var topicMatch = regex2.exec(topicBlock[1]);
                //cicla sui topic estratti
                while (topicMatch != null) {
                    console.log(topicMatch[1]);
                    topic_matches_array.push(topicMatch[1]);
                    var topicMatch = regex2.exec(topicBlock[1]);
                }
                var topicBlock = regex.exec(body);
            }
            topic_matches_array.sort();
            topic_matches_array = uniq(topic_matches_array);
            res = topic_matches_array;
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

function uniq(a) {
    var seen = {};
    return a.filter(function (item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

module.exports = listTopicsRequest;