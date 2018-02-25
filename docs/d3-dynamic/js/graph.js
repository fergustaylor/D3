function endload () {
  //hide loading graphic
  document.querySelectorAll("div.loading")[0].style.display = "none"

  //new css
  var newcss = document.createElement("link");
  newcss.setAttribute("rel", "stylesheet");
  newcss.setAttribute("href", "css/graphstyle.css");
  document.head.appendChild(newcss);

  //unhide elements
  document.getElementById("open").style.display = "";
  document.getElementsByClassName("notice")[0].style.display = "";
  document.getElementById("tensionbar").style = "position:fixed;bottom:0;left:0;padding-left:20px;padding-bottom:20px;font-size:18px;";
  document.querySelectorAll("div")[1].style.display = ""
}

function graphit (druginputarray, endload) {

//Clear previous HTML
//var body = document.body.childNodes;
//for (i=body.length-1;i>=0;i--) {
//    body[0].remove();
//  }
//var head = document.head.childNodes;
//for (i=head.length-1;i>=0;i--) {
//      head[0].remove();
//    }

document.body.innerHTML = '';
document.head.innerHTML = '';

//hide everything
//document.body.style.display = "none";

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

$( document ).ready(function() {
    endload()
});
}
