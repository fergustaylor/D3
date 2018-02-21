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
node11.setAttribute("src", "d3-2textscript.js");
body.appendChild(node11);

//HTML
document.write('

<a class="sidebar2" id="open">&#9776;</a>\
<div class="sidebar sidebar2" style="display:none;">\
<a  class="sidebar2" id="close">&#9776;</a><br>\
<a  class="sidebar2" id="title">Click on a drug to get started..</a><br>\
<div id="drug" class="menu sidebar2">\
</div>\

<div class="hoveroverlap">\
<hr style="height:4px, colour:black;">\
<a id="shownotice">Show additional information by hovering over another drug.</a>\
<div class="hoveroverlap2" id="close2">\
</div>\
<hr style="height:4px, colour:black;">\
</div>\

<section id="div" class="cnt sidebar2">\
</section>\

<section class="bottom sidebar2" style="display: none;">\
<a id="drugstotal" class="sidebar2">X Interactions Listed</a><br>\
<a id="mildmodsevere" class="sidebar2">X Severe | X Moderate | X Mild</a><br>\
<a id="notstated" class="sidebar2">X Not stated</a>\
</section>\
</div>\

<div id="tensionbar" style="position:fixed;bottom:0;left:0;padding-left:20px;padding-bottom:20px;font-size:18px;">\
<form name="cssbox">\
<input type="checkbox" name="cssbox" onchange="toggleCheckbox(this)"/><p>Colour the severe drug interactions</p>\
</form>\
<input style="position:relative;top:3px;" type="range" min="0" max="100" value="85">\
</div>\

<script  src="js/index.js"></script>\

<div class="notice">\
<p>This graph is based on <a href="">the BNF.</a></p>\
<p id="disclaimer">This data was last updated X.</p>\
</div>\

');
