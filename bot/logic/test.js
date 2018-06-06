var input = "{\"id\": 110228169,\"node_id\": \"MDEwOlJlcG9zaXRvcnkxMTAyMjgxNjk=\",\"name\": \"TIBCO_BW6_Invoice\",\"name\": \"TIBCO_BW6_Gigi\",\"owner\": {";

var regex = /\"TIBCO_BW6_(.*?)\"/gi;

var match = regex.exec(input);

while (match != null) {
    // matched text: match[0]
    // match start: match.index
    // capturing group n: match[n]
    console.log(match[1])
    match = regex.exec(input);
}
