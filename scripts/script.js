var btn = document.getElementById("btn");
var notes = [];

btn.onclick = function () {
	var newDiv = document.createElement("div");
	newDiv.classList.add("newDiv");
	newDiv.style.cssText = "width: 150px; height: 200px; background: gold; overflow: hidden; word-break: break-all; padding: 5px; transform: rotate(" + getRandomInt(-7, 7) + "deg); position: absolute;";
	document.body.appendChild(newDiv);
	newDiv.textContent = "DBL click for block";

	getNewTextArea(newDiv); // Work with "textarea"	
	transferItem(newDiv); // Work with transfer elem
}

// angle of notes

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// new textarea and work with it

function getNewTextArea(elemWithTextArea) {
	var textArea = document.createElement("textarea");
	elemWithTextArea.appendChild(textArea);
	textArea.setAttribute("rows", "10");
	textArea.setAttribute("placeholder", "Press Inter after  completing");
	textArea.style.cssText = "width: 140px; display: block; margin: auto; display: none;";
	
	var span = document.createElement("span");
    span.setAttribute("class", "remove");
    elemWithTextArea.appendChild(span);
    span.onclick = function(){
    	document.body.removeChild(elemWithTextArea);
    }

	textArea.onkeypress = function (e) {
		if(e.keyCode == 13) {
			var save = textArea.value;
			textArea.style.display = "none";
			elemWithTextArea.textContent = save;

			notes.push(save);                       // Add notes
		}
	}
	elemWithTextArea.ondblclick = function () {
		textArea.style.display = "block";
	}
}

// transfer elements (div)

function transferItem(elemTransfer) {
	var deltaX, deltaY;

	function trackMouse(e){
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		elemTransfer.style.top = (mouseY - deltaY) + "px";
		elemTransfer.style.left = (mouseX - deltaX) + "px";
	}

	elemTransfer.onmousedown = function(e){
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var offLeft = elemTransfer.offsetLeft;
		var offTop = elemTransfer.offsetTop;
		deltaX = mouseX - offLeft;
		deltaY = mouseY - offTop;
		window.addEventListener("mousemove", trackMouse);
	}

	elemTransfer.onmouseup = function(){
		window.removeEventListener("mousemove", trackMouse);
	}
}



