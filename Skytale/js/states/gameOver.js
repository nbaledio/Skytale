//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
var GameOver = function(game){};
GameOver.prototype = {
	init: function(peopleHelped, numKarma) {
		this.peopleHelped = peopleHelped;
		this.numKarma = 5;
		this.state = 'GameOver';
		timer = 0;
	},
	create: function() {
		game.add.sprite(0,0,'ending');
		bubble = game.add.sprite(width/2, height/2, 'bigtextbub');
		bubble.anchor.set(0.5);
		bubble.width = 0;
		bubble.height = 0;

		dialogue = [
		"You helped "+this.peopleHelped+" people,\nand for that I am thankful.",
		(this.numKarma == 5)?("You also maintained the balance\nand ensured the prosperity of\nmy people."):("However, your efforts were\nin vain. This town suffered\nbecause you could not\nmaintain the balance."),
		(this.numKarma == 5)?("I am forever in your debt.\nMay your next lives be just as\nprosperous as these have been."):("I must quickly find a new hero\nand undo the chaos you have\ncaused. Leave my sight immeditely."),
		];
		credits = game.add.image(0, height, 'credits');
	},
	update: function() {
		timer++;
		if (timer < 26) {
			bubble.width+=24;
			bubble.height+=8.2;
		}
		if (timer == 26) {
			text = game.add.bitmapText(width/2, height/2,'myfont', dialogue[0], 50);
			text.anchor.set(0.5);
		}
		if (timer == 160) {
			text.destroy();
			text = game.add.bitmapText(width/2, height/2,'myfont', dialogue[1], 50);
			text.anchor.set(0.5);
		}
		if (timer == 340) {
			text.destroy();
			text = game.add.bitmapText(width/2, height/2,'myfont', dialogue[2], 50);
			text.anchor.set(0.5);
		}
		if (timer == 600) {
			bubble.destroy();
			text.destroy();
			//text.anchor.set(0.5);
		}
		if (timer > 600 && timer < 720) {
			credits.y -= 3.75;
		}
		// be able to get to the menu again
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			message.destroy();
			game.state.start('Menu', true, true);
		}
	}

}