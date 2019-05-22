//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//menu.js
//menu screen for the game (also temporarily providing instructions)

var Menu = function(game) {};
var message;


Menu.prototype = {
	preload: function() {
		//Preload Game assets
		game.load.image('background', 'assets/img/sky.png');
		game.load.image('ground', 'assets/img/ground.png');
		game.load.image('house', 'assets/img/house.png');
		game.load.image('villager', 'assets/img/villager.png');
		game.load.image('chat', 'assets/img/chat.png');
		game.load.image('textbubble', 'assets/img/textbubble.png');
		game.load.image('platform', 'assets/img/rockplatform.png');
		game.load.spritesheet('dude', 'assets/img/playerone.png',128/4, 165/3);
		game.load.audio('bgm', 'assets/audio/have_a_short_rest.ogg');
		//Figure out a better font to use later
		//game.load.bitmapFont('myfont', 'assets/myfont/font.png', 'assets/myfont/font.fnt');
	},
	create: function() {
		//add a background for continuity
		game.add.sprite(0,0, 'background');

		//Font testing to implement later
		//message = game.add.bitmapText(game.world.centerX, game.world.centerY - 120, "Press SPACE to start", style);
		
		//Give the player general instructions
		message = game.add.text(400, game.world.centerY - 120, "Press SPACE to start\nPress Q to quit", style);
		message.anchor.set(0.5);


		// Control tutorial
		instruction = game.add.text(400, game.world.centerY - 40, "Use arrow keys to move\nPress SPACEBAR to interact", style);
		instruction.anchor.set(0.5);

	},
	update: function() {
		// when the player hits space, begin the game
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//do not clear cache, but clear the stage
			game.state.start('level_1', true, false);
		}
	}
}