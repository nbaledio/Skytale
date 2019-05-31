//statue.js
//a prefab for our statue character/feature

function statue() {
	var sprite;
}

statue.prototype = {
	spawn: function(game) {
		this.sprite = game.add.sprite(10, 290, 'statue');
	},
	startLevel: function() {
		
	},
	endLevel: function() {

	}
}