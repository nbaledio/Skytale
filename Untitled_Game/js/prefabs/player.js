//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//player.js:
//Player prefab. Has basic functions to is such as spawning, scaling, etc.

function player(){
	var sprite;
}

player.prototype = {
	//Arguments: x position, y postion, and spritesheet
	//Spawns player in game at given position and adds physics, gravity, and collision with world bounds
	spawn: function(game,x,y,spritesheet){
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.gravity.y = 900;
		this.sprite.body.collideWorldBounds = true;
	},
	//Arguments: x scaling factor, y scaling factor
	//Scales sprite image
	scale: function(xScale, yScale){
		this.sprite.scale.setTo(xScale, yScale);
	},
	//Arguments: name of animation, array of frames used in animation, speed of animation, and bool value for looping
	//Adds animations to sprite
	addAnimations: function(name,frameArray,speed,loop){
		this.sprite.animations.add(name,frameArray,speed,loop);
	}
}
