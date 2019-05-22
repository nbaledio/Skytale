//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//level_1.js
//First level of the game.

var level_1 = function(game){};
var theta = 1;

level_1.prototype = {
	init: function() {
		this.peopleHelped = 0;
		this.balance = 0;
		this.state = 'level_1';
	},
	create: function(){
		
		//Resets theta so circular platform doesn't glitch to random places
		theta = 1;
		
		//Setting the size of the world
		game.world.setBounds(0, 0, 1600, 450);

		game.physics.startSystem(Phaser.Physics.ARCADE);
		
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
		
		//Ground group
		groundgroup = game.add.group();
		
		//Enable physics for every object in ground group
		groundgroup.enableBody = true;
		
		
		//Add platforms (Left to right) (second/third/etc. just means multiple
		//platforms next to each other to make one big platform since scaling 
		//makes it look weird.)
		platform5 = new platform(game,5,107,'platform',platformgroup);
		platform5_second = new platform(game,69,107,'platform',platformgroup);
		platform0 = new platform(game,230,250,'platform',platformgroup);
		platform1 = new platform(game,350,265,'platform',platformgroup);
		platform2 = new platform(game,460,220,'platform',platformgroup);
		platform3 = new platform(game,570,170,'platform',platformgroup);
		platform4 = new platform(game,715,148,'platform',platformgroup);
		platform4_second = new platform(game,779,148,'platform',platformgroup);
		platform4_third = new platform(game,843,148,'platform',platformgroup);
		platform4_fourth = new platform(game,907,148,'platform',platformgroup);
		platform7 = new platform(game,1175,150,'platform',platformgroup);
		platform7.sprite.body.setSize(62,5,0,32);
		platform7_second = new platform(game,1239,150,'platform',platformgroup);
		platform6 = new platform(game,1435,136,'platform',platformgroup);
		platform6_second = new platform(game,1499,136,'platform',platformgroup);

		
		//Add ground to the bottom,enable their physics, and resize their hitboxes
		ground1 = game.add.sprite(0,0,'ground');
		groundgroup.add(ground1);
		ground1.body.immovable = true;
		ground1.body.setSize(800,50,0,400);
		
		ground2 = game.add.sprite(800,0,'ground');
		groundgroup.add(ground2);
		ground2.body.immovable = true;
		ground2.body.setSize(800,50,0,400);
		
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
		house6 = game.add.sprite(1450,40,'house');
		house6.scale.setTo(.8,.8);
		house7 = game.add.sprite(875,270,'house');
		house7.scale.setTo(.8,.8);
		
		//Add villager group
		villagergroup = game.add.group();
		villagergroup.enableBody = true;
		
		//Add villagers
		villager1 = new villager();
		villager1.spawn(game,30,75,'villager',1,'Family1','chat');
		villagergroup.add(villager1.sprite);
		villager1.setText('Find me one of those chat bubbles');
		
		villager2 = new villager();
		villager2.spawn(game,550,337,'villager',0,'Family2','chat');
		villagergroup.add(villager2.sprite);
		villager2.setText('Find me one of those chat bubbles');
		
		villager3 = new villager();
		villager3.spawn(game,780,117,'villager',1,'Family2','chat');
		villagergroup.add(villager3.sprite);
		villager3.setText('Find me one of those chat bubbles');
		
		villager4 = new villager();
		villager4.spawn(game,890,337,'villager',0,'Family2','chat');
		villagergroup.add(villager4.sprite);
		villager4.setText('Find me one of those chat bubbles');
		
		villager5 = new villager();
		villager5.spawn(game,1420,337,'villager',1,'Family2','chat');
		villagergroup.add(villager5.sprite);
		villager5.setText('Find me one of those chat bubbles');
		
		villager6 = new villager();
		villager6.spawn(game,1470,105,'villager',0,'Family2','chat');
		villagergroup.add(villager6.sprite);
		villager6.setText('Find me one of those chat bubbles');
				
		//Add player
		p1 = new player();
		p1.spawn(game,110,360,'dude');
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
		var onGround = game.physics.arcade.collide(p1.sprite, groundgroup);
		
		//Enable player controls
		p1.controls(onGround,onPlatform);
		
		//  Enables player to fall on platforms
		game.physics.arcade.collide(p1.sprite, platformgroup);
		
		//Enables villagers to fall on platforms
		game.physics.arcade.collide(villagergroup, platformgroup);
		
		//Bounce platform0 up and down
		if(platform0.sprite.y >= 250){
			platform0.sprite.body.velocity.y = -60;
		}
		if(platform0.sprite.y <= 100){
			platform0.sprite.body.velocity.y = 60;
		}
		
		//Move platform7/second in a circle
		theta += .01;
		platform7.sprite.body.velocity.x =  Math.cos(theta)*50;
		platform7_second.sprite.body.velocity.x =  Math.cos(theta)*50;
		platform7.sprite.body.velocity.y =  Math.sin(theta)*50;
		platform7_second.sprite.body.velocity.y =  Math.sin(theta)*50;
		
		//Check if player if overlapping villager
		// call update on villager to respond accordingly
		villager6.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager6.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager6.complete();
			if (villager6.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		villager5.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager5.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager5.complete();
			if (villager5.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		villager4.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager4.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager4.complete();
			if (villager4.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		villager3.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager3.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager3.complete();
			if (villager3.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		villager2.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager2.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager2.complete();
			if (villager2.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		villager1.update(p1);
		if (game.physics.arcade.overlap(p1.sprite, villager1.getTask(), finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			villager1.complete();
			if (villager1.nice == 1) {
				this.balance++;
			} else {
				this.balance--;
			}
		}
		

		// the player will either quit or finish the game by helping everyone
		if (this.peopleHelped == 2 ||
			game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			game.state.start('GameOver', true, false, this.peopleHelped, this.balance);
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.ONE)){
			game.state.start('level_1')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.TWO)){
			game.state.start('level_2_good')
			bgm.stop();
		} else if(game.input.keyboard.justPressed(Phaser.Keyboard.THREE)){
			game.state.start('level_2_bad')
			bgm.stop();
		}
	}
}

// helper function for when task is done
function finishTask(p1, task){
	task.kill();
	this.peopleHelped++;
}