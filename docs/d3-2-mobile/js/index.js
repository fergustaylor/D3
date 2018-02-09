jQuery(function(){

jQuery('#close').click(function(){
  jQuery('.sidebar').hide();
        });

jQuery('#open').click(function(){
  jQuery('.sidebar').show();
        });
});

function toggleCheckbox(element)
 {
   if (document.cssbox.cssbox.checked==true) {
   var x = document.querySelectorAll("path.Severe");
   for (i = 0; i < x.length; i++) {
       x[i].style.stroke = "crimson";
     };
   }
   if (document.cssbox.cssbox.checked==false) {
   var x = document.querySelectorAll("path.Severe");
   var i;
   for (i = 0; i < x.length; i++) {
       x[i].style.stroke = "1f77b4";
     };
   }
 }

 jQuery(document).ready(function ($) {
     if (isTouchSupported || isTouchSupportedIE10) {
         // this is a mobile device
         if (window.orientation == 0 || window.orientation == 180) {
             // run init for portrait orientation
         } else if (window.orientation == 90 || window.orientation == -90) {
             // run init for landscape orientation
         }
         // detect orientation changes
         window.addEventListener("orientationchange", function () {
             if (window.orientation === 0 || window.orientation === 180) {
                 // changed to portrait
                 var div = document.createElement("div");
                                  div.style.width = "100vw";
                                  div.style.height = "100vh";
                                  div.style.background = "white";
                                  div.style.color = "black";
                                  div.style.opacity = "0.9";
                                  div.style.zindex = "10000000";

                 var note = document.createElement("p")
                 note.innerHTML = "Hello, this has 100-ish drugs around the diameter. Best to turn landscape, and reload for this one. <br>\<br>\Fergus";

                 note.style.font = '300 11px "Helvetica Neue", Helvetica, Arial, sans-serif"';
                 note.style.textAlign = "center";

                 div.appendChild(note);

                 document.body.appendChild(div);

             } else if (window.orientation == 90 || window.orientation == -90) {
                 // changed to landscape
             }
         }, false);
     }
 });
