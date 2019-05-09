var Menu = function(game) {};

var message;
var style = { font: '24px Comic Sans MS', fill: '#FFF', align: "center" };

Menu.prototype = {
	preload: function() {
		console.log('Menu: preload');
		game.load.image('sky', 'assets/img/sky.png');
	},
	create: function() {
		game.add.sprite(0,0, 'sky');
		message = game.add.text(game.world.centerX, game.world.centerY - 120, "Press SPACE to start", style);
		message.anchor.set(0.5);
	},
	update: function() {
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			message.destroy();
			game.state.start('test_environment');
		}
	}
}