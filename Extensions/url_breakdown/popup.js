chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var currentUrl = tabs[0].url;
  var url = new URL(currentUrl);
  var piecesOfPath = url.pathname.split("/");
  function parseQuery(query) {
    // Remove '?' from the beginning of the query string
    query = query.slice(1);

    // Split the query string into key-value pairs
    var pairs = query.split("&");

    // Initialize an empty object to store key-value pairs
    var result = {};

    // Loop through each key-value pair
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");

      // Decode URI component to handle special characters
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1] || "");

      // Store key-value pair in the result object
      if (key) {
        result[key] = value;
      }
    }

    return result;
  }

  var queryObject = parseQuery(url.search);
  var keys = Object.keys(queryObject);
  // var queryString = formatObj(queryObject);
  var queryString = keys
    .map((key) => `<b>${key}:</b> ${queryObject[key]}`)
    .join("<br>");

  var urlComponents = document.getElementById("urlComponents");
  urlComponents.innerHTML = `
      <b>Protocol:</b> ${url.protocol}<br>
      <b>Hostname:</b> ${url.hostname}<br>
      <b>Port:</b> ${url.port}<br>
      <b>Path:</b> ${url.pathname}<br><br>

      <b><h2>Query Params</h2></b> ${queryString} <br><br>

      <b><h2>LLC</h2></b>
      <b>Account:</b> ${piecesOfPath[2] === "accounts" && piecesOfPath[3]}<br>
      <b>Entity:</b> ${piecesOfPath[4] === "entities" && piecesOfPath[5]}<br>


    `;
});
