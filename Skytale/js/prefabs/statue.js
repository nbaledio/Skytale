//statue.js
//a prefab for our statue character/feature

function statue() {
	var sprite;
	var interacted;
	var dialogue;
}

statue.prototype = {
	spawn: function(game) {
		this.sprite = game.add.sprite(10, 290, 'statue');
		var interacted = 'start';
		var dialogue = ['Young hero...','stats'];
	},
	setText: function() {

	},
	startLevel: function() {
		
	},
	endLevel: function(numKarma) {
		dialogue[0] = 'Hero...';
		// give the player an overview of how they're doing
		if (numKarma < 5) {
			dialogue[1] = "u need better karma bruh";
			textWrap(dialogue[1]);
		} else {
			dialogue[1] = "the town sure is in good hands";
			textWrap(dialogue[1]);
		}
	}
}
function textWrap(text) {
	var wordCount = 0;
	var result = '';
	var prevI = 0;

	for (i=0; i<text.length; i++) {
		if(text.charAt(i) == ' ') {
			wordCount++;
			if (wordCount % 3 == 0) {
				result += text.substring(prevI, i+1) + "\n";
				prevI = i+1;
			}
		}
	}
	result += text.substring(prevI)
	return result;
}