//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//menu.js
//menu screen for the game (also temporarily providing instructions)

var Menu = function(game) {};
var message;
var selection = 'play';


Menu.prototype = {
	preload: function() {
		//Preload Game assets
		game.load.image('background', 'assets/img/sky.png');
		game.load.image('ground', 'assets/img/ground.png');
		game.load.image('house', 'assets/img/house.png');
		game.load.image('villager', 'assets/img/villager.png');
		game.load.image('villager2', 'assets/img/villager2.png');
		game.load.image('chat', 'assets/img/chat.png');
		game.load.image('textbubble', 'assets/img/textbubble.png');
		game.load.image('platform', 'assets/img/rockplatform.png');
		game.load.image('statue', 'assets/img/statue.png');
		game.load.image('goat', 'assets/img/goat.png');
		game.load.image('totem', 'assets/img/totem.png');
		game.load.image('flag', 'assets/img/flag.png');
		game.load.image('hat', 'assets/img/hat.png');
		game.load.image('gem', 'assets/img/gem.png');
		game.load.spritesheet('dude', 'assets/img/player2.png',192/3, 192/3);

		//music cred
		// "Dreamy Flashback" Kevin MacLeod (incompetech.com)
		// Licensed under Creative Commons: By Attribution 3.0 License
		// http://creativecommons.org/licenses/by/3.0/
		game.load.audio('bgm', 'assets/audio/dreamy_flashback.mp3');
		// Additional sound effects from https://www.zapsplat.com


		//Figure out a better font to use later
		//game.load.bitmapFont('myfont', 'assets/myfont/font.png', 'assets/myfont/font.fnt');
		game.load.bitmapFont('myfont', 'assets/font/font.png', 'assets/font/font.fnt');

		//menu testing
		game.load.image('title', 'assets/img/title.png');
		game.load.spritesheet('playButton', 'assets/img/playButton.png',178, 71);
		game.load.spritesheet('tutorialButton', 'assets/img/tutorialButton.png',178, 71);
		game.load.image('arrow', 'assets/img/arrow.png');
		game.load.image('spacebar', 'assets/img/spacebar.png');
		game.load.image('ykey', 'assets/img/ykey.png');
		game.load.image('nkey', 'assets/img/nkey.png');

		// karma assets
		game.load.image('container', 'assets/img/meterbg.png');
		game.load.image('karma', 'assets/img/karmabox.png');

	},
	create: function() {
		//add a background for continuity
		//game.add.sprite(0,0, 'background');
		game.add.sprite(0,0, 'title');

		message = game.add.bitmapText(width/2, 300, 'myfont', " Press              to play", 48);
		message.anchor.set(0.5);
		message = game.add.bitmapText((width/2)+100, 355, 'myfont', "to start tutorial", 48);
		//message.anchor.set(0.5);
		// bar = game.add.sprite((width/2)-15, 235, 'spacebar');
		// bar.anchor.set(0.5);

		//visual menu
		playButton = game.add.sprite(width/2, 300, 'playButton');
		playButton.anchor.set(0.5);
		// playButton.animations.add('blink',[0,1],3,true);

		tutorialButton = game.add.sprite(width/2, 380, 'tutorialButton');
		tutorialButton.anchor.set(0.5);
		// tutorialButton.animations.add('blink',[0,1],3,true);

	},
	update: function() {
		// if(selection == 'play') {
		// 	playButton.animations.play('blink');
		// 	tutorialButton.frame = 0;
		// 	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		// 		//do not clear cache, but clear the stage
		// 		game.state.start('level_1', true, false);
		// 	}
		// } else if (selection == 'tutorial') {
		// 	tutorialButton.animations.play('blink');
		// 	playButton.frame = 0;
		// 	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
		// 		//do not clear cache, but clear the stage
		// 		game.state.start('tutorial', true, false);
		// 	}
		// }
		// if(game.input.keyboard.downDuration(Phaser.Keyboard.DOWN)) {
		// 	selection = 'tutorial';
		// }
		// if(game.input.keyboard.downDuration(Phaser.Keyboard.UP)) {
		// 	selection = 'play';
		// }
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('level_1', true, false);
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT)) {
			game.state.start('tutorial', true, false);
		}
	}
}