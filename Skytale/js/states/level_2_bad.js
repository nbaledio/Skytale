//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//level_2_bad.js
//Second level of game, bad karma variant

var level_2_bad = function(game){};
var theta = 1;
var gamplay_state = 'OVERWORLD';
var transition = 'OVERWORLD';

level_2_bad.prototype = {
	init: function() {
		this.peopleHelped = 0;
		this.balance = 0;
		this.state = 'level_2_bad';
	},
	create: function(){
		
		//Resets theta so circular platform doesn't glitch to random places
		theta = 1;
		
		//Setting the size of the world
		game.world.setBounds(0, 0, 1600, 900);

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
		
		//Add platforms for doctor's house task
		platform5 = new platform(game,140,750,'platform',platformgroup);
		platform5.sprite.scale.setTo(.5,.5);
		platform6 = new platform(game,600,690,'platform',platformgroup);
		platform6.sprite.scale.setTo(.5,.5);
		platform7 = new platform(game,160,600,'platform',platformgroup);
		platform7.sprite.scale.setTo(.5,.5);
		
		//Add ground to the bottom,enable their physics, and resize their hitboxes
		ground1 = game.add.sprite(0,0,'ground');
		groundgroup.add(ground1);
		ground1.body.immovable = true;
		ground1.body.setSize(800,50,0,400);
		
		ground2 = game.add.sprite(800,0,'ground');
		groundgroup.add(ground2);
		ground2.body.immovable = true;
		ground2.body.setSize(800,50,0,400);
		
		//Add ground to house task area
	    ground3 = game.add.sprite(0,450,'ground');
		groundgroup.add(ground3);
		ground3.body.immovable = true;
		ground3.body.setSize(800,0,0,400);
		
		ground4 = game.add.sprite(800,450,'ground');
		groundgroup.add(ground4);
		ground4.body.immovable = true;
		ground4.body.setSize(800,0,0,400);
		
		//Add houses
		// house1 = game.add.sprite(40,270,'house');
		// house1.scale.setTo(.8,.8);
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
		villager1.spawn(game,1020,79,1,'Doctors');
		villagergroup.add(villager1.sprite);
		villager1.setText("Good evening, I am Dr. Enoch.","Have you taken care to avoid Bolio? I've made a test vaccine.","Can you help me test it?","Thank you so much! Come this way.","But think about how many lives this can save!","");
		
		villager2 = new villager();
		villager2.spawn(game,540,75,0,'Goat_Stealer');
		villagergroup.add(villager2.sprite);
		villager2.setText("I'm freezing out here. If only I had that goat's fur...","That farmer is useless. I bet he won't know if it's missing.","Can you steal it from him?","Good, now get to it.","You want me to freeze to death?!");
		
		villager3 = new villager();
		villager3.spawn(game,400,337,1,'Scientists');
		villagergroup.add(villager3.sprite);
		villager3.setText("Salutations, I am Mendel, 2nd gen. scientist","Our town lacks science! I have a solution, but no power source.","Can you bring me a crystal?","You have my gratitude.","But how will we evolve our society?","");
		
		villager4 = new villager();
		villager4.spawn(game,770,337,0,'Totem_Stealer');
		villagergroup.add(villager4.sprite);
		villager4.setText("This place blows. I need to make some hard cold cash NOW.","Hey, steal a bird statue totem for me or else.","So, you gonna do it?","Well, what are you waiting for?","I'm gonna make you regret this.");
		
		villager5 = new villager();
		villager5.spawn(game,1120,337,1,'Farmers');
		villagergroup.add(villager5.sprite);
		villager5.setText("Heyo partner! I'm Winslow Jr. and I'm the farmer!","The crops are sad... Maybe it's because I lost my lucky hat?","Can ya help me find it?","Thanks buddy!","Aw, shuckers.","");
		
		villager6 = new villager();
		villager6.spawn(game,1420,337,0,'Crystal_Stealer');
		villagergroup.add(villager6.sprite);
		villager6.setText("I hate that Mendel... He has all the crystals for his 'science.'","You and I should teach him a lesson and steal one.","Well, what do you say?","Alright, let's go break into his place.","Good to know I can't count on you.");
		
		karmaBar = new karma();
		karmaBar.spawn(game);

		bigBird = new statue();
		bigBird.spawn(game);
		
		p1 = new player();
		p1.spawn(game,110,330,'dude');
		p1.sprite.scale.setTo(.9,.9);
		p1.addAnimations('left', [0, 1, 2, 5], 6, true);
		p1.addAnimations('right', [3, 8, 4, 7], 6, true);
		
		//Focus camera on player
		game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		
		//Enable controls
		cursors = game.input.keyboard.createCursorKeys();
		
		//Resets black screen once fade is complete 
		game.camera.onFadeComplete.add(resetFade2, this);
	},
	update: function(){
		//Variables to check if player is on platform or ground
		var onPlatform = game.physics.arcade.collide(p1.sprite, platformgroup);
		var onGround = game.physics.arcade.collide(p1.sprite, groundgroup);
		
		//Change controls/fix camera depending on if in overworld or house task
		if(p1.sprite.y >= 370){
			if(p1.sprite.x < 801){
				gameplay_state = 'HOUSE';
			}else{
				gameplay_state = 'HOUSE2';
			}
		}else{
			gameplay_state = 'OVERWORLD'
		}
		if(gameplay_state == 'OVERWORLD'){
			p1.controls(onGround,onPlatform);
			game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0);
			game.camera.y = 0;
		}else{
			if(gameplay_state == 'HOUSE'){
				p1.fast_controls(onGround,onPlatform);
				game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_PLATFORMER, 0, 0);
				game.camera.x = 0;
				game.camera.y = 450;
			}else if(gameplay_state == 'HOUSE2'){
				p1.controls(onGround,onPlatform);
				game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_PLATFORMER, 0, 0);
				game.camera.x = 800;
				game.camera.y = 450;
				if(p1.sprite.x <= 803){
					p1.sprite.x += 3;
				}
				if(p1.sprite.x >= 1570){
					p1.sprite.x -= 3;
				}
			}
		}
		
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
		villager6.update(p1,karmaBar,this.balance);
		if (villager6.interacted == 'yes' && villager6.timer == 59) {
			villager6.task = new task();
			villager6.task.spawn(game, 1560, 148, 'chat', villager1);
		}
		if (villager6.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager6.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager6.complete(this.balance, p1);
			this.peopleHelped++;
			//karmaBar.update(this.balance);
			villager6.task.sprite.kill();
		}

		villager5.update(p1,karmaBar,this.balance);
		if (villager5.interacted == 'yes' && villager5.timer == 59) {
			villager5.task = new task();
			villager5.task.spawn(game, 1230, 340, 'chat', villager5);
		}
		if (villager5.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager5.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager5.complete(this.balance, p1);
			this.peopleHelped++;
			//karmaBar.update(this.balance);
			villager5.task.sprite.kill();
		}

		villager4.update(p1,karmaBar,this.balance);
		if (villager4.interacted == 'yes' && villager4.timer == 59) {
			villager4.task = new task();
			villager4.task.spawn(game, 1560, 148, 'chat', villager1);
		}
		if (villager4.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager4.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager4.complete(this.balance, p1);
			this.peopleHelped++;
			//karmaBar.update(this.balance);
			villager4.task.sprite.kill();
		}

		villager3.update(p1,karmaBar,this.balance);
		if (villager3.interacted == 'yes' && villager3.timer == 59) {
			villager3.task = new task();
			villager3.task.spawn(game, 1250, 170, 'chat', villager3);
		}
		if (villager3.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager3.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager3.complete(this.balance, p1);
			this.peopleHelped++;
			// karmaBar.update(this.balance);
			villager3.task.sprite.kill();
		}

		villager2.update(p1,karmaBar,this.balance);
		if (villager2.interacted == 'yes' && villager2.timer == 59) {
			villager2.task = new task();
			villager2.task.spawn(game, 1560, 148, 'chat', villager1);
		}
		if (villager2.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager2.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager2.complete(this.balance, p1);
			this.peopleHelped++;
			// karmaBar.update(this.balance);
			villager2.task.sprite.kill();
		}

		villager1.update(p1,karmaBar,this.balance);
		if (villager1.interacted == 'yes' && villager1.timer == 59) {
			villager1.task = new task();
			transition = 'HOUSE';
			fade();
			villager1.task.spawn(game, 550, 475, 'chat', villager1);
		}
		if (villager1.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager1.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager1.complete(this.balance, p1);
			this.peopleHelped++;
			// karmaBar.update(this.balance);
			villager1.task.sprite.kill();
			transition = 'OVERWORLD1';
			fade();
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
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.FOUR)){
			game.state.start('level_3_good')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.FIVE)){
			game.state.start('level_3_bad')
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

//Fade function. Fades to black to transition to inside house
function fade() {
    game.camera.fade(0x000000, 1000);

}
//Function to reset fade to black effect and move player/villager in and out of houses
function resetFade2() {
	if(transition == 'HOUSE'){
		p1.sprite.x = 50;
		p1.sprite.y = 790;
		villager1.sprite.x = 150;
		villager1.sprite.y = 785;
	}else if(transition == 'HOUSE2'){
		p1.sprite.x = 850;
		p1.sprite.y = 790;
	}else if(transition == 'OVERWORLD1'){
		p1.sprite.x = 1000;
		p1.sprite.y = 85;
		villager1.sprite.x = 1020;
		villager1.sprite.y = 79;
	}else if(transition == 'OVERWORLD2'){
		
	}
    game.camera.resetFX();
}