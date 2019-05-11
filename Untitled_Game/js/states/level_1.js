//level_1.js
//First level of the game.

var level_1 = function(game){};
var theta = 1;

level_1.prototype = {
	preload: function(){
		//Preload Game assets
		game.load.image('background', 'assets/img/sky.png');
		game.load.image('ground', 'assets/img/ground.png');
		game.load.image('house', 'assets/img/house.png');
		game.load.image('villager', 'assets/img/villager.png');
		game.load.image('chat', 'assets/img/chat.png');
		game.load.image('platform', 'assets/img/rockplatform.png');
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
		
		//Add platforms (Left to right) (second/third/etc. just means multiple
		//platforms next to each other to make one big platform since scaling 
		//makes it look weird.)
		platform5 = new platform(game,5,107,'platform',platformgroup);
		platform5_second = new platform(game,69,107,'platform',platformgroup);
		platform0 = new platform(game,230,250,'platform',platformgroup);
		platform0.sprite.body.velocity.y = -65;
		platform1 = new platform(game,350,265,'platform',platformgroup);
		platform2 = new platform(game,440,230,'platform',platformgroup);
		platform3 = new platform(game,570,180,'platform',platformgroup);
		platform4 = new platform(game,715,148,'platform',platformgroup);
		platform4_second = new platform(game,779,148,'platform',platformgroup);
		platform4_third = new platform(game,843,148,'platform',platformgroup);
		platform4_fourth = new platform(game,907,148,'platform',platformgroup);
		platform7 = new platform(game,1175,150,'platform',platformgroup);
		platform7_second = new platform(game,1239,150,'platform',platformgroup);
		platform6 = new platform(game,1435,136,'platform',platformgroup);
		platform6_second = new platform(game,1499,136,'platform',platformgroup);

		
		//Add ground to the bottom,enable their physics, and resize their hitboxes
		ground1 = game.add.sprite(0,0,'ground');
		platformgroup.add(ground1);
		ground1.body.immovable = true;
		ground1.body.setSize(800,50,0,400);
		
		ground2 = game.add.sprite(800,0,'ground');
		platformgroup.add(ground2);
		ground2.body.immovable = true;
		ground2.body.setSize(800,50,0,400);
		
		//Add houses (Prefab?)
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
		house6 = game.add.sprite(1450,40,'house');
		house6.scale.setTo(.8,.8);
		house7 = game.add.sprite(875,270,'house');
		house7.scale.setTo(.8,.8);
		
		//Add villager group
		villagergroup = game.add.group();
		villagergroup.enableBody = true;
		
		//Add villagers
		villager1 = new villager('Good','Family1');
		villager1.spawn(game,30,75,'villager');
		villagergroup.add(villager1.sprite);
		
		villager2 = new villager('Bad','Family2');
		villager2.spawn(game,550,337,'villager');
		villagergroup.add(villager2.sprite);
		//villager2.setText('Hi.');
				
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
		
		//Enables villagers to fall on platforms
		game.physics.arcade.collide(villagergroup, platformgroup);
		
		//Bounce platform0 up and down
		if(platform0.sprite.y > 250){
			platform0.sprite.body.velocity.y = -65;
		}
		if(platform0.sprite.y < 100){
			platform0.sprite.body.velocity.y = 65;
		}
		
		//Move platform7/second in a circle
		theta += .01;
		platform7.sprite.body.velocity.x =  Math.cos(theta)*50;
		platform7_second.sprite.body.velocity.x =  Math.cos(theta)*50;
		platform7.sprite.body.velocity.y =  Math.sin(theta)*50;
		platform7_second.sprite.body.velocity.y =  Math.sin(theta)*50;
		
		//Check if player if overlapping villager and display text bubble if true
		/*if(Phaser.Rectangle.intersects(p1.sprite.getBounds(), villager2.sprite.getBounds())){
			villager2.displayText('chat','arial');
		}*/
		//game.physics.arcade.overlap(p1.sprite, villagergroup, showText, null, this);
		
	}
}

/*function showText(p1, villager){
	console.log('Show_Bubble');
	villager.displayText('chat','arial');

}*/
