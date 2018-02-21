function graphit (druginputarray) {
//Clear previous HTML
var body = document.body.childNodes;
for (i=body.length-1;i>=0;i--) {
    body[0].remove();
  }
var head = document.head.childNodes;
for (i=head.length-1;i>=0;i--) {
      head[0].remove();
    }

//////////Add new DOM elements
//////////
var head = document.head;

//meta
var node1 = document.createElement("meta");
node1.setAttribute("charset", "UTF-8");
head.appendChild(node1);

//title
var node2 = document.createElement("title");
var node3 = document.createTextNode("Top 100 Prescribed Drugs");
node2.appendChild(node3);
head.appendChild(node2);

//css
var node4 = document.createElement("link");
node4.setAttribute("rel", "stylesheet");
node4.setAttribute("href", "css/graphstyle.css");
head.appendChild(node4);

//jquery
var node5 = document.createElement("script");
node5.setAttribute("src", "https://code.jquery.com/jquery-1.10.2.js");
head.appendChild(node5);

//Body
var body = document.body;

//jquery
var node6 = document.createElement("script");
node6.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
body.appendChild(node6);

//d3
var node7 = document.createElement("script");
node7.setAttribute("src", "https://d3js.org/d3.v4.min.js");
body.appendChild(node7);

//d3
var node8 = document.createElement("script");
node8.setAttribute("src", "d3/d3.js");
body.appendChild(node8);

//d3
var node9 = document.createElement("script");
node9.setAttribute("src", "d3/d3.layout.js");
body.appendChild(node9);

//packages
var node10 = document.createElement("script");
node10.setAttribute("src", "packages.js");
body.appendChild(node10);

//textscript
var node11 = document.createElement("script");
node11.setAttribute("src", "graphtextscript.js");
body.appendChild(node11);

//load HTML
$(document.body).load( "https://fergustaylor.github.io/D3/searchbarchecklist/insert.html" );

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
    //make class flexbox
    .attr("class", "flex-container")
  .append("svg:g")
    .attr("transform", "translate(" + rx + "," + ry + ")");

svg.append("svg:path")
    .attr("class", "arc")
    .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
    .on("mousedown", mousedown);

d3.json("https://fergustaylor.github.io/D3/dev/flareexample.json", function(classes, druginputarray) {

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

//var nodes = cluster.nodes(packages.root(classes)),
  var nodes = cluster.nodes(packages.root(classes2)),
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
}
