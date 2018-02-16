var checklistcontainer = document.getElementById('checklist');
// Create a new XMLHttpRequest.
var request = new XMLHttpRequest();
// Handle state changes for the request.
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);
      // Loop over the JSON array.
     jsonOptions.forEach(function(item) {
        // Create a new <option> element.
        var checklists = document.createElement('input')
        checklists.setAttribute("type", "checkbox")
        checklists.setAttribute("value", item.title)
        // Set the value using the item in the JSON array.
        var checklists5 = document.createTextNode(item.title)
        checklists.appendChild(checklists5)
        //add a break
        var breaks = document.createElement('br')
        // Add the <p> element to the <div>.
        checklistcontainer.appendChild(checklists);
        // Add the <br> element to the <div>.
        checklistcontainer.appendChild(breaks);
      });
    }
  }
};

// Set up and make the request.
request.open('GET', 'https://fergustaylor.github.io/D3/dev/flare2electricboogaloo.json', true);
request.send();
