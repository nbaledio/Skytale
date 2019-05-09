
var level_1 = function(game){};

level_1.prototype = {
	preload: function(){
		//Preload Game assets
		game.load.image('background', 'assets/img/sky.png');
		game.load.image('grass', 'assets/img/grass.png');
		game.load.image('house', 'assets/img/house.png');
		game.load.image('platform', 'assets/img/platform.png');
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
		
		//Platforms group
		platformgroup = game.add.group();

		//Enable physics for every object in platforms group
		platformgroup.enableBody = true;
		
		//Add platforms (Left to Right)
		platform0 = game.add.sprite(230,250,'platform');
		platform0.scale.setTo(.15,.3);
		platformgroup.add(platform0);
		platform0.body.immovable = true;
		platform0.body.velocity.y = -100;
		
		platform1 = game.add.sprite(350,300,'platform');
		platform1.scale.setTo(.15,.3);
		platformgroup.add(platform1);
		platform1.body.immovable = true;
		
		platform2 = game.add.sprite(440,270,'platform');
		platform2.scale.setTo(.15,.3);
		platformgroup.add(platform2);
		platform2.body.immovable = true;
		
		platform3 = game.add.sprite(540,220,'platform');
		platform3.scale.setTo(.27,.3);
		platformgroup.add(platform3);
		platform3.body.immovable = true;
		
		platform4 = game.add.sprite(690,180,'platform');
		platform4.scale.setTo(.6,.3);
		platformgroup.add(platform4);
		platform4.body.immovable = true;
		
		platform5 = game.add.sprite(5,138,'platform');
		platform5.scale.setTo(.35,.3);
		platformgroup.add(platform5);
		platform5.body.immovable = true;
		
		platform6 = game.add.sprite(1400,168,'platform');
		platform6.scale.setTo(.4,.3);
		platformgroup.add(platform6);
		platform6.body.immovable = true;
		
		//Add grass to the bottom,enable their physics, and resize their hitboxes
		grass1 = game.add.sprite(0,0,'grass');
		platformgroup.add(grass1);
		grass1.body.immovable = true;
		grass1.body.setSize(800,50,0,400);
		
		grass2 = game.add.sprite(800,0,'grass');
		platformgroup.add(grass2);
		grass2.body.immovable = true;
		grass2.body.setSize(800,50,0,400);
		
		//Add houses
		house1 = game.add.sprite(40,270,'house');
		house1.scale.setTo(.8,.8);
		house2 = game.add.sprite(530,270,'house');
		house2.scale.setTo(.8,.8);
		house3 = game.add.sprite(760,52,'house');
		house3.scale.setTo(.8,.8);
		house4 = game.add.sprite(10,10,'house');
		house4.scale.setTo(.8,.8);
		house5 = game.add.sprite(1400,270,'house');
		house5.scale.setTo(.8,.8);
		house5 = game.add.sprite(1450,40,'house');
		house5.scale.setTo(.8,.8);
		
		//Add player
		p1 = new player();
		p1.spawn(game,110,325,'dude');
		p1.sprite.scale.setTo(.9,.9);
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
			p1.sprite.body.velocity.y = -460;
		}
		
		//  Enables player to fall on platforms
		game.physics.arcade.collide(p1.sprite, platformgroup);
		
		//Bounce platform0 up and down
		if(platform0.y > 250){
			platform0.body.velocity.y = -100;
		}
		if(platform0.y < 100){
			platform0.body.velocity.y = 100;
		}
	}
}