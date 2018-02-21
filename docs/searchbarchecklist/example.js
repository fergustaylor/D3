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
}
