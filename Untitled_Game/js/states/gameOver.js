var GameOver = function(game){};
GameOver.prototype = {
	init: function(peopleHelped) {
		this.peopleHelped = peopleHelped;
		this.state = 'GameOver';
	},
	create: function() {
		game.add.sprite(0,0, 'sky');
		message = game.add.text(400, game.world.centerY - 120, "You helped: " + this.peopleHelped + " people!\nPress SPACE to restart", style);
		message.anchor.set(0.5);
	},
	update: function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			message.destroy();
			game.state.start('Menu', true, true);
		}
	}

}