var test_environment2 = function(game){};
var direction;
var moveSpeed = 200;


test_environment2.prototype = {
	preload: function(){
		//Preload Assests
		game.load.image('background','assets/img/map.png');
		game.load.image('house','assets/img/house.png');
		game.load.audio('bgm','assets/audio/beneath_the_mask.ogg');
		game.load.spritesheet('witch','assets/img/witch.png',32,32);
	},
	create: function(){
		//Setting the size of the world
		game.world.setBounds(0, 0, 1200, 1080);
		
		//Create bgm
		bgm = game.add.audio('bgm');
		bgm.loop = true;
		bgm.play();
		
		//Add background
		game.add.sprite(0,0,'background');
		
		//Houses Group
		housegroup = game.add.group();

		//Enable hitboxes for every object in house group
		housegroup.enableBody = true;
		
		
		//It's easier to make a prefab here but... ya know
		h1 = game.add.sprite(95,70,'house');
		h1.scale.setTo(7.3,7.3);
		housegroup.add(h1);
		h1.body.immovable = true;
		//game.debug.body(h1);
		
		h2 = game.add.sprite(262,46,'house');
		h2.scale.setTo(3.8,5);
		housegroup.add(h2);
		h2.body.immovable = true;
		//game.debug.body(h2);
		
		h3 = game.add.sprite(143,285,'house');
		h3.scale.setTo(5,5);
		housegroup.add(h3);
		h3.body.immovable = true;
		//game.debug.body(h3);
		
		h4 = game.add.sprite(550,190,'house');
		h4.scale.setTo(5,5);
		housegroup.add(h4);
		h4.body.immovable = true;
		//game.debug.body(h4);
		
		h5 = game.add.sprite(575,335,'house');
		h5.scale.setTo(3.7,5);
		housegroup.add(h5);
		h5.body.immovable = true;
		//game.debug.body(h5);
		
		h6 = game.add.sprite(420,405,'house');
		h6.scale.setTo(2.6,2.4);
		housegroup.add(h6);
		h6.body.immovable = true;
		//game.debug.body(h6);
		
		h7 = game.add.sprite(575,75,'house');
		h7.scale.setTo(2.6,2.4);
		housegroup.add(h7);
		h7.body.immovable = true;
		//game.debug.body(h7);
		
		
		//Add player sprite
		player = game.add.sprite(500,500,'witch');
		game.physics.arcade.enable(player);
		player.body.enable = true;
		player.body.collideWorldBounds = true;
		
		//Add walking animations
		player.animations.add('left', [63,64,65,64], 10, true);
		player.animations.add('right', [75,76,77,76], 10, true);
		player.animations.add('up', [87,88,89,88], 10, true);
		player.animations.add('down', [51,52,53,52], 10, true);
		player.frame = 52;
		
		//Focus camera on player
		game.camera.follow(player,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		
		//Enable controls
		cursors = game.input.keyboard.createCursorKeys();
	},
	update: function(){
		//Reset player velocity
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		
		//Movement for player
		if (cursors.left.isDown){
			player.animations.play('left');
			direction = 'left';
			player.body.velocity.x = -moveSpeed;
		}else if (cursors.right.isDown){
			player.animations.play('right');
			direction = 'right';
			player.body.velocity.x = moveSpeed;
		}else if (cursors.up.isDown){
			player.animations.play('up');
			direction = 'up';
			player.body.velocity.y = -moveSpeed;
		}else if (cursors.down.isDown){
			player.animations.play('down');
			direction = 'down';
			player.body.velocity.y = moveSpeed;
		}else{
			player.animations.stop();
			if(direction  == 'left'){
				player.frame = 64;
			}else if(direction  == 'right'){
				player.frame = 76;
			}else if(direction  == 'up'){
				player.frame = 88;
			}else if(direction  == 'down'){
				player.frame = 52;
			}
		}
		//  Enables collision on houses
		game.physics.arcade.collide(player, housegroup);
	}
}