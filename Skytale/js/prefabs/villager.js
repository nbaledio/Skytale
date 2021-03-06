//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
// villager.js
// villager prefab

var nkey;
var ykey;

function villager() {
	var game;
	var sprite;
	var nice;	// 0 if bad, 1 if nice
	var family;	// the ancestry of the family

	var text;	// the villager's request
	var greeting; // the villager's greeting
	var ask //  the villager's question
	var yes // the villager's accepted dialogue
	var no //the villager's denied dialogue
	var thanks;
	

	var x;	// save the x position of th eplayer
	var signal;	// signal for the player to interact
	
	var textDisplay;	// text display
	var bubble;		// bubble that encompasses text
	var bubblex;
	var bubbley;

	var interacted;	// variable to keep track of interaction
	var timer;	// times the bubble's appearance
	var task;
}

villager.prototype = {
	//Arguments: x position, y postion, spritesheet,
	// morality, family, and chat bubble
	// (soon) task
	//Spawns player in game at given position and adds physics, gravity, and collision with world bounds
	spawn: function(game,x,y,nice,family){
		this.game = game;
		// Create sprite & add physics
		if(nice==1) {
			this.sprite = game.add.sprite(x,y,'villager');
		} else {
			this.sprite = game.add.sprite(x,y,'villager2');
		}
		
		game.physics.arcade.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.immovable = true;
		// make the villager approachable
		this.signal = game.add.sprite(x-30,y-10,'chat');
		// initialize other properties
		this.nice = nice;
		this.family = family;
		//this.x = x;
		this.interacted = 0;
		this.timer = 0;
		//console.log(this.game.state.current);
	},

	//Arguments: text the villager will say
	setText: function(text2,text,text3,text4,text5,text6){
		//this.text = text;
		this.text = textWrap(text);
		this.greeting = textWrap(text2);
		this.ask = textWrap(text3);
		this.yes = textWrap(text4);
		this.no = textWrap(text5);
		this.thanks = textWrap(text6);
	
	},
	// Arguments: sprite for textbubble, style of text
	displayText: function(textBubble, style) {

		// determine where the text bubble will spawn
		if (this.sprite.x > (this.game.camera.x + 450)) {
			this.bubblex = this.game.camera.x + 450;
		} else if (this.sprite.x < (this.game.camera.x+50)) {
			this.bubblex = this.game.camera.x+50;
		} else {
			this.bubblex = this.sprite.x;
		}

		if (this.sprite.y < 150) {
			this.bubbley = 180;
		} else {
			this.bubbley = 75;
		}

		// 0 indicates that this is the first interaction
		if (this.interacted == 0) {
			// creates the first message
			// textDisplay is the text held inside the bubble
			this.bubble = game.add.sprite(this.bubblex, this.bubbley, 'textbubble');
			// this.textDisplay = game.add.text(this.x + 25, 100, "Hey kid ...", style);

			this.textDisplay = game.add.bitmapText(this.bubblex+24, this.bubbley+24, 'myfont', this.greeting, 48);

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
			this.bubble.kill();
			this.bubble = game.add.sprite(this.bubblex, this.bubbley, 'textbubble');
			this.textDisplay = game.add.bitmapText(this.bubblex+24, this.bubbley+24, 'myfont', this.text, 48);

			// reset the timer and move on to the next interaction when the player presses space again
			this.timer = 0;
			this.interacted = 2;
		}
		// 2 inidcates the middle of the interaction
		// the timer must be at least 60 so the player can not skip over the previous portion too fast
		else if (this.interacted == 2 && this.timer > 60) {
			this.textDisplay.kill();
			// this.textDisplay = game.add.text(this.x + 25, 100, 'So...Will you do it? y/n', style);
			//dialogue = textWrap('So...Will you do it?')
			this.bubble.kill();
			this.bubble = game.add.sprite(this.bubblex, this.bubbley, 'textbubble');
			this.textDisplay = game.add.bitmapText(this.bubblex+24, this.bubbley+24, 'myfont', this.ask+'\n   yes\n   no', 48);

			ykey = game.add.sprite(this.bubblex+24, this.bubbley+110, 'ykey');
			nkey = game.add.sprite(this.bubblex+24, this.bubbley+150, 'nkey');
			this.interacted = 3;
			this.timer = 0;
		}
		// 3 indicates a decision to be made, and will respond with 'yes' or 'no'
		else if (this.interacted == 'yes') {
			this.textDisplay.kill();
			this.bubble.kill();
			this.bubble = game.add.sprite(this.bubblex, this.bubbley, 'textbubble');
			ykey.destroy();
			nkey.destroy();
			// this.textDisplay = game.add.text(this.x + 25, 100, 'Great, thanks!', style);

			this.textDisplay = game.add.bitmapText(this.bubblex+24, this.bubbley+24, 'myfont', this.yes, 48);


			this.timer = 0;
		} else if (this.interacted == 'no') {
			this.textDisplay.kill();
			this.bubble.kill();
			this.bubble = game.add.sprite(this.bubblex, this.bubbley, 'textbubble');
			ykey.destroy();
			nkey.destroy();
			// this.textDisplay = game.add.text(this.x + 25, 100, 'Alright then...', style);


			this.textDisplay = game.add.bitmapText(this.bubblex+24, this.bubbley+24, 'myfont', this.no, 48);

			this.timer = 0;
		} else if (this.interacted == 'returned') {
			this.bubble = game.add.sprite(this.bubblex, this.bubbley, 'textbubble');
			this.textDisplay = game.add.bitmapText(this.bubblex+24, this.bubbley+24, 'myfont', this.thanks, 48);
			this.timer = 0;
		}
	},
	complete: function(balance, player) {
		// indicate that the task is complete
		this.interacted = 'returning';
		this.timer = 0;
		//player.interacting = 'none';
		if (this.nice == 1) {
			balance++;
		} else {
			balance--;
		}
		return balance;
	},
	update: function(player,karmaBar,balance) {
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
				} else if (this.interacted == 'returning') {
					this.interacted = 'returned';
					player.interacting = 'none';
					this.displayText('textbubble', style);
				}
			}
			// destroy response after time has passed
			if (this.interacted == 'no' && this.timer == 120) {
				this.textDisplay.destroy();
				this.bubble.kill();
				this.timer = 0;
				this.interacted = 0;
				this.signal.visible = true;
				player.interacting = 'none';
			}
			// destroy response after time has passed
			if (this.interacted == 'yes' && this.timer == 120) {
				// indicate the status of this task
				this.interacted = 'unfinished';
				player.interacting = this.family;
				// stop talking with the player
				this.textDisplay.destroy();
				this.bubble.kill();
			}
			//destroy message after time has passed
			if (this.interacted == 'returned' && this.timer == 120) {
				this.textDisplay.destroy();
				this.bubble.kill();
				if(karmaBar!= null) karmaBar.update(balance);
				this.timer = 0;
				this.interacted = 'done';
				player.interacting = 'none';
				this.signal.visible = false;
			}
			//console.log(this.interacted);
		} else {
			// indicate that there will be no further interaction
			this.signal.visible = false;
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
