var myInput =  document.getElementById('search');
var myDataList = document.getElementById('json-datalist')
var myOptions = document.getElementById('json-datalist').childNodes;

function listOptionSelected() {
    var myValue = myInput.value;
    for (var i = 0; i < myOptions.length; i++) {
        if (myOptions[i].value === myValue) {
            console.log('Option Selected: ' + myValue);
        }
    }
}

function typedOptionSelected() {
    var myValue = myInput.value;
    if (myValue !== '') {
        console.log('Option Selected: ' + myInput.value);
    }
}

myInput.addEventListener('input', listOptionSelected, false);
myInput.addEventListener('blur', typedOptionSelected, false);
