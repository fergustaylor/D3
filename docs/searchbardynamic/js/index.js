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
        //inputs.setAttribute("value", item.title)
        inputs.setAttribute("value", item.name.substring(i = item.name.lastIndexOf(".") + 1))

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
  for (i = 0; i < unselected.length; i++) {
    unselected[i].style.display = 'block';
  }
}

function showsearched(string) {
  var all = $('div#checklist>span' )
  //loop through all
  for (i = 0; i < all.length; i++) {
    all[i].style.display = 'none';
  }
  var searched = $("span:contains("+string+")")
  //loop through searched
  for (i = 0; i < searched.length; i++) {
    searched[i].style.display = 'block';
  }
  //search by capitalised version
  var string2 = string.charAt(0).toUpperCase()+string.slice(1);
  var searched2 = $("span:contains("+string2+")")
  //loop through searched
  for (i = 0; i < searched2.length; i++) {
    searched2[i].style.display = 'block';
  }
}

function graph(druginputarray) {

//clear body
var body = document.body.childNodes;
for (i=body.length-1;i>=0;i--) {
    body[0].remove();
  }

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
  .append("svg:g")
    .attr("transform", "translate(" + rx + "," + ry + ")");

svg.append("svg:path")
    .attr("class", "arc")
    .attr("d", d3.svg.arc().outerRadius(ry - 120).innerRadius(0).startAngle(0).endAngle(2 * Math.PI))
    .on("mousedown", mousedown);

d3.json("https://fergustaylor.github.io/D3/flare.json", function(classes) {

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
      .attr("class", function(d) { return "link source-" + d.source.key + " target-" + d.target.key; })
      .attr("d", function(d, i) { return line(splines[i]); })
      /// style = hidden
      //.attr("style", "display: none")
      .attr("source", function(d) { return d.source.key; })
      .attr("target", function(d) { return d.target.key; })
      ;
      ///

  svg.selectAll("g.node")
      .data(nodes.filter(function(n) { return !n.children; }))
    .enter().append("svg:g")
      .attr("class", "node")
      .attr("id", function(d) { return "node-" + d.key; })
      /// style = hidden
      //.attr("style", "display: none")
      .attr("key", function(d) { return d.key; })
      ///
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
    .append("svg:text")
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
      .text(function(d) { return d.key; })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

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
}

function buildgraph() {
  var druginputarray = [];
  var selected = $('div#checklist>span>input:checked' );
  //create array
  for (i = 0; i < selected.length; i++) {
    druginputarray.push(selected[i].value);
  }
  console.log(druginputarray);
  graph(druginputarray);
}

jQuery(function(){

jQuery('#close').click(function(){
  jQuery('.sidebar').hide();
        });

jQuery('#open').click(function(){
  jQuery('.sidebar').show();
        });
});

function toggleCheckbox(element)
 {
   if (document.cssbox.cssbox.checked==true) {
   var x = document.querySelectorAll("path.Severe");
   for (i = 0; i < x.length; i++) {
       x[i].style.stroke = "crimson";
     };
   }
   if (document.cssbox.cssbox.checked==false) {
   var x = document.querySelectorAll("path.Severe");
   var i;
   for (i = 0; i < x.length; i++) {
       x[i].style.stroke = "1f77b4";
     };
   }
 }
