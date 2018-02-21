var selec = document.createElement('div');

selec.setAttribute("class", "drugselected");

selec.style.backgroundColor = "#9ee4fb4d"
selec.style.position = "absolute"
selec.style.top = "26px"
selec.style.left = "20px"
selec.style.width = "20vh"
selec.style.height = "auto";

var selec2 = document.createElement('p')
var selec25 = document.createTextNode("Selected Drugs");
selec2.appendChild(selec25);

selec2.style.font = "300 13px 'Helvetica Neue', Helvetica, Arial, sans-serif"
selec2.style.fill = "#bbb"
selec2.style.margin = "2px"
selec2.style.paddingLeft = "2px"
selec2.style.paddingTop = "2px";

var selec3 = document.createElement('hr')
var selec4 = document.createElement('br')

document.body.appendChild(selec);
selec.appendChild(selec2);
selec.appendChild(selec3);

var selec5 = document.createElement('p')
var selec55 = document.createTextNode(druginput);
selec5.appendChild(selec55);
selec5.style.font = "300 13px 'Helvetica Neue', Helvetica, Arial, sans-serif"
selec5.style.fill = "#bbb"
selec5.style.margin = "2px"
selec5.style.paddingLeft = "2px"
selec5.style.paddingTop = "2px";

selec.appendChild(selec5);
