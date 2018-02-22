function click(d) {
  //Clear all
  var drugselected = [];
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
  var druginfo = [];

  var druginteractionsinfo = [];
  var evidenceinfo = [];
  var severityinfo = [];

  var drugtitles = [];
  var druginteractionsinfo2 = [];
  var evidenceinfo2 = [];
  var severityinfo2 = [];

  //clear all previous
  svg.selectAll("path")
      .classed("source2", false)

  svg.selectAll("path")
     .classed("target2", false)

  svg.selectAll("g.node")
     .classed("targetnode", false)

  //clear close2
  var myNode = document.getElementById('close2');
  myNode.innerHTML = '';

  //show "show addition information by hovering.."
  jQuery('#shownotice').show();

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

  //then colour the new selection.
  svg.selectAll("path.link.target-" + d.key)
      .classed("target2", true)

  svg.selectAll("path.link.source-" + d.key)
      .classed("source2", true)

  // colour text also
  svg.selectAll("g.node.target")
      .classed("targetnode", true)

  // label sidebar
  drugselected = d.key;
  document.getElementById('title').innerHTML = drugselected;

  druginteractions = svg.selectAll("path.link.source-" + d.key);

  drugtotal = druginteractions[0].length;

  for (i = 0; i < druginteractions[0].length; i++) {
  druginfo.push(druginteractions[0][i].__data__.target.key);}

  //create sidebar
  for (i = 0; i < druginfo.length; i++) {
  duv2 = document.getElementById('drug');
  var att = document.createAttribute("target");
  att.value = i+1;
  duv = document.createElement("a");
  var blep = druginfo[i];
  //if (druginfo[0] == undefined && druginfo.length=1) {
  if (druginfo[0] == undefined) {
        blep = "This drug has no interactions with the other drugs listed in this graph.";
    }
  duv.appendChild(document.createTextNode(blep));
  duv2.appendChild(duv).classList.add("showSingle","sidebar2");
  duv2.appendChild(duv).setAttributeNode(att);
  duv3 = document.createElement("br");
  duv2.appendChild(duv3);}

// add list all, hide all, line
duv2 = document.getElementById('drug');

//add a break between drugs and the list all/hide all
duv3 = document.createElement("br");
duv2.appendChild(duv3);

//create list all
duv = document.createElement("a");
duv.appendChild(document.createTextNode("List All"));
duv.id = "showall";
duv2.appendChild(duv).classList.add("sidebar2");

//add break
duv3 = document.createElement("br");
duv2.appendChild(duv3);

//create hide all
duv = document.createElement("a");
duv.appendChild(document.createTextNode("Hide All"));
duv.id = "hideall";
duv2.appendChild(duv).classList.add("sidebar2");

//add break
duv3 = document.createElement("br");
//div2.appendChild(div3);

//create line
duv = document.createElement("hr");

//load interactionsinfo based off click
d3.json("https://fergustaylor.github.io/D3/dev/flare.json", function(data) {

  for (i = 0; i < data.length; i++) {
  if (data[i].title == drugselected) {
/// console.log(data[i]['Interactions Info'])
/// add div code
druginteractionsinfo = data[i]['Interactions Info']
druginteractionsinfo2 = []
evidenceinfo = data[i].Evidence
evidenceinfo2 = []
drugtitles = data[i].importstitle
severityinfo = data[i].Severity
severityinfo2 = []

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

//Bottom
document.getElementById('drugstotal').innerHTML = drugtotal+" Interactions Listed";
document.getElementById('mildmodsevere').innerHTML = sevtotal+" Severe | "+modtotal+" Moderate | "+mildtotal+" Mild";
document.getElementById('notstated').innerHTML = natotal+" Not Stated";

//create druginteractionsinfo divs
$(document).ready(function() {
for (i = 0; i < drugtitles.length; i++) {
for (ii = 0; ii < druginfo.length; ii++) {
  if (drugtitles[i] == druginfo[ii]) {
    druginteractionsinfo2.push(druginteractionsinfo[i])
    evidenceinfo2.push(evidenceinfo[i])
    severityinfo2.push(severityinfo[i])
}
}
};

for (i = 0; i < druginfo.length; i++) {
  var dav = document.getElementById('div');
  var dav2 = document.createElement("span");
  var dav3 = document.createTextNode(druginteractionsinfo2[i])
  var dav4 = document.createElement("span");

  dav4.appendChild(document.createElement("br"));
  dav4.appendChild(document.createTextNode("Evidence: "+evidenceinfo2[i]+" | Severity: "+severityinfo2[i]));
  dav4.classList.add("evidsev","sidebar2");

  dav2.appendChild(dav3);
  dav.appendChild(dav2);
  dav2.appendChild(dav4);

  dav2.setAttribute('evidence', evidenceinfo2[i]);
  dav2.setAttribute('severity', severityinfo2[i]);

  dav2.classList.add("targetDiv","sidebar2");

  dav2.id = "div"+(i+1);
}

});

}
}

//recolour severe text
$(document).ready(function() {
for (i=0; i < document.querySelectorAll(".showSingle").length; i++) {
document.querySelectorAll(".showSingle")[i]
.classList.add(severityinfo[i]);
};
});
});
//^end of json loaded

//show bottom
jQuery('.bottom').show();
//open sidebar
jQuery('.sidebar').show();
jQuery('.hoveroverlap').show();
//
jQuery('#showall').click(function(){
  //hide evidence/severity span
  //jQuery('.evid/sev').hide();
  //
  jQuery('.targetDiv').show();
        });

jQuery('#hideall').click(function(){
  //hide evidence/severity span
  //jQuery('.evid/sev').hide();
  //
  jQuery('.targetDiv').hide();
        });

jQuery('.showSingle').click(function(){
  //hide evidence/severity span
  //jQuery('.evid/sev').hide();
  //
  jQuery('.targetDiv').hide();
  jQuery('#div'+$(this).attr('target')).show();

  //create span based off class.
        });

//colour severe
        for (i=0; i < document.querySelectorAll(".showSingle").length; i++) {
        document.querySelectorAll(".showSingle")[i]
        .classList.add(severityinfo[i]);
        };

};
