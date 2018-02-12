// Get the <datalist> and <input> elements.
var dataList = document.getElementById('json-datalist');
var input = document.getElementById('search');
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
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = item.title;
        //option.addEventListener("submit", myScript);
        //option.addEventListener("click", myFunction);
        // Add the <option> element to the <datalist>.
        dataList.appendChild(option);
      });
      // Update the placeholder text.
      input.placeholder = "Search by drug name";
    } else {
      // An error occured :(
      input.placeholder = "Couldn't load datalist options :(";
    }
  }
};

// Update the placeholder text.
input.placeholder = "Loading the BNF...";
// Set up and make the request.
request.open('GET', 'https://fergustaylor.github.io/D3/dev/flare2electricboogaloo.json', true);
request.send();

var druginputarray = [];
var myOptions = document.getElementById('json-datalist').childNodes;

function listOptionSelected() {

    $( ".drugselected" ).remove();

    var myValue = input.value;
    for (var i = 0; i < myOptions.length; i++) {
        if (myOptions[i].value === myValue) {
            console.log('Option Selected: ' + myValue);
            druginputarray.push(myValue);
            }
        }
    // create div.
    var selec = document.createElement('div');
    selec.setAttribute("class", "drugselected");

    var selec2 = document.createElement('p')
    var selec25 = document.createTextNode("Selected Drugs");
    selec2.appendChild(selec25);

    var selec3 = document.createElement('hr')
    var selec4 = document.createElement('br')

    selec.appendChild(selec2);
    selec.appendChild(selec3);
    selec.appendChild(selec4);

    for (var ii = 0; ii < druginputarray.length; ii++) {
    var selec5 = document.createElement('p');
    selec5.setAttribute("class", "druglist");
    var selec55 = document.createTextNode(druginputarray[ii]);
    selec5.appendChild(selec55);
    selec.appendChild(selec5);
    }

    document.body.appendChild(selec);
    }

input.addEventListener('input', listOptionSelected, false);

jQuery(function(){
jQuery('#close').click(function(){
  jQuery('.sidebar').hide();
        });

jQuery('#open').click(function(){
  jQuery('.sidebar').show();
        });
});

var drugtotal;

var mildtotal;
var modtotal;
var sevtotal;
var natotal;

var studytotal;
var anectotal;
var theototal;
var nsetotal;

var druginteractions;
var druginfo = []; 
var druginteractionsinfo = []; 
var evidenceinfo = []; 
var severityinfo = []; 

function click(druginput) {
//function click(druginput, callback) {
  //Clear all
  var drugtotal = []; 
  var mildtotal = []; 
  var modtotal = []; 
  var sevtotal = []; 
  var natotal = []; 
  var studytotal = []; 
  var anectotal = []; 
  var theototal = []; 
  var nsetotal = []; 
  var druginteractions = []; 
  var druginfo = []; 
  var druginteractionsinfo = []; 
  var evidenceinfo = []; 
  var severityinfo = []; 

  //clear drug
  var myNode = document.getElementById("drug");
  myNode.innerHTML = '';

  //clear div
  var myNode = document.getElementById("div");
  myNode.innerHTML = '';

  //clear bottom
  var myNode = document.getElementById("drugstotal");
  myNode.innerHTML = '';
  var myNode = document.getElementById("mildmodsevere");
  myNode.innerHTML = '';
  var myNode = document.getElementById("notstated");
  myNode.innerHTML = '';

  //clear title
  var myNode = document.getElementById('title');
  myNode.innerHTML = '';

  /////
  ////
  ///
  //

  // label sidebar
  document.getElementById('title').innerHTML = druginput;
  //load interactionsinfo based off click
  d3.json("https://fergustaylor.github.io/D3/dev/flare2electricboogaloo.json", function(data) {
  //////////////
    for (i = 0; i < data.length; i++) {
    if (data[i].title == druginput) {

    //Set variables
    druginteractionsinfo = data[i]['Interactions Info']
    evidenceinfo = data[i].Evidence
    severityinfo = data[i].Severity
    drugtotal = data[i].imports.length;
    druginfo = data[i].importstitle

    /// add severity totals
    mildtotal = data[i].mildtot
    modtotal = data[i].modtot
    sevtotal = data[i].sevtot
    natotal = data[i].nstot

    /// add evidence totals
    studytotal = data[i].studytot
    anectotal = data[i].anectot
    theototal = data[i].theorettot
    nsetotal = data[i].nsetot

    $(document).ready(function() {

    for (i = 0; i < druginfo.length; i++) {
      div2 = document.getElementById('drug');
      var att = document.createAttribute("target");
      att.value = i+1;
      div = document.createElement("a");
      var blep = druginfo[i];

      //relabel at start?
      if (druginfo[0] == undefined) {
            blep = "This drug has no interactions with the other drugs listed in this graph.";
        }
      ////Create the drugs titles
      div.appendChild(document.createTextNode(blep));
      div2.appendChild(div).classList.add("showSingle","sidebar2");
      div2.appendChild(div).setAttributeNode(att);
      div3 = document.createElement("br");
      div2.appendChild(div3);

      //end of loop
    };

    // add list all, hide all, line
    div2 = document.getElementById('drug');

    //add a break between drugs and the list all/hide all
    div3 = document.createElement("br");
    div2.appendChild(div3);

    //create list all
    div = document.createElement("a");
    div.appendChild(document.createTextNode("List All"));
    div.id = "showall";
    div2.appendChild(div).classList.add("sidebar2");

    //add break
    div3 = document.createElement("br");
    div2.appendChild(div3);

    //create hide all
    div = document.createElement("a");
    div.appendChild(document.createTextNode("Hide All"));
    div.id = "hideall";
    div2.appendChild(div).classList.add("sidebar2");

    //add break
    div3 = document.createElement("br");
    div2.appendChild(div3);

    //create line
    div = document.createElement("hr");
    div2.appendChild(div);

    //create druginteractionsinfo divs
    for (i = 0; i < druginteractionsinfo.length; i++) {
      var dav = document.getElementById('div');
      var dav2 = document.createElement("span");
      var dav3 = document.createTextNode(druginteractionsinfo[i])
      var dav4 = document.createElement("span");

      dav4.appendChild(document.createElement("br"));
      dav4.appendChild(document.createTextNode("Evidence: "+evidenceinfo[i]+" | Severity: "+severityinfo[i]));
      dav4.classList.add("evidsev","sidebar2");

      dav2.appendChild(dav3);
      dav.appendChild(dav2);
      dav2.appendChild(dav4);

      dav2.setAttribute('evidence', evidenceinfo[i]);
      dav2.setAttribute('severity', severityinfo[i]);

      dav2.classList.add("targetDiv","sidebar2");

      dav2.id = "div"+(i+1);
    };

    //Bottom
    document.getElementById('drugstotal').innerHTML = drugtotal+" Interactions Listed";
    document.getElementById('mildmodsevere').innerHTML = sevtotal+" Severe | "+modtotal+" Moderate | "+mildtotal+" Mild";
    document.getElementById('notstated').innerHTML = natotal+" Not Stated";

    //recolour severe text
    for (i=0; i < document.querySelectorAll(".showSingle").length; i++) {
    document.querySelectorAll(".showSingle")[i].classList.add(severityinfo[i]);
    };

    jQuery(function(){
    jQuery('#showall').click(function(){
        jQuery('.targetDiv').show();
              });

    jQuery('#hideall').click(function(){
        jQuery('.targetDiv').hide();
              });

    jQuery('.showSingle').click(function(){
        jQuery('.targetDiv').hide();
        jQuery('#div'+$(this).attr('target')).show();
              });
    });

    //end of ready
    });

    //end of if
    };

//end of loop.
};

//end of d3 load
});

//colour severe
    for (i=0; i < document.querySelectorAll(".showSingle").length; i++) {
    document.querySelectorAll(".showSingle")[i]
    .classList.add(severityinfo[i]);
    };

//show bottom
jQuery('.bottom').show();
//open sidebar
jQuery('.sidebar').show();

//end of click
//callback();

};
