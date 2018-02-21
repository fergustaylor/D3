//Load data
var loadeddata = $.getJSON( "https://fergustaylor.github.io/D3/dev/flare2electricboogaloo.json", function() {
  loadeddata = loadeddata.responseJSON;

  //Create druginputarray
  function createindex() {
    var druginputarray = [];
    var selected = $('div#checklist>span>input:checked' );
    //create array
    for (i = 0; i < selected.length; i++) {
      druginputarray.push(selected[i].value);
    }
    return(druginputarray);
  }
  var druginputarray = createindex();

  //Create subselection
  var subselection = [];
  druginputarray.forEach( function(item) {
    for (i = 0; i < loadeddata.length; i++) {
      if (item == loadeddata[i].title) {
        subselection.push(loadeddata[i]);
      }
    }
  });

///end of callback
})

/////////////////
var filterindex = [];
//var q = 0
subselection.forEach( function(item) {
  for (i = 0; i < item.importstitle.length; i++) {
    var filteredindex = [];
    for (ii = 0; ii < druginputarray.length; ii++) {
      if (item.importstitle[i] == druginputarray[ii]) {
        filteredindex.push(i)
    }
    }
}
filterindex.push(filteredindex)
//increase index
//q++
});
