//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//player.js:
//Player prefab. Has basic functions to is such as spawning, scaling, etc.

function player(){
	var sprite;
	var interacting;
}

player.prototype = {
	//Arguments: x position, y postion, and spritesheet
	//Spawns player in game at given position and adds physics, gravity, and collision with world bounds
	spawn: function(game,x,y,spritesheet){
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.gravity.y = 900;
		this.sprite.body.collideWorldBounds = false;

		this.interacting = 'none';
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
	},
	//Arguments:boolean for being on the ground,boolean for being on a platform
	//Enables controls/physics of player
	controls: function(onGround,onPlatform){
		//  Reset the players velocity (movement)
		this.sprite.body.velocity.x = 0;
		
		//Push player downwards if on platform for more consistent jumps
		if(onGround || onPlatform){
			this.sprite.y +=1.5;
		}
		
		// Keeps player in horizontal bounds
		if(p1.sprite.x <= 0){
			this.sprite.x += 2.5;
		}else if(p1.sprite.x > 1570){
			this.sprite.x -= 2.5;
		}
		
		//Check if left is input
		if (cursors.left.isDown){
			//  Move to the left
			this.sprite.body.velocity.x = -150;
			//  Play left animation
			this.sprite.animations.play('left',10);

		}
		//Check if right is input
		else if (cursors.right.isDown){
			//  Move to the right
			this.sprite.body.velocity.x = 150;
			//  Play right animation
			this.sprite.animations.play('right',10);
		}else{
			//  Stand still
			this.sprite.animations.stop();
			this.sprite.frame = 6;
		}
		
		//  Enable player to jump if they are standing on the ground/platform
		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)  && ( onGround || onPlatform))
		{
			this.sprite.body.velocity.y = -500;
		}
		
		//Allow player to pass through platforms from the bottom/drop down from platforms
		if((this.sprite.body.velocity.y < -50 && !( onGround || onPlatform)) || (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.sprite.y < 320)){
			this.sprite.body.setSize(0,0,0,1000);
		}else{

			this.sprite.body.setSize(164/5, 129/2,0,0);
		}
		
	},
	//Arguments:boolean for being on the ground,boolean for being on a platform
	//Enables controls/physics of player
	inverted_controls: function(onGround,onPlatform){
		//  Reset the players velocity (movement)
		this.sprite.body.velocity.x = 0;
		
		//Push player downwards if on platform for more consistent jumps
		if(onGround || onPlatform){
			this.sprite.y +=1.5;
		}
		
		// Keeps player in horizontal bounds
		if(this.sprite.x <= 0){
			this.sprite.x += 2.5;
		}else if(p1.sprite.x > 770){
			this.sprite.x -= 2.5;
		}
		
		//Check if left is input
		if (cursors.left.isDown){
			//  Move to the right
			this.sprite.body.velocity.x = 150;
			//  Play right animation
			this.sprite.animations.play('right',10);

		}
		//Check if right is input
		else if (cursors.right.isDown){
			//  Move to the left
			this.sprite.body.velocity.x = -150;
			//  Play left animation
			this.sprite.animations.play('left',10);
		}else{
			//  Stand still
			this.sprite.animations.stop();
			this.sprite.frame = 6;
		}
		
		//  Enable player to jump if they are standing on the ground/platform
		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)  && ( onGround || onPlatform))
		{
			this.sprite.body.velocity.y = -500;
		}
		
		//Allow player to pass through platforms from the bottom/drop down from platforms
		if((this.sprite.body.velocity.y < -50 && !( onGround || onPlatform)) || (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.sprite.y < 690)){
			this.sprite.body.setSize(0,0,0,1000);
		}else{

			this.sprite.body.setSize(164/5, 129/2,0,0);
		}
	},
	fast_controls: function(onGround,onPlatform){
		//  Reset the players velocity (movement)
		this.sprite.body.velocity.x = 0;
		
		//Push player downwards if on platform for more consistent jumps
		if(onGround || onPlatform){
			this.sprite.y +=1.5;
		}
		
		// Keeps player in horizontal bounds
		if(p1.sprite.x <= 0){
			this.sprite.x += 20;
		}else if(p1.sprite.x > 770){
			this.sprite.x -= 20;
		}
		
		//Check if left is input
		if (cursors.left.isDown){
			//  Move to the left
			this.sprite.body.velocity.x = -800;
			//  Play left animation
			this.sprite.animations.play('left',20);

		}
		//Check if right is input
		else if (cursors.right.isDown){
			//  Move to the right
			this.sprite.body.velocity.x = 800;
			//  Play right animation
			this.sprite.animations.play('right',20);
		}else{
			//  Stand still
			this.sprite.animations.stop();
			this.sprite.frame = 6;
		}
		
		//  Enable player to jump if they are standing on the ground/platform
		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)  && ( onGround || onPlatform))
		{
			this.sprite.body.velocity.y = -500;
		}
		
		//Allow player to pass through platforms from the bottom/drop down from platforms
		if((this.sprite.body.velocity.y < -50 && !( onGround || onPlatform)) || (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.sprite.y < 710)){
			this.sprite.body.setSize(0,0,0,1000);
		}else{

			this.sprite.body.setSize(164/5, 129/2,0,0);
		}
		
	},
	short_hop_controls: function(onGround,onPlatform){
		//  Reset the players velocity (movement)
		this.sprite.body.velocity.x = 0;
		
		//Push player downwards if on platform for more consistent jumps
		if(onGround || onPlatform){
			this.sprite.y +=1.5;
		}
		
		// Keeps player in horizontal bounds
		if(p1.sprite.x <= 0){
			this.sprite.x += 2.5;
		}else if(p1.sprite.x > 770){
			this.sprite.x -= 2.5;
		}
		
		//Check if left is input
		if (cursors.left.isDown){
			//  Move to the left
			this.sprite.body.velocity.x = -150;
			//  Play left animation
			this.sprite.animations.play('left',20);

		}
		//Check if right is input
		else if (cursors.right.isDown){
			//  Move to the right
			this.sprite.body.velocity.x = 150;
			//  Play right animation
			this.sprite.animations.play('right',20);
		}else{
			//  Stand still
			this.sprite.animations.stop();
			this.sprite.frame = 6;
		}
		
		//  Enable player to jump if they are standing on the ground/platform
		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)  && ( onGround || onPlatform))
		{
			this.sprite.body.velocity.y = -350;
		}
		
		//Allow player to pass through platforms from the bottom/drop down from platforms
		if((this.sprite.body.velocity.y < -50 && !( onGround || onPlatform)) || (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.sprite.y < 740)){
			this.sprite.body.setSize(0,0,0,1000);
		}else{

			this.sprite.body.setSize(164/5, 129/2,0,0);
		}
		
	}
}

