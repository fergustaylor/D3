var druginputarray = ["Abciximab", "Acebutolol", "Adrenaline/epinephrine", "Agalsidase", "Agomelatine", "Albendazole", "Albiglutide", "Alcohol(beverage)", "Dairyproducts", "Dapsone", "Daptomycin", "Daratumumab", "Daunorubicin", "Ketoconazole", "Ketorolac", "Ketotifen", "Laronidase", "Lercanidipine", "Levamisole", "Prednisone", "Pregabalin", "Pseudoephedrine"];

//var nedes = document.querySelectorAll("g.node");

var nodes = document.getElementsByClassName("node");

for (i = 0; i < druginputarray.length; i++) {
  for (ii = 0; ii < nodes.length; ii++) {
    if (nodes[ii].__data__.key == druginputarray[i]) {
      nodes[ii].style.display = 'block';
    }
  }
}

var links = document.getElementsByClassName("link");
for (i = 0; i < druginputarray.length; i++) {
    for (ii = 0; ii < links.length; ii++) {
      if (links[ii].__data__.source.key == druginputarray[i]) {
        links[ii].setAttribute("step1", true);
    }
  }
}

var step2 = document.querySelectorAll('[step1="true"]');
for (i = 0; i < druginputarray.length; i++) {
    for (ii = 0; ii < step2.length; ii++) {
      if (step2[ii].__data__.target.key == druginputarray[i]) {
        step2[ii].style.display = 'block';
    }
  }
}

/////////////////
