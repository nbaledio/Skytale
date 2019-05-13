var Menu = function(game) {
	var message;
}



Menu.prototype = {
	preload: function() {
		console.log('Menu: preload');
		game.load.image('sky', 'assets/img/sky.png');
		//game.load.bitmapFont('myfont', 'assets/myfont/font.png', 'assets/myfont/font.fnt');
	},
	create: function() {
		game.add.sprite(0,0, 'sky');
		//var style = { font: '24px Comic Sans MS', fill: '#FFF', align: "center" };
		//var style = { font: 'myfont', fill: '#FFF', align: "center" };
		message = game.add.text(400, game.world.centerY - 120, "Press SPACE to start", style);
		//message = game.add.bitmapText(game.world.centerX, game.world.centerY - 120, "Press SPACE to start", style);
		message.anchor.set(0.5);
	},
	update: function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			message.destroy();
			game.state.start('level_1', true, false);
		}
	}
}