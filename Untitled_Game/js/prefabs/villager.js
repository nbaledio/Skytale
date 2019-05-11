// villager.js
// villager prefab
function villager(nice, family) {
	var sprite;
	var nice = nice;
	var family = family;
	var text;
	var x;
	var display;
}

villager.prototype = {
	//Arguments: x position, y postion, and spritesheet
	//Spawns player in game at given position and adds physics, gravity, and collision with world bounds
	spawn: function(game,x,y,spritesheet){
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.gravity.y = 300;
		this.sprite.body.collideWorldBounds = true;
		this.x = x;
	},
	//Arguments: text the villager will say
	setText: function(text){
		this.text = text;
	},
	// Arguments: sprite for textbubble, style of text
	displayText: function(textBubble, style) {
		game.add.sprite(this.x, 75, textBubble);
		this.display = game.add.text(this.x + 25, 100, this.text, style);
	},
	// Arguments: sprite for task
	spawnTask: function(key) {
		// randomly spawn a task
		game.add.sprite(((Math.random() * 900) + 800), ((Math.random() * game.world.height) - 20), key);
		// depending on morality, change difficulty of task
	}
}