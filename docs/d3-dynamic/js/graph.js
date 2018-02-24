function graphit (druginputarray) {

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
}
