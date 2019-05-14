var GameOver = function(game){};
GameOver.prototype = {
	init: function(peopleHelped, balance) {
		this.peopleHelped = peopleHelped;
		this.balance = balance;
		this.state = 'GameOver';
	},
	create: function() {
		game.add.sprite(0,0, 'background');
		if (this.balance == 0) {
			//give a slightly different message if balance was kept
			message = game.add.text(400, game.world.centerY - 120, "You helped: " + this.peopleHelped + " people!\nAND you kept the balance! NICE\nPress SPACE to restart", style);
			message.anchor.set(0.5);
		} else {
			// give a different message for when balance is not kept
			message = game.add.text(400, game.world.centerY - 120, "You helped: " + this.peopleHelped + " people!\nHowever, you did NOT keep the balance\nPress SPACE to restart", style);
			message.anchor.set(0.5);
		}
	},
	update: function() {
		// be able to get to the menu again
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			message.destroy();
			game.state.start('Menu', true, true);
		}
	}

}