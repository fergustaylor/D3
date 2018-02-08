var w = screen.width,
    h = screen.height,
    rx = w / 2,
    ry = h / 2,
    m0,
    rotate = 0;

var splines = [];

var cluster = d3.layout.cluster()
    .size([360, ry - 120])
    .sort(function(a, b) { return d3.ascending(a.key, b.key); });

var bundle = d3.layout.bundle();

var line = d3.svg.line.radial()
    .interpolate("bundle")
    .tension(.85)
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

var div = d3.select("body").insert("div", "h2")
    .style("width", w + "px")
    .style("height", w + "px")
    .style("position", "absolute")
    .style("-webkit-backface-visibility", "hidden");

var svg = div.append("svg:svg")
    .attr("width", w)
    .attr("height", w)
    //make class flexbox
    .attr("class", "flex-container")
  .append("svg:g")
    .attr("transform", "translate(" + rx + "," + ry + ")");

svg.append("svg:path")
    .attr("class", "arc")
    .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
    .on("mousedown", mousedown);

d3.json("https://fergustaylor.github.io/D3/dev/flareexample.json", function(classes) {

  //Update Timestamp
  document.getElementById('disclaimer').innerHTML = "This data was last updated " + classes[0].Stamp;

  var nodes = cluster.nodes(packages.root(classes)),
      links = packages.imports(nodes),
      splines = bundle(links);

  var path = svg.selectAll("path.link")
      .data(links)
    .enter().append("svg:path")
      //.attr("class", function(d) { return "link source-" + d.source.key + " target-" + d.target.key; })
      //add severity to each path by class
      .attr("class", function(d) { return "link source-" + d.source.key + " target-" + d.target.key + " " + d.source.Severity[d.source.importstitle.indexOf(d.target.key)];})
      .attr("d", function(d, i) { return line(splines[i]); });

  svg.selectAll("g.node")
      .data(nodes.filter(function(n) { return !n.children; }))
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("id", function(d) { return "node-" + d.key; })
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    .append("svg:text")
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
      .text(function(d) { return d.key; })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("mousedown", click)
      .on("dblclick", clear);
      //

  d3.select("input[type=range]").on("change", function() {
    line.tension(this.value / 100);
    path.attr("d", function(d, i) { return line(splines[i]); });
  });
});

d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup);

function mouse(e) {
  return [e.pageX - rx, e.pageY - ry];
}

function mousedown() {
  m0 = mouse(d3.event);
  d3.event.preventDefault();
}

var drugselected;
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
var druginfo = [];
var druginteractionsinfo = [];
var evidenceinfo = [];
var severityinfo = [];

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
d3.json("https://fergustaylor.github.io/D3/dev/flareexample.json", function(data) {

  for (i = 0; i < data.length; i++) {
  if (data[i].title == drugselected) {
/// console.log(data[i]['Interactions Info'])
/// add div code
druginteractionsinfo = data[i]['Interactions Info']
evidenceinfo = data[i].Evidence
severityinfo = data[i].Severity

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

//clear everythin on doubleclick
function clear(d) {
  //hide bottom
  jQuery('.bottom').hide();
  //hide sidebar
  jQuery('.sidebar').hide();

  svg.selectAll("path")
      .classed("source2", false)

  svg.selectAll("path")
      .classed("target2", false)

  svg.selectAll("g.node")
     .classed("targetnode", false)

  jQuery('.hoveroverlap').hide();

  //clear drug
  var myNode = document.getElementById("drug");
  myNode.innerHTML = '';

  var drugselected = null;
  document.getElementById('title').innerHTML = "Click on a drug to get started..";
  document.getElementById('drugstotal').innerHTML = "X Interactions Listed";

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
}

function mousemove() {
  if (m0) {
    var m1 = mouse(d3.event),
        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;
    div.style("-webkit-transform", "translateY(" + (ry - rx) + "px)rotateZ(" + dm + "deg)translateY(" + (rx - ry) + "px)");
  }
}

function mouseup() {
  if (m0) {
    var m1 = mouse(d3.event),
        dm = Math.atan2(cross(m0, m1), dot(m0, m1)) * 180 / Math.PI;

    rotate += dm;
    if (rotate > 360) rotate -= 360;
    else if (rotate < 0) rotate += 360;
    m0 = null;

    div.style("-webkit-transform", null);

    svg
    .attr("transform", "translate(" + rx + "," + ry + ")rotate(" + rotate + ")")
    .selectAll("g.node text")
    .attr("dx", function(d) { return (d.x + rotate) % 360 < 180 ? 8 : -8; })
    .attr("text-anchor", function(d) { return (d.x + rotate) % 360 < 180 ? "start" : "end"; })
    .attr("transform", function(d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; })
  }
}
//var hovering;

function mouseover(d) {
  svg.selectAll("path.link.target-" + d.key)
      .classed("target", true)
      .each(updateNodes("source", true));

  svg.selectAll("path.link.source-" + d.key)
      .classed("source", true)
      .each(updateNodes("target", true));

      //clear close2
      var myNode = document.getElementById('close2');
      myNode.innerHTML = '';

      //clear notice
      //document.getElementById('notice').innerHTML = ""

      //add <a> for on:hover
    var hovering = document.querySelectorAll(".node:hover")[0].__data__.key;

//not sure why drugselected was the previous drug selected. so I'm setting it from the header which always seems to be correct.
    var drugselected = document.getElementById('title').innerHTML
    //var newinteractions = document.querySelectorAll(".node:hover");

    var includedinteractions = document.querySelectorAll(".node.targetnode.target");

    var hoverinteractions = document.querySelectorAll(".link.source");

    var dov2 = document.getElementById('close2');
    var dov = document.createElement("a");

    if (hovering == document.getElementById('title').innerHTML) {
    dov.appendChild(document.createTextNode("You're hovering over the selected drug, ("+drugselected+"), try moving the mouse over another drug to compare the two."));
    dov2.appendChild(dov);
//then clear drugselected
    var drugselected = null;
    //
    }
    else {
      dov.appendChild(document.createTextNode("You're hovering over "+hovering+"."));
      dov.appendChild(document.createElement("br"));
      dov.appendChild(document.createTextNode("It has "+hoverinteractions.length+" interactions."));
      dov.appendChild(document.createElement("br"))
      dov.appendChild(document.createTextNode("It shares "+includedinteractions.length+" interaction(s) with "+drugselected+"."));
      dov.appendChild(document.createElement("br"));
      dov.appendChild(document.createElement("br"));
      //
      for (i = 0; i < includedinteractions.length; i++) {
      dov.appendChild(document.createElement("li").appendChild(document.createTextNode("- "+includedinteractions[i].__data__.key)));
      dov.appendChild(document.createElement("br"));
      }
      dov2.appendChild(dov);
    }
    jQuery('#shownotice').hide();
}

function mouseout(d) {
  svg.selectAll("path.link.source-" + d.key)
      .classed("source", false)
      .each(updateNodes("target", false));

  svg.selectAll("path.link.target-" + d.key)
      .classed("target", false)
      .each(updateNodes("source", false));
  var myNode = document.getElementById('close2');
  myNode.innerHTML = '';
  var hovering = "";
  jQuery('#shownotice').show();
}

function updateNodes(name, value) {
  return function(d) {
    if (value) this.parentNode.appendChild(this);
    svg.select("#node-" + d[name].key).classed(name, value);
  };
}

function cross(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

//trying to recentre any rotations. not sure how I broke it originally.
///document.querySelector("body > div:nth-child(1) > svg").style.transformOrigin = rx+"px"+" "+rx+"px";
