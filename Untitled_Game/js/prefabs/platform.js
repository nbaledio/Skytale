//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//platform.js
//Spawns a platform (used to save time in writing it in main)
//Note: If you scale the image, be sure to change the hitbox as well.
//This can be added in a helper function if needed

function platform(game,x,y,Sprite,group){
	//Arguments: game,x position, y postion, sprite, xScale, yScale, and group to be added to
	//Spawns platform in game at given position, scale, and adds to group
	var sprite; 
	this.sprite = game.add.sprite(x,y,Sprite);
	group.add(this.sprite);
	this.sprite.enableBody = true;
	this.sprite.body.immovable = true;
	this.sprite.body.setSize(88,5,0,32);
}

platform.prototype = {
	//Add any extra helper functions here
}