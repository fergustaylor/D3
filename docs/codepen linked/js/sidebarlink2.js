// Link the sidebar to mousevents

var header = document.getElementById('title');
// header.style= "display:block;"
//header.innerHTML = "Click on a drug to get started.";

// var interactions = document.getElementsByClassName("node");

// var interactionsinfo =

// var bottom =

var clicked = document.getElementsByClassName("node");

clicked.addEventListener("click", function(){
  alert("you clicked " + clicked.id);
});
//  var i;
//  for (i = 0; i < x.length; i++) {
//     x[i].style.fill = "#026559";
// };

//$("text").click(function(){
  header.innerHTML = $( this );
});

//$("text").mouseup(function(){
//    $( this ).css("color", "blue")
//});
