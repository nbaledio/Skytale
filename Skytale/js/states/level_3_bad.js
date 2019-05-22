//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//level_2_bad.js
//Second level of game, bad karma variant

var level_3_bad = function(game){};
var theta = 1;

level_3_bad.prototype = {
	init: function() {
		this.peopleHelped = 0;
		this.balance = 0;
		this.state = 'level_3_bad';
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
		platform0 = new platform(game,600,250,'platform',platformgroup);
		platform1 = new platform(game,930,250,'platform',platformgroup);
		platform2 = new platform(game,990,109,'platform',platformgroup);
		platform2_second = new platform(game,1054,109,'platform',platformgroup);
		platform3 = new platform(game,510,106,'platform',platformgroup);
		platform3_second = new platform(game,574,106,'platform',platformgroup);
		platform4 = new platform(game,775,110,'platform',platformgroup);
		platform4.sprite.body.setSize(62,5,0,32);
		platform4_second = new platform(game,839,110,'platform',platformgroup);


		
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
		house2 = game.add.sprite(750,270,'house');
		house2.scale.setTo(.8,.8);
		house3 = game.add.sprite(520,10,'house');
		house3.scale.setTo(.8,.8);
		house4 = game.add.sprite(380,270,'house');
		house4.scale.setTo(.8,.8);
		house5 = game.add.sprite(1400,270,'house');
		house5.scale.setTo(.8,.8);
		house6 = game.add.sprite(1000,13,'house');
		house6.scale.setTo(.8,.8);
		house7 = game.add.sprite(1100,270,'house');
		house7.scale.setTo(.8,.8);
		
		//Add villager group
		villagergroup = game.add.group();
		villagergroup.enableBody = true;
		
		//Add villagers
		villager1 = new villager();
		villager1.spawn(game,1020,79,'villager',1,'Family1');
		villagergroup.add(villager1.sprite);
		villager1.setText('Find me one of those chat bubbles');
		
		villager2 = new villager();
		villager2.spawn(game,540,75,'villager',0,'Family2');
		villagergroup.add(villager2.sprite);
		villager2.setText('Find me one of those chat bubbles');
		
		villager3 = new villager();
		villager3.spawn(game,400,337,'villager',1,'Family3');
		villagergroup.add(villager3.sprite);
		villager3.setText('Find me one of those chat bubbles');
		
		villager4 = new villager();
		villager4.spawn(game,770,337,'villager',0,'Family4');
		villagergroup.add(villager4.sprite);
		villager4.setText('Find me one of those chat bubbles');
		
		villager5 = new villager();
		villager5.spawn(game,1120,337,'villager',1,'Family5');
		villagergroup.add(villager5.sprite);
		villager5.setText('Find me one of those chat bubbles');
		
		villager6 = new villager();
		villager6.spawn(game,1420,337,'villager',0,'Family6');
		villagergroup.add(villager6.sprite);
		villager6.setText('Find me one of those chat bubbles');
				
		//Add player
		p1 = new player();
		p1.spawn(game,110,350,'dude');
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
		
		//Move platform7/second in a circle
		theta += .03;
		platform4.sprite.body.velocity.x =  Math.cos(theta)*50;
		platform4_second.sprite.body.velocity.x =  Math.cos(theta)*50;
		platform4.sprite.body.velocity.y =  Math.sin(theta)*50;
		platform4_second.sprite.body.velocity.y =  Math.sin(theta)*50;
		
		//Check if player if overlapping villager
		// call update on villager to respond accordingly
		villager6.update(p1);
		if (villager6.interacted == 'yes' && villager6.timer == 59) {
			task = new task();
			task.spawn(game, 1560, 148, 'chat', villager6);
			//console.log('hewwo');
		}
		if (game.physics.arcade.overlap(p1.sprite, task.sprite, finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager6.complete(this.balance, p1);
		}
		villager5.update(p1);
		if (villager5.interacted == 'yes' && villager5.timer == 59) {
			task = new task();
			task.spawn(game, 1560, 148, 'chat', villager5);
			//console.log('hewwo');
		}
		if (game.physics.arcade.overlap(p1.sprite, task.sprite, finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager5.complete(this.balance, p1);
		}
		villager4.update(p1);
		if (villager4.interacted == 'yes' && villager4.timer == 59) {
			task = new task();
			task.spawn(game, 1560, 148, 'chat', villager4);
			//console.log('hewwo');
		}
		if (game.physics.arcade.overlap(p1.sprite, task.sprite, finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager4.complete(this.balance, p1);
		}
		villager3.update(p1);
		if (villager3.interacted == 'yes' && villager3.timer == 59) {
			task = new task();
			task.spawn(game, 1560, 148, 'chat', villager3);
			//console.log('hewwo');
		}
		if (game.physics.arcade.overlap(p1.sprite, task.sprite, finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager3.complete(this.balance, p1);
		}
		villager2.update(p1);
		if (villager2.interacted == 'yes' && villager2.timer == 59) {
			task = new task();
			task.spawn(game, 1560, 148, 'chat', villager2);
			//console.log('hewwo');
		}
		if (game.physics.arcade.overlap(p1.sprite, task.sprite, finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager2.complete(this.balance, p1);
		}
		villager1.update(p1);
		if (villager1.interacted == 'yes' && villager1.timer == 59) {
			task = new task();
			task.spawn(game, 1560, 148, 'chat', villager1);
			//console.log('hewwo');
		}
		if (game.physics.arcade.overlap(p1.sprite, task.sprite, finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager1.complete(this.balance, p1);
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
		

		// the player will either quit or finish the game by helping everyone
		if (this.peopleHelped == 2 ||
			game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			game.state.start('GameOver', true, false, this.peopleHelped, this.balance);
		}
	}
}

// helper function for when task is done
function finishTask(p1, task){
	task.kill();
	this.peopleHelped++;
}