//test_environment.js:
//A simple test area to check physics, etc.

var music_play = 0;
var test_environment = function(game){};

test_environment.prototype = {
	preload: function(){
		//Preload Game assets
		game.load.image('background', 'assets/img/sky.png');
		game.load.image('grass', 'assets/img/grass.png');
		game.load.image('platform', 'assets/img/platform.png');
		game.load.image('PhantomThievesLogo', 'assets/img/PhantomThievesLogo.png');
		game.load.spritesheet('flame', 'assets/img/flame.png',94, 96);
		game.load.spritesheet('dude', 'assets/img/dude.png',32, 48);
		game.load.audio('bgm', 'assets/audio/have_a_short_rest.ogg');
		
	},
	create: function(){
		
		//Setting the size of the world
		game.world.setBounds(0, 0, 1600, 450);
		
		//Add and play music
		//NOTE: Chrome will not play music until user
		//has interacted with the screen at least once
		bgm = game.add.audio('bgm');
		bgm.loop = true;
		bgm.play();
		
		//Add background
		background = game.add.sprite(0,0,'background');
		
		//Add some decorations
		/*game.add.sprite(1450,20,'PhantomThievesLogo');
		flame = game.add.sprite(1515,50,'flame');
		flame.animations.add('flames',[0,1,2,3,4,5,6,7,8,9],10,true)
		flame.animations.play('flames');*/
		
		
		//Platforms group
		platformgroup = game.add.group();

		//Enable physics for every object in platforms group
		platformgroup.enableBody = true;
		
		//Add some platforms and enable physics
		/*platform1 = game.add.sprite(540,300,'platform');
		platform1.scale.setTo(.5,.5);
		platformgroup.add(platform1);
		platform1.body.immovable = true;
		
		platform2 = game.add.sprite(30,300,'platform');
		platform2.scale.setTo(.5,.5);
		platformgroup.add(platform2);
		platform2.body.immovable = true;
		
		platform3 = game.add.sprite(300,130,'platform');
		platform3.scale.setTo(.5,.5);
		platformgroup.add(platform3);
		platform3.body.immovable = true;
		platform3.body.velocity.x = -100;
		
		platform4 = game.add.sprite(900,170,'platform');
		platform4.scale.setTo(.5,.5);
		platformgroup.add(platform4);
		platform4.body.immovable = true;
		
		platform5 = game.add.sprite(1300,270,'platform');
		platform5.scale.setTo(.5,.5);
		platformgroup.add(platform5);
		platform5.body.immovable = true;*/
		
		grass1 = game.add.sprite(0,0,'grass');
		platformgroup.add(grass1);
		grass1.body.immovable = true;
		grass1.body.setSize(1,1,1,300);
		//game.debug.body(grass1);
		grass2 = game.add.sprite(800,0,'grass');
		
		//platformgroup.add(grass1);
		//grass1.body.immovable = true;
		
		//Add player
		p1 = new player();
		p1.spawn(game,800,400,'dude');
		p1.addAnimations('left', [0, 1, 2, 3], 10, true);
		p1.addAnimations('right', [5, 6, 7, 8], 10, true);
		
		//Focus camera on player
		game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		
		
		//Enable controls
		cursors = game.input.keyboard.createCursorKeys();
		
		
	},
	update: function(){
		//Variables to check if player is on platform or ground
		var onPlatform = game.physics.arcade.collide(p1.sprite, platformgroup);
		var onGround = p1.sprite.body.blocked.down;
		
		//Bounce top platform left and right
		/*if(platform3.x <= 0){
			platform3.body.velocity.x = 100;
		}else if(platform3.x >= 565){
			platform3.body.velocity.x = -100;
		}*/
		
		
		
		//  Reset the players velocity (movement)
		p1.sprite.body.velocity.x = 0;
		//Check if left is input
		if (cursors.left.isDown)
		{
			//  Move to the left
			p1.sprite.body.velocity.x = -150;
			//  Play left animation
			p1.sprite.animations.play('left');
		}
		//Check if right is input
		else if (cursors.right.isDown)
		{
			//  Move to the right
			p1.sprite.body.velocity.x = 150;
			//  Play right animation
			p1.sprite.animations.play('right');
		}
		else
		{
			//  Stand still
			p1.sprite.animations.stop();
			p1.sprite.frame = 4;
		}
		//  Enable player to jump if they are standing on the ground/platform
		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && ( onGround || onPlatform))
		{
			p1.sprite.body.velocity.y = -350;
		}
		
		//  Enables player to fall on platforms
		game.physics.arcade.collide(p1.sprite, platformgroup);
	}
}