var apiKey = getAPIKey();

function onEdit(e) {
  var range = e.range;
  var sheet = range.getSheet();
  
  // Check if the edited cell is in the email column
  if (range.getColumn() == 1) {
    var email = range.getValue();
    
    // Check if the value in the cell is a valid email address
    if (isValidEmail(email)) {
      // Do something with the email address, e.g. send an email
      sendEmail(email);
    }
  }
}

function isValidEmail(email) {
  // Regular expression to check if the string is a valid email address
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function getAPIKey() {
  let token, endpoint, response;
  endpoint = `https://secretmanager.googleapis.com/v1/projects/XXXXXXXXXXXX/secrets/adestrakey/versions/1:access`;
  token = ScriptApp.getOAuthToken();
  response = UrlFetchApp.fetch(endpoint, {
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
    }
  });
  var decodedAPIKey = Utilities.base64Decode(JSON.parse(response.getContentText())['payload']['data']);
  var apiKey = Utilities.newBlob(decodedAPIKey).getDataAsString()
  return apiKey;
}

function searchForEmail(email) {
  var url = 'https://app.adestra.com/api/rest/1/core_tables/44/contacts?search=%7B%22email%22:%22' + email + '%22%7D';
  var options = {
    'method': 'GET',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + apiKey
    },
  };
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
  var decoded = JSON.parse(response.getContentText());
  Logger.log(decoded);
  var toReturn;
  if (decoded.contacts[0]) {
    toReturn = decoded.contacts[0].id;
  } else {
    toReturn = false;
  }
  return toReturn;
}

function addToList(adestraId) {
  var url = 'https://app.adestra.com/api/rest/1/contacts/' + adestraId + '/lists/6142';
  var options = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + apiKey
    }
  }
  var response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());
}

function createAdestraUser(email) {
  var url = 'https://app.adestra.com/api/rest/1/contacts/';
  var payload = {
    'table_id': 44,
    'contact_data': {
      //'first_name': 'Fake',
      'email': email,
      //'last_name': 'Fake'
    }
  };
  var options = {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + apiKey
    },
    'payload': JSON.stringify(payload)
  }
  var response = UrlFetchApp.fetch(url, options);
  //Logger.log(response.getContentText());
  var decoded = JSON.parse(response.getContentText());
  Logger.log(decoded.id);
  return decoded.id;
}

function sendEmail(email) {
  //email = 'j1@example.com';
  //email = 'b3@example.com';
  let searchedId = searchForEmail(email);
  if (searchedId) {
    addToList(searchedId);
  } else {
    let createdId = createAdestraUser(email);
    addToList(createdId);
  }
}
