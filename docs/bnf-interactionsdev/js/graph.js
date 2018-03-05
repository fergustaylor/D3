function endload () {

  //new css
  var newcss = document.createElement("link");
  newcss.setAttribute("rel", "stylesheet");
  newcss.setAttribute("href", "css/graphstyle.css");
  document.head.appendChild(newcss);

  //hide loading graphic
  document.querySelectorAll("div.loading")[0].style.display = "none"

  //unhide elements
  document.getElementById("open").style.display = "";

  //hide the tensionbaritself
  document.querySelector('#tensionbar > input[type="range"]').style = "display:none;";
  //continue to unhide elements
  document.getElementById("tensionbar").style = "position:fixed;bottom:0;left:0;padding-left:20px;padding-bottom:20px;font-size:18px;";

  document.getElementsByClassName("notice")[0].style.display = "";
  document.getElementsByClassName("graphic")[0].style.display = "";
}

function graphit (druginputarray) {

//Clear previous HTML
document.body.innerHTML = '';
document.head.innerHTML = '';

//css
var nodeloading = document.createElement("link");
nodeloading.setAttribute("rel", "stylesheet");
nodeloading.setAttribute("href", "css/loading.css");
document.head.appendChild(nodeloading);

//loading
var x = document.createElement("div");
x.setAttribute("class", "loading");
document.body.appendChild(x);

//////////
//insert.js
var insertjs = document.createElement("script");
insertjs.setAttribute("src", "js/insert.js");
document.body.appendChild(insertjs);

//textscript.js
var textscriptjs = document.createElement("script");
textscriptjs.setAttribute("src", "js/textscript.js");
document.body.appendChild(textscriptjs);

//insert2.js
var insert2 = document.createElement("script");
insert2.setAttribute("src", "js/insert2.js");
document.body.appendChild(insert2);
}

function listit (druginputarray) {

//Clear previous HTML
document.body.innerHTML = '';
document.head.innerHTML = '';

//insert.js
var insertjs = document.createElement("script");
insertjs.setAttribute("src", "js/insert.js");
document.body.appendChild(insertjs);

var node40 = document.createElement("div");
node40.setAttribute("class", "notice");
document.body.appendChild(node40);

var node41 = document.createElement("p");
var node42 = document.createTextNode("This graph is based on ");
node41.appendChild(node42);

var node43 = document.createElement("a");
node43.setAttribute("href", "https://bnf.nice.org.uk/interaction/");
var node44 = document.createTextNode("the BNF.");
node43.appendChild(node44);

node41.appendChild(node43);
node40.appendChild(node41);

var node45 = document.createElement("p");
node45.setAttribute("id", "disclaimer")
var node46 = document.createTextNode("This data was last updated X.")
node45.appendChild(node46);
node40.appendChild(node45);

//new css
var newcss = document.createElement("link");
newcss.setAttribute("rel", "stylesheet");
newcss.setAttribute("href", "css/liststyle.css");
document.head.appendChild(newcss);

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
});
}
