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
//.style("top", "-80px")
//.style("left", "-160px")
    .style("width", w + "px")
    .style("height", h + "px")
    .style("position", "absolute")
    .style("-webkit-backface-visibility", "hidden");

var svg = div.append("svg:svg")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + rx + "," + ry + ")");

svg.append("svg:path")
    .attr("class", "arc")
    .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
    .on("mousedown", mousedown);

d3.json("https://fergustaylor.github.io/D3/flare2.json", function(classes) {
  var nodes = cluster.nodes(packages.root(classes)),
      links = packages.imports(nodes),
      splines = bundle(links);

  var path = svg.selectAll("path.link")
      .data(links)
    .enter().append("svg:path")
      .attr("class", function(d) { return "link source-" + d.source.key + " target-" + d.target.key; })
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
      //.on("mouseup", clickup)
      .on("dblclick", clear);
      //cfvnbm,.sdvjd
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

//function click(d) {
//  //clear all previous on mousedown?
//  svg.selectAll("path.link.target-" + d.key)
//      .classed("target2", true)
//
//  svg.selectAll("path.link.source-" + d.key)
//      .classed("source2", true)
//      //
//}

var drugselected;

var drugtotal;

var druginteractions;

var druginfo = []; 

function click(d) {
  //clear all previous
  svg.selectAll("path")
      .classed("source2", false)

  svg.selectAll("path")
      .classed("target2", false)

  //clear drug
  var myNode = document.getElementById("drug");
  myNode.innerHTML = '';

  //then colour the new selection.
  svg.selectAll("path.link.target-" + d.key)
      .classed("target2", true)

  svg.selectAll("path.link.source-" + d.key)
      .classed("source2", true)
      //
  drugselected = d.key;
  document.getElementById('title').innerHTML = drugselected;

  druginteractions = svg.selectAll("path.link.source-" + d.key);

  drugtotal = druginteractions[0].length;

//create druginfo
  druginfo = [];

  for (i = 0; i < druginteractions[0].length; i++) {
  druginfo.push(druginteractions[0][i].__data__.target.key);
}
//
druginfo.forEach(function(druginfo){
  div2 = document.getElementById('drug');
  div = document.createElement("a");
  div.appendChild(document.createTextNode(druginfo));
  div2.appendChild(div).classList.add("showSingle","sidebar2");
  div2.appendChild(div);
  div3 = document.createElement("br");
  div2.appendChild(div3);
});

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
div2.appendChild(div).classList.add("sidebar2");

//add break
div3 = document.createElement("br");
div2.appendChild(div3);

//Bottom
  document.getElementById('drugstotal').innerHTML = drugtotal + " Interactions Listed";
// drugstotal will list 1, if 0 interactions, since a path to BNF exists.
}

//function clickup(d) {
//}

//clear everythin on doubleclick
function clear(d) {
  svg.selectAll("path")
      .classed("source2", false)

  svg.selectAll("path")
      .classed("target2", false)

  //clear drug
  var myNode = document.getElementById("drug");
  myNode.innerHTML = '';

  var drugselected = null;
  document.getElementById('title').innerHTML = "Click on a drug to get started..";
  document.getElementById('drugstotal').innerHTML = "X Interactions Listed";
//change ^ to 'click a drug to get started'
}

//function clickup(d) {
//  svg.selectAll("path.link.source-" + d.key)
//      .classed("source2", false)
//
//  svg.selectAll("path.link.target-" + d.key)
//      .classed("target2", false)
//}

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
        .attr("transform", function(d) { return (d.x + rotate) % 360 < 180 ? null : "rotate(180)"; });
  }
}

function mouseover(d) {
  svg.selectAll("path.link.target-" + d.key)
      .classed("target", true)
      .each(updateNodes("source", true));

  svg.selectAll("path.link.source-" + d.key)
      .classed("source", true)
      .each(updateNodes("target", true));
}

function mouseout(d) {
  svg.selectAll("path.link.source-" + d.key)
      .classed("source", false)
      .each(updateNodes("target", false));

  svg.selectAll("path.link.target-" + d.key)
      .classed("target", false)
      .each(updateNodes("source", false));
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
