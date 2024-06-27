function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowData = [];
  
  rowData.push('');// Empty
  rowData.push(new Date().toLocaleString('en-US', {month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZoneName: 'short'}));  // Timestamp
  rowData.push(e.parameter.message);// Message
  
  sheet.appendRow(rowData);
  
  // Return an empty response after processing the form submission
  return ContentService.createTextOutput("");
}

function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  var jsonData = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowData = {
      timestamp: row[1],
      message: row[2]
    };
    jsonData.push(rowData);
  }
  
  return ContentService.createTextOutput(JSON.stringify(jsonData)).setMimeType(ContentService.MimeType.JSON);
}
