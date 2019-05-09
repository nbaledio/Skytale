// villager.js
// villager prefab
function villager(nice, family) {
	var sprite;
	var nice = nice;
	var family = family;
	var text;
}

player.prototype = {
	//Arguments: x position, y postion, and spritesheet
	//Spawns player in game at given position and adds physics, gravity, and collision with world bounds
	spawn: function(game,x,y,spritesheet){
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.gravity.y = 300;
		this.sprite.body.collideWorldBounds = true;
	},
	//Arguments: text the villager will say
	setDialogue: function(text){
		this.text = text;
	}
}