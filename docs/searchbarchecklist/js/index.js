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
        // Create a new <span> element.
        var span = document.createElement('span')
        span.setAttribute("value", item.title)

        // Create a new <input> element.
        var inputs = document.createElement('input')
        inputs.setAttribute("type", "checkbox")
        inputs.setAttribute("name", "drugs")
        inputs.setAttribute("value", item.title)

        // Set the value using the item in the JSON array.
        var checklists = document.createElement('p')
        var checklists5 = document.createTextNode(item.title)
        checklists.appendChild(checklists5)

        //add a break
        var breaks = document.createElement('br')

        // Add the <input> element to the <span>.
        span.appendChild(inputs);
        // Add the <p> element to the <span>.
        span.appendChild(checklists);

        checklistcontainer.appendChild(span);
      });
    }
  }
};

// Set up and make the request.
request.open('GET', 'https://fergustaylor.github.io/D3/dev/flare2electricboogaloo.json', true);
request.send();

//functions for the radio buttons
function showall() {
  var all = $('div#checklist>span' )
  //loop through all
  for (i = 0; i < all.length; i++) {
    all[i].style.display = 'block';
  }
}

function showselected() {
  var all = $('div#checklist>span' )
  //loop through all
  for (i = 0; i < all.length; i++) {
    all[i].style.display = 'none';
  }
  var selected = $('div#checklist>span>input:checked' ).parent()
  //loop through selected
  for (i = 0; i < selected.length; i++) {
    selected[i].style.display = 'block';
  }
}

function showunselected() {
  var all = $('div#checklist>span' )
  //loop through all
  for (i = 0; i < all.length; i++) {
    all[i].style.display = 'none';
  }
  var unselected = $('div#checklist>span>input').not(':checked').parent()
  //loop through selected
  for (i = 0; i < selected.length; i++) {
    unselected[i].style.display = 'block';
  }
}
