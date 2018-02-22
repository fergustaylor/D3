var w = window.innerWidth,
    h = window.innerHeight,
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
    .attr("class", "flex-container")
    .append("svg:g")
    .attr("transform", "translate(" + rx + "," + ry + ")");

svg.append("svg:path")
    .attr("class", "arc")
    .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
    .on("mousedown", mousedown);

d3.json("https://fergustaylor.github.io/D3/dev/flare.json", function(classes) {

  //Update Timestamp
  document.getElementById('disclaimer').innerHTML = "This data was last updated " + classes[0].Stamp;

  var classes2 = []
  //add key to classes array
  for (ii = 0; ii < classes.length; ii++) {
    classes[ii].key = classes[ii].name.substring(i = classes[ii].name.lastIndexOf(".") + 1)
  }
  //filter classes array
  for (i = 0; i < druginputarray.length; i++) {
    for (ii = 0; ii < classes.length; ii++) {
      if (classes[ii].key == druginputarray[i]) {
        classes2.push(classes[ii])
      }
    }
  };

  var nodes = cluster.nodes(packages.root(classes2)),
      links = packages.imports(nodes),
      splines = bundle(links);

  var path = svg.selectAll("path.link")
      .data(links)
      .enter().append("svg:path")
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
      //.on("mousedown", click)
      .on("dblclick", clear);

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

var druginteractions = [];
var druginfo = [];

var druginteractionsinfo = [];
var evidenceinfo = [];
var severityinfo = [];

var drugtitles = [];
var druginteractionsinfo2 = [];
var evidenceinfo2 = [];
var severityinfo2 = [];

//////
clickfunction
/////

//clear everything on doubleclick
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

  var hovering = document.querySelectorAll(".node:hover")[0].__data__.key;
  var drugselected = document.getElementById('title').innerHTML
  var includedinteractions = document.querySelectorAll(".node.targetnode.target");
  var hoverinteractions = document.querySelectorAll(".link.source");

  var dov2 = document.getElementById('close2');
  var dov = document.createElement("a");

  if (hovering == document.getElementById('title').innerHTML) {
      dov.appendChild(document.createTextNode("You're hovering over the selected drug, ("+drugselected+"), try moving the mouse over another drug to compare the two."));
      dov2.appendChild(dov);
      var drugselected = null;
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
