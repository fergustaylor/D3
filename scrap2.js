var selec = document.createElement('div');

selec.setAttribute("class", "drugselected");

var selec2 = document.createElement('p')
var selec25 = document.createTextNode("Selected Drugs");
selec2.appendChild(selec25);

var selec3 = document.createElement('hr')
var selec4 = document.createElement('br')

document.body.appendChild(selec);
selec.appendChild(selec2);
selec.appendChild(selec3);

var selec5 = document.createElement('p')
var selec55 = document.createTextNode(druginput);
selec5.appendChild(selec55);

selec.appendChild(selec5);
