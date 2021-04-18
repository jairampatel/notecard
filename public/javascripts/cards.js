var notes;
var terms;
var definitions;
var index;
var showingCards;
$( document ).ready(function() {
  toggleButtons();
  toggleCards();
  var $btn2 = $('#btn2');

	$btn2.popover({trigger: 'hover', html: true});

});
function setNotes(n){
	notes = n;
}
function getNotes(){
	return notes;
}
function toggleHideElement(id){
	var item = document.getElementById(id).style.display;
	if(item == "none"){
		document.getElementById(id).style.display = "";
	}
	else{
		document.getElementById(id).style.display = "none";
	}
}
function toggleTextArea(){
	toggleHideElement('notes');
}
function toggleCards(){
	toggleHideElement('cards');
}

function toggleButtons(){
	$('#okButton').toggle();
	$('#errorButton').toggle();
	$('.controls').toggle();
}
function toggleElements(){
	toggleTextArea();
	toggleButtons();
}
function flashcards(){
	var button = document.getElementById("flashCardButton");
	toggleElements();
	toggleCards();
	if(!showingCards){
		$('#flashCardButton').text("Show notes");
		

		var item = document.getElementById('notes');

		setNotes(item.value);
		addNotesToFlashCards();
		showingCards = true;
	}
	else{
		$('#flashCardButton').text("Convert to flash cards");
		showingCards = false;
	}
}
function initCards(){
	terms = [];
	definitions = [];
	index = 0;
	showingCards = false;
}
function setTerms(t){
	terms = t;
}
function setDefinitions(d){
	definitions = d;
}
function parseNotes(){
	var n = getNotes();
	var lines = n.split("\n");
	for(var i =0;i < lines.length;i++){
		var line = lines[i];
		if(line.trim().length > 0){
			var pair = line.split("-");
			if(pair && pair.length > 1 && line.indexOf("-") > 0){
				terms.push(pair[0].trim());
				var def = '';
				for(var j = 1;j < pair.length;j++){
					def += pair[j];
					if(j != pair.length - 1)
						def += '-';
				}
				definitions.push(def);
			}
		}
	}
	if(terms.length == 0){
		terms.push("Separate your notes with dashes");
		definitions.push("term - definition");
	}
}
function randomize(){
	var length = terms.length;
	var indexes = [];
	for(var i =0;i < length;i++){
		indexes.push(i);
	}
	var t = [];
	var d = [];
	while(length > 0){
		var randomNum = Math.floor(Math.random() * length);
		t.push(terms[randomNum]);
		d.push(definitions[randomNum]);
		terms.splice(randomNum,1);
		definitions.splice(randomNum,1);
		length--;
	}
	setTerms(t);
	setDefinitions(d);
}
function incrementIndex(){
	index++;
}
function decrementIndex(){
	index--;
}
function addNotesToFlashCards(){
	initCards();
	parseNotes();
	randomize();
	showPair();
}
function showPair(){
	var front = document.getElementById('front');
	var back = document.getElementById('back');
	front.innerHTML = "<p>" + terms[index] + "</p>";
	back.innerHTML = "<p>" + definitions[index] + "</p>";
}
function gotIt(){
	if(index < terms.length - 1){
		incrementIndex();
		showPair();
	}
	else{
		//tell the user that the flashcards are done
		flashcards();
	}
}
function hadTrouble(){
	if(index < terms.length){
		terms.push(terms[index]);
		definitions.push(definitions[index]);
		terms.splice(index,1);
		definitions.splice(index,1);
		showPair();
	}
}