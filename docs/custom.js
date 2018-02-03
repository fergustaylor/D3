var nodes = document.querySelectorAll("path");
for (i = 0; i < nodes.length; i++) {
    nodes[i].style.display = 'none';
}

//var array100 = [];
//d3.json("https://fergustaylor.github.io/D3/dev/flare100.json", function(classes) {
//  for (i = 0; i < classes.length; i++) {
//    array100.push(classes[i].name);
//}
//console.log(array100);
//});

var array100 = ["BNF.Adenosine.Adenosine", "BNF.Amiloride.Amiloride", "BNF.Amiodarone.Amiodarone", "BNF.Amitriptyline.Amitriptyline", "BNF.Amlodipine.Amlodipine", "BNF.Amoxicillin.Amoxicillin", "BNF.Apixaban.Apixaban", "BNF.Atenolol.Atenolol", "BNF.Atorvastatin.Atorvastatin", "BNF.Bendroflumethiazide.Bendroflumethiazide", "BNF.Bisoprolol.Bisoprolol", "BNF.Bumetanide.Bumetanide", "BNF.Candesartan.Candesartan", "BNF.Carbamazepine.Carbamazepine", "BNF.Ceftazidime.Ceftazidime", "BNF.Cefuroxime.Cefuroxime", "BNF.Chlordiazepoxide.Chlordiazepoxide", "BNF.Ciprofloxacin.Ciprofloxacin", "BNF.Citalopram.Citalopram", "BNF.Clarithromycin.Clarithromycin", "BNF.Clindamycin.Clindamycin", "BNF.Clonazepam.Clonazepam", "BNF.Codeine.Codeine", "BNF.Cyclizine.Cyclizine", "BNF.Diazepam.Diazepam", "BNF.Diclofenac.Diclofenac", "BNF.Digoxin.Digoxin", "BNF.Dihydrocodeine.Dihydrocodeine", "BNF.Diltiazem.Diltiazem", "BNF.Doxazosin.Doxazosin", "BNF.Doxycycline.Doxycycline", "BNF.Enoxaparin.Enoxaparin", "BNF.Esomeprazole.Esomeprazole", "BNF.Fentanyl.Fentanyl", "BNF.Flucloxacillin.Flucloxacillin", "BNF.Fluoxetine.Fluoxetine", "BNF.Furosemide.Furosemide", "BNF.Gabapentin.Gabapentin", "BNF.Gliclazide.Gliclazide", "BNF.Glucose.Glucose", "BNF.Haloperidol.Haloperidol", "BNF.Ibuprofen.Ibuprofen", "BNF.Indapamide.Indapamide", "BNF.Ipratropium.Ipratropium", "BNF.Ketamine.Ketamine", "BNF.Lansoprazole.Lansoprazole", "BNF.Levetiracetam.Levetiracetam", "BNF.Levofloxacin.Levofloxacin", "BNF.Levomepromazine.Levomepromazine", "BNF.Levothyroxine.Levothyroxine", "BNF.Lisinopril.Lisinopril", "BNF.Lorazepam.Lorazepam", "BNF.Losartan.Losartan", "BNF.Meropenem.Meropenem", "BNF.Metformin.Metformin", "BNF.Metoclopramide.Metoclopramide", "BNF.Midazolam.Midazolam", "BNF.Mirtazapine.Mirtazapine", "BNF.Morphine.Morphine", "BNF.Naproxen.Naproxen", "BNF.Nefopam.Nefopam", "BNF.Nifedipine.Nifedipine", "BNF.Nitrofurantoin.Nitrofurantoin", "BNF.Omeprazole.Omeprazole", "BNF.Ondansetron.Ondansetron", "BNF.Oxycodone.Oxycodone", "BNF.Paracetamol.Paracetamol", "BNF.Phenytoin.Phenytoin", "BNF.Pravastatin.Pravastatin", "BNF.Prochlorperazine.Prochlorperazine", "BNF.Quinine.Quinine", "BNF.Ramipril.Ramipril", "BNF.Ranitidine.Ranitidine", "BNF.Rivaroxaban.Rivaroxaban", "BNF.Salbutamol.Salbutamol", "BNF.Sertraline.Sertraline", "BNF.Simvastatin.Simvastatin", "BNF.Spironolactone.Spironolactone", "BNF.Temazepam.Temazepam", "BNF.Theophylline.Theophylline", "BNF.Tiotropium.Tiotropium", "BNF.Tramadol.Tramadol", "BNF.Trazodone.Trazodone", "BNF.Trimethoprim.Trimethoprim", "BNF.Vancomycin.Vancomycin", "BNF.Venlafaxine.Venlafaxine", "BNF.Warfarin.Warfarin", "BNF.Zopiclone.Zopiclone"];

//var array100 = [];
//d3.json("https://fergustaylor.github.io/D3/dev/flare100.json", function(classes) {
//  for (i = 0; i < classes.length; i++) {
//    array100.push(classes[i].title);
//}
//console.log(array100);
//});

var array102 = ["Adenosine", "Amiloride", "Amiodarone", "Amitriptyline", "Amlodipine", "Amoxicillin", "Apixaban", "Atenolol", "Atorvastatin", "Bendroflumethiazide", "Bisoprolol", "Bumetanide", "Candesartan", "Carbamazepine", "Ceftazidime", "Cefuroxime", "Chlordiazepoxide", "Ciprofloxacin", "Citalopram", "Clarithromycin", "Clindamycin", "Clonazepam", "Codeine", "Cyclizine", "Diazepam", "Diclofenac", "Digoxin", "Dihydrocodeine", "Diltiazem", "Doxazosin", "Doxycycline", "Enoxaparin", "Esomeprazole", "Fentanyl", "Flucloxacillin", "Fluoxetine", "Furosemide", "Gabapentin", "Gliclazide", "Glucose", "Haloperidol", "Ibuprofen", "Indapamide", "Ipratropium", "Ketamine", "Lansoprazole", "Levetiracetam", "Levofloxacin", "Levomepromazine", "Levothyroxine", "Lisinopril", "Lorazepam", "Losartan", "Meropenem", "Metformin", "Metoclopramide", "Midazolam", "Mirtazapine", "Morphine", "Naproxen", "Nefopam", "Nifedipine", "Nitrofurantoin", "Omeprazole", "Ondansetron", "Oxycodone", "Paracetamol", "Phenytoin", "Pravastatin", "Prochlorperazine", "Quinine", "Ramipril", "Ranitidine", "Rivaroxaban", "Salbutamol", "Sertraline", "Simvastatin", "Spironolactone", "Temazepam", "Theophylline", "Tiotropium", "Tramadol", "Trazodone", "Trimethoprim", "Vancomycin", "Venlafaxine", "Warfarin", "Zopiclone"];

var nodes2 = document.querySelectorAll("g");
for (i = 0; i < nodes2.length; i++) {
    nodes2[i].style.display = 'none';
}

for (i = 0; i < array102.length; i++) {
    document.getElementById("node-"+array102[i]).style.display = "block";
}

////////
//Build all, add class to elements to keep
//Delete the rest

for (i = 0; i < array102.length; i++) {
    document.getElementById("node-"+array102[i]).classList.add('keep');
}

for (i = 0; i < array102.length; i++) {
    document.getElementsByClassName("source-"+array102[i]).style.display = "block";
}

/////////
//hide paths
var nodes = document.querySelectorAll("path");
for (i = 0; i < nodes.length; i++) {
    nodes[i].style.display = 'none';
}

for (i = 0; i < array102.length; i++) {
var example1 =  document.getElementsByClassName("source-"+array102[i]);
for (ii = 0; ii < example1.length; ii++) {
    example1[ii].style.display = "block";
}
}

//hide text
var nodes2 = document.querySelectorAll("g");
for (i = 0; i < nodes2.length; i++) {
    nodes2[i].style.display = 'none';
}

var example1 =  document.getElementsByClassName("source-"+array102[1]);
for (i = 0; i < example1.length; i++) {
    example1[i].style.display = "block";
}

////

for (i = 0; i < array102.length; i++) {
for(var ii = nodes2.length - 1; ii >= 0; ii--) {
    if(nodes2[ii] === array102[i]) {
       array.splice(ii, 1);
    }
}
