//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
// villager.js
// villager prefab



function villager() {
	var sprite;
	var nice;	// 0 if bad, 1 if nice
	var family;	// the ancestry of the family
	var text;	// the villager's request
	var x;	// save the x position of th eplayer
	var signal;	// signal for the player to interact
	var textDisplay;	// text display
	var bubble;		// bubble that encompasses text
	var interacted;	// variable to keep track of interaction
	var timer;	// times the bubble's appearance
	var task;
}

villager.prototype = {
	//Arguments: x position, y postion, spritesheet,
	// morality, family, and chat bubble
	// (soon) task
	//Spawns player in game at given position and adds physics, gravity, and collision with world bounds
	spawn: function(game,x,y,spritesheet,nice,family){
		// Create sprite & add physics
		this.sprite = game.add.sprite(x,y,spritesheet);
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.immovable = true;
		// make the villager approachable
		this.signal = game.add.sprite(x-30,y-10,'chat');
		// initialize other properties
		this.nice = nice;
		this.family = family;
		this.x = x;
		this.interacted = 0;
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
			// textDisplay is the text held inside the bubble
			// this.textDisplay = game.add.text(this.x + 25, 100, "Hey kid ...", style);
			this.textDisplay = game.add.bitmapText(this.x+24, 100, 'myfont', "Hey kid...", 48);
			// removes the original signal for interaction
			this.signal.visible = false;
			// move on to the next text bubble when the player hits space again
			this.interacted = 1;
			// reset the timer for the text
			this.timer = 0;
		}
		// 1 indicates that this is in the middle of the interaction
		// the timer must be at least 60 so the player can not skip over the previous portion too fast
		else if (this.interacted == 1 && this.timer > 60) {
			// remove the old text
			this.textDisplay.kill();
			// create the new text
			// this.textDisplay = game.add.text(this.x + 25, 100, this.text, style);
			this.textDisplay = game.add.bitmapText(this.x+24, 100, 'myfont', this.text, 48);
			// reset the timer and move on to the next interaction when the player presses space again
			this.timer = 0;
			this.interacted = 2;
		}
		// 2 inidcates the middle of the interaction
		// the timer must be at least 60 so the player can not skip over the previous portion too fast
		else if (this.interacted == 2 && this.timer > 60) {
			this.textDisplay.kill();
			// this.textDisplay = game.add.text(this.x + 25, 100, 'So...Will you do it? y/n', style);
			this.textDisplay = game.add.bitmapText(this.x+24, 100, 'myfont', 'So...Will you do it? y/n', 48);
			this.interacted = 3;
			this.timer = 0;
		}
		// 3 indicates a decision to be made, and will respond with 'yes' or 'no'
		else if (this.interacted == 'yes') {
			this.textDisplay.kill();
			// this.textDisplay = game.add.text(this.x + 25, 100, 'Great, thanks!', style);
			this.textDisplay = game.add.bitmapText(this.x+24, 100, 'myfont', 'Great, thanks!', 48);

			this.timer = 0;
		} else if (this.interacted == 'no') {
			this.textDisplay.kill();
			// this.textDisplay = game.add.text(this.x + 25, 100, 'Alright then...', style);

			this.textDisplay = game.add.bitmapText(this.x+24, 100, 'myfont', 'Alright then...', 48);
			this.timer = 0;
		}
	},
	complete: function(balance, player) {
		// indicate that the task is complete
		this.interacted = 'done';
		this.timer = 0;
		player.interacting = 'none';
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
		if(this.interacted != 'done' && 
			(player.interacting == 'none' || player.interacting == this.family)) {
			// give the player a clue that this villager is interactable by blinking
			if (this.interacted == 0 && this.timer%30 == 0) {
				this.signal.visible = !this.signal.visible;
			}
			//Check if player if overlapping villager
			if(Phaser.Rectangle.intersects(player.sprite.getBounds(), this.sprite.getBounds())
				&& this.interacted != 'yes') {

				// make the text blink to signal when a player can move on from a message
				if(this.timer > 60 && this.timer%30 == 0 && this.interacted > 0) {
					this.textDisplay.visible = !this.textDisplay.visible;
				}

				// the player is given information about the task
				// must press space to access the next message
				if(this.interacted < 3 && 
					game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
					this.displayText('textbubble', style);
					player.interacting = this.family;
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
				this.textDisplay.destroy();
				this.bubble.kill();
				this.timer = 0;
				this.interacted = 0;
				this.signal.visible = true;
				player.interacting = 'none';
			}
			// destroy response after time has passed
			if (this.interacted == 'yes' && this.timer == 60) {
				// indicate the status of this task
				this.interacted = 'unfinished';
				player.interacting = this.family;
				// stop talking with the player
				this.textDisplay.destroy();
				this.bubble.kill();
			}
		} else {
			this.signal.visible = false;
		}

	}
}
