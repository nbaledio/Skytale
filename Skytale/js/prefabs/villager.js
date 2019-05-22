//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
// villager.js
// villager prefab



function villager() {
	var sprite;
	var nice;	// 0 if bad, 1 if nice
	var family;	// the ancestry of the family
	var text;	// the villager's request
	var x;	// save the x position of th eplayer
	var display;	// signal for the player to interact
	var display2;	// text display
	var bubble;		// bubble that encompasses text
	var interacted;	// variable to keep track of interaction
	var timer;	// times the bubble's appearance
	var task;	// a collectible object
	var taskSprite;	// the sprite for the collectible object
}

villager.prototype = {
	//Arguments: x position, y postion, spritesheet,
	// morality, family, and chat bubble
	// (soon) task
	//Spawns player in game at given position and adds physics, gravity, and collision with world bounds
	spawn: function(game,x,y,spritesheet,nice,family,chat){
		this.sprite = game.add.sprite(x,y,spritesheet);
		// make the villager approachable
		this.display = game.add.sprite(x-30,y-10,chat);
		game.physics.arcade.enable(this.sprite);
		// initialize other properties
		this.nice = nice;
		this.family = family;
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.immovable = true;
		this.x = x;
		this.interacted = 0;
		//this.task = null;
		this.timer = 0;
	},
	//Arguments: text the villager will say
	setText: function(text){
		this.text = text;
	},
	// Arguments: sprite for textbubble, style of text
	displayText: function(textBubble, style) {

		// 0 indicates that this is the first interaction
		if (this.interacted == 0) {
			// creates the first message
			this.bubble = game.add.sprite(this.x, 75, textBubble);
			// display2 is the text held inside the bubble
			// this.display2 = game.add.text(this.x + 25, 100, "Hey kid ...", style);
			this.display2 = game.add.bitmapText(this.x+24, 100, 'myfont', "Hey kid...", 48);
			// removes the original signal for interaction
			this.display.visible = false;
			// move on to the next text bubble when the player hits space again
			this.interacted = 1;
			// reset the timer for the text
			this.timer = 0;
		}
		// 1 indicates that this is in the middle of the interaction
		// the timer must be at least 60 so the player can not skip over the previous portion too fast
		else if (this.interacted == 1 && this.timer > 60) {
			// remove the old text
			this.display2.kill();
			// create the new text
			// this.display2 = game.add.text(this.x + 25, 100, this.text, style);
			this.display2 = game.add.bitmapText(this.x+24, 100, 'myfont', this.text, 48);
			// reset the timer and move on to the next interaction when the player presses space again
			this.timer = 0;
			this.interacted = 2;
		}
		// 2 inidcates the middle of the interaction
		// the timer must be at least 60 so the player can not skip over the previous portion too fast
		else if (this.interacted == 2 && this.timer > 60) {
			this.display2.kill();
			// this.display2 = game.add.text(this.x + 25, 100, 'So...Will you do it? y/n', style);
			this.display2 = game.add.bitmapText(this.x+24, 100, 'myfont', 'So...Will you do it? y/n', 48);
			this.interacted = 3;
			this.timer = 0;
		}
		// 3 indicates a decision to be made, and will respond with 'yes' or 'no'
		else if (this.interacted == 'yes') {
			this.display2.kill();
			// this.display2 = game.add.text(this.x + 25, 100, 'Great, thanks!', style);
			this.display2 = game.add.bitmapText(this.x+24, 100, 'myfont', 'Great, thanks!', 48);

			this.timer = 0;
		} else if (this.interacted == 'no') {
			this.display2.kill();
			// this.display2 = game.add.text(this.x + 25, 100, 'Alright then...', style);

			this.display2 = game.add.bitmapText(this.x+24, 100, 'myfont', 'Alright then...', 48);
			this.timer = 0;
		}
	},
	// // Arguments: sprite for task
	// spawnTask: function(key) {
	// 	// spawn a task sprite in a random position
	// 	this.task = game.add.sprite(((Math.random() * game.world.width)), ((Math.random() * game.world.height) - 50), key);
	// 	//this.task = game.add.sprite(600, 300, key);
	// 	game.physics.arcade.enable(this.task);

	// },
	// getTask: function() {
	// 	// I didn't know whether this was necessary I just did it :/
	// 	return this.task;
	// },
	// getStatus: function() {
	// 	return this.interacted;
	// },
	complete: function(balance) {
		// indicate that the task is complete
		this.interacted = 'done';
		this.timer = 0;
		if (this.nice == 1) {
			balance++;
		} else {
			balance--;
		}
		return balance;
	},
	update: function(player) {
		// set up a timer
		this.timer++;
		// make sure the player hasn't already helped this person
		if(this.interacted != 'done') {

			// give the player a clue that this villager is interactable by blinking
			if (this.interacted == 0 && this.timer%30 == 0) {
				this.display.visible = !this.display.visible;
			}
			//Check if player if overlapping villager
			if(Phaser.Rectangle.intersects(player.sprite.getBounds(), this.sprite.getBounds())
				&& this.interacted != 'yes') {

				// make the text blink to signal when a player can move on from a message
				if(this.timer > 60 && this.timer%30 == 0 && this.interacted > 0) {
					this.display2.visible = !this.display2.visible;
				}

				// the player is given information about the task
				// must press space to access the next message
				if(this.interacted < 3 && 
					game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
					this.displayText('textbubble', style);
				}
				// if the player responds yes
				// interacted must equal 3 so that the spacebar isn't an option for this section
				else if (this.interacted == 3 &&
					game.input.keyboard.isDown(Phaser.Keyboard.Y)) {
					this.interacted = 'yes';
					this.displayText('textbubble', style);
				}
				// if the player responds no
				else if (this.interacted == 3 &&
					game.input.keyboard.isDown(Phaser.Keyboard.N)) {
					this.interacted = 'no';
					this.displayText('textbubble', style);
				}
			}
			// destroy response after time has passed
			if (this.interacted == 'no' && this.timer > 60) {
				this.display2.destroy();
				this.bubble.kill();
				this.timer = 0;
				this.interacted = 0;
				this.display.visible = true;
			}
			// destroy response after time has passed
			if (this.interacted == 'yes' && this.timer == 60) {
				// indicate the status of this task
				this.interacted = 'unfinished';
				// stop talking with the player
				this.display2.destroy();
				this.bubble.kill();
			}
		}

	}
}
