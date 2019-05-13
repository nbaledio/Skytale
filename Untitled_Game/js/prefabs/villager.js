// villager.js
// villager prefab
function villager(nice, family) {
	var sprite;
	var nice = nice;
	var family = family;
	var text;
	var x;
	var display;
	var display2;
	var bubble;
	var interacted;
	var timer;
	var task;
	var taskSprite;
}

villager.prototype = {
	//Arguments: x position, y postion, and spritesheet
	//Spawns player in game at given position and adds physics, gravity, and collision with world bounds
	spawn: function(game,x,y,spritesheet,chat){
		this.sprite = game.add.sprite(x,y,spritesheet);
		this.display = game.add.sprite(x-30,y-10,chat);
		game.physics.arcade.enable(this.sprite);
		//this.sprite.body.gravity.y = 300;
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.immovable = true;
		this.x = x;
		this.interacted = 0;
		this.taskSprite = chat;
		this.timer = 0;
	},
	//Arguments: text the villager will say
	setText: function(text){
		this.text = text;
	},
	// Arguments: sprite for textbubble, style of text
	displayText: function(textBubble, style) {
		
		if (this.interacted == 0) {
			this.bubble = game.add.sprite(this.x, 75, textBubble);
			this.display2 = game.add.text(this.x + 25, 100, "Hey kid ...", style);
			this.display.visible = false;
			this.interacted = 1; 
			this.timer = 0;
		} else if (this.interacted == 1 && this.timer > 60) {
			this.display2.kill();
			this.display2 = game.add.text(this.x + 25, 100, this.text, style);
			this.timer = 0;
			this.interacted = 2;
		} else if (this.interacted == 2 && this.timer > 60) {
			this.display2.kill();
			this.display2 = game.add.text(this.x + 25, 100, 'So...Will you do it? y/n', style);
			this.interacted = 3;
			this.timer = 0;
		} else if (this.interacted == 'yes') {
			this.display2.kill();
			this.display2 = game.add.text(this.x + 25, 100, 'Great, thanks!', style);
			this.timer = 0;
		} else if (this.interacted == 'no') {
			this.display2.kill();
			this.display2 = game.add.text(this.x + 25, 100, 'Alright then...', style);
			//this.interacted = -1;
			this.timer = 0;
		}
	},
	// Arguments: sprite for task
	spawnTask: function(key) {
		// randomly spawn a task
		this.task = game.add.sprite(((Math.random() * game.world.width)), ((Math.random() * game.world.height) - 50), key);
	//	if (this.interacted == 'yes' && this.timer == 60) {
			//this.task = game.add.sprite(700, 350, key);
			game.physics.arcade.enable(this.task);
			this.interacted = 'unfinished';
			this.display2.destroy();
			this.bubble.kill();
	//	}
		//return this.task;
		// depending on morality, change difficulty of task
	},
//	hasTask: function() {
//		return this.interacted;
//	},
	getTask: function() {
		//console.log(this.task);
		return this.task;
	},
	getStatus: function() {
		return this.interacted;
	},
	complete: function() {
		this.interacted = 'done';
		this.timer = 0;
	},
	update: function(player) {
		//Check if player if overlapping villager and display text bubble if true
		this.timer++;
		if(this.interacted != 'done') {
			if (this.interacted == 0 && this.timer%30 == 0) {
				this.display.visible = !this.display.visible;
			}
			//console.log(this.interacted);
			if(Phaser.Rectangle.intersects(player.sprite.getBounds(), this.sprite.getBounds())
				&& this.interacted != 'yes') {
				//console.log(this.timer);

				// make the text blink to signal when a player can move on
				if(this.timer > 60 && this.timer%30 == 0 && this.interacted > 0) {
					this.display2.visible = !this.display2.visible;
				}
				if(this.interacted < 3 && 
					game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
					this.displayText('textbubble', style);
				} else if (this.interacted == 3 &&
					game.input.keyboard.isDown(Phaser.Keyboard.Y)) {
					this.interacted = 'yes';
					this.displayText('textbubble', style);
				} else if (this.interacted == 3 &&
					game.input.keyboard.isDown(Phaser.Keyboard.N)) {
					this.interacted = 'no';
					this.displayText('textbubble', style);
				}
			}
			if (this.interacted == 'no' && this.timer > 60) {
				this.display2.destroy();
				this.bubble.kill();
				this.timer = 0;
				this.interacted = 0;
				this.display.visible = true;
			}

			if (this.interacted == 'yes' && this.timer == 60) {
				this.spawnTask(this.taskSprite);
			}
		} // else {
			//put thank you message somewhere
		//}

	}
}