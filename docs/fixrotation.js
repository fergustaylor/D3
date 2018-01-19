function changeit(className) {
    var elems = document.querySelectorAll("*");
    var index = 0, length = elems.length;
    for ( ; index < length; index++) {
        elems[index].style.transformOrigin = "0px 0px 0px";
    }
}

document.getElementById("squiggle").style.transformOrigin = "50% 50% 0px";
