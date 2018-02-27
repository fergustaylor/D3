var dav = document.getElementById('div');
var dav2 = document.createElement("span");
var dav3 = document.createTextNode(druginteractionsinfo[i])
var dav4 = document.createElement("span");

dav4.appendChild(document.createElement("br"));
dav4.appendChild(document.createTextNode("Evidence: "+evidenceinfo[i]+" | Severity: "+severityinfo[i]));
dav4.classList.add("evidsev","sidebar2");

dav2.appendChild(dav3);
dav.appendChild(dav2);
dav2.appendChild(dav4);

dav2.setAttribute('evidence', evidenceinfo[i]);
dav2.setAttribute('severity', severityinfo[i]);

dav2.classList.add("targetDiv","sidebar2");

dav2.id = "div"+(i+1);
