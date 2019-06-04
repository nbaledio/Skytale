//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//level_3_good.js
//Third level of game, good karma variant

var level_3_good = function(game){};
var theta = 1;
var diagonal_velocity = 40;
var gamplay_state = 'OVERWORLD';
var transition = 'OVERWORLD';

level_3_good.prototype = {
	init: function() {
		this.peopleHelped = 0;
		this.balance = 0;
		this.state = 'level_3_bad';
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
		platform0 = new platform(game,230,155,'platform',platformgroup);
		platform0_second = new platform(game,294,155,'platform',platformgroup);
		platform1 = new platform(game,500,215,'platform',platformgroup);
		platform1_second = new platform(game,564,215,'platform',platformgroup);
		platform2 = new platform(game,730,105,'platform',platformgroup);
		platform2_second = new platform(game,794,105,'platform',platformgroup);
		platform3 = new platform(game,960,215,'platform',platformgroup);
		platform3_second = new platform(game,1024,215,'platform',platformgroup);
		platform4 = new platform(game,250,240,'platform',platformgroup);
		platform5 = new platform(game,1230,155,'platform',platformgroup);
		platform5_second = new platform(game,1294,155,'platform',platformgroup);
		platform6 = new platform(game,650,215,'platform',platformgroup);
		platform7 = new platform(game,870,215,'platform',platformgroup);
		platform8 = new platform(game,380,300,'platform',platformgroup);
		platform9 = new platform(game,1140,300,'platform',platformgroup);
		platform10 = new platform(game,1350,240,'platform',platformgroup);
		platform11 = new platform(game,50,50,'platform',platformgroup);
		platform12 = new platform(game,1450,50,'platform',platformgroup);
		platform13 = new platform(game,630,140,'platform',platformgroup);
		platform14 = new platform(game,900,140,'platform',platformgroup);
		
		//Platforms for the doctor's house task
		platform15 = new platform(game,300,770,'platform',platformgroup);
		platform15.sprite.scale.setTo(.5,.5);
		platform16 = new platform(game,380,750,'platform',platformgroup);
		platform16.sprite.scale.setTo(.5,.5);
		platform17 = new platform(game,520,750,'platform',platformgroup);
		platform17.sprite.scale.setTo(.5,.5);
		platform18 = new platform(game,570,710,'platform',platformgroup);
		platform18.sprite.scale.setTo(.5,.5);
		platform19 = new platform(game,600,660,'platform',platformgroup);
		platform19.sprite.scale.setTo(.5,.5);
		platform20 = new platform(game,520,630,'platform',platformgroup);
		platform20.sprite.scale.setTo(.5,.5);
		platform21 = new platform(game,344,630,'platform',platformgroup);
		platform21.sprite.scale.setTo(.5,.5);
		platform22 = new platform(game,200,630,'platform',platformgroup);
		platform22.sprite.scale.setTo(.5,.5);
		platform23 = new platform(game,50,630,'platform',platformgroup);
		platform23.sprite.scale.setTo(.5,.5);
		
		//Platforms for the crystal thief's task
		platform24 = new platform(game,1200,730,'platform',platformgroup);
		platform24.sprite.body.velocity.x = 80;
		platform25 = new platform(game,1400,655,'platform',platformgroup);
		platform26 = new platform(game,950,580,'platform',platformgroup);
		platform26.sprite.body.velocity.x = -80;
		
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
		house2 = game.add.sprite(750,10,'house');
		house2.scale.setTo(.8,.8);
		house3 = game.add.sprite(520,120,'house');
		house3.scale.setTo(.8,.8);
		house4 = game.add.sprite(250,60,'house');
		house4.scale.setTo(.8,.8);
		house5 = game.add.sprite(980,120,'house');
		house5.scale.setTo(.8,.8);
		house6 = game.add.sprite(1250,60,'house');
		house6.scale.setTo(.8,.8);
		house7 = game.add.sprite(1460,270,'house');
		house7.scale.setTo(.8,.8);
		
		//Add villager group
		villagergroup = game.add.group();
		villagergroup.enableBody = true;
		
		//Add villagers
		villager1 = new villager();
		villager1.spawn(game,770,75,1,'Doctors');
		villagergroup.add(villager1.sprite);
		villager1.setText("Hi, I am Dr. Lische.","We've come far in the skies! Shouldn't we jump higher too?","Wanna test my new jump serum?","Thanks, I hope you're ready to soar!","Hm, maybe it is safer not make it.","Heh. Looks like I screwed up the formula.");
		
		villager2 = new villager();
		villager2.spawn(game,540,185,0,'Crystal_Stealer');
		villagergroup.add(villager2.sprite);
		villager2.setText("You know what's great about a rich village? I get more loot.","Alfred has a lot of crystals, stealing one is just fine.","Wanna join me in a break-in?","Let's go, I'll lead the way.","Fine then, go away nerd.","Thanks. Think we should make this a regular thing?");
		
		villager3 = new villager();
		villager3.spawn(game,270,125,1,'Scientists');
		villagergroup.add(villager3.sprite);
		villager3.setText("Hello, I am Alfred, 3rd gen scientist.","I'm making robots! But I need a crystal for my prototype.","Can you find one for me?","Thanks. The future is now!","Hm, Maybe I can power it without a crystal.","Perfect! My robot children will rise!");
		
		villager4 = new villager();
		villager4.spawn(game,1000,185,0,'Totem_Stealer');
		villagergroup.add(villager4.sprite);
		villager4.setText("Hey you. I've got a job. See that bird statue totem?","I dare you to steal it and bring it here.","Well, are you gonna do it?","Ok, then, get going! Time is money!","Hah, I knew you were too chicken to do it.","Wow, and here I was thinking you ran away.");
		
		villager5 = new villager();
		villager5.spawn(game,1270,125,1,'Farmers');
		villagergroup.add(villager5.sprite);
		villager5.setText("Hiya partner! I'm Winslow Jr. Jr. and I'm the farmer here!","We got a good harvest! But I lost my lucky hat!","Can ya help me find it?","Thanks buddy!","Aw, shuckeroos.","Wow! Where did ya find it?");
		
		villager6 = new villager();
		villager6.spawn(game,1480,335,0,'Goat_Stealer');
		villagergroup.add(villager6.sprite);
		villager6.setText("I always wanted a pet. Winslow Jr. Jr. has too many goats.","I want one. I'll pay you well if you steal it.","Do you wanna take my offer?","Alright, I'll be waiting here.","Fine, guess I'll just have to steal it myself.","Cool. Now, what should I name it?");
		
		karmaBar = new karma();
		karmaBar.spawn(game);

		bigBird = new statue();
		bigBird.spawn(game);
		
		//Spawn totem and goat
		totem = game.add.sprite(150,370,'totem');
		goat = game.add.sprite(1320,140,'goat');

		//Add player
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
		game.camera.onFadeComplete.add(resetFade5, this);
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
				p1.short_hop_controls(onGround,onPlatform);
				game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_PLATFORMER, 0, 0);
				game.camera.x = 0;
				game.camera.y = 450;
			}else if(gameplay_state == 'HOUSE2'){
				p1.controls2(onGround,onPlatform);
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
		platform4.sprite.body.velocity.y =  Math.sin(theta)*50;	
		platform10.sprite.body.velocity.x =  Math.cos(theta)*50;
		platform10.sprite.body.velocity.y =  Math.sin(theta)*50;

		//Bounce Platform6/7 diagonally
		if(platform6.spritey <= 215 || platform7.sprite.y <= 215){
			platform6.sprite.body.velocity.x = diagonal_velocity;
			platform6.sprite.body.velocity.y = diagonal_velocity;
			platform7.sprite.body.velocity.x = -diagonal_velocity;
			platform7.sprite.body.velocity.y = diagonal_velocity;
		}else if(platform6.spritey >= 280 || platform7.sprite.y >= 280){
			platform6.sprite.body.velocity.x = -diagonal_velocity;
			platform6.sprite.body.velocity.y = -diagonal_velocity;
			platform7.sprite.body.velocity.x = diagonal_velocity;
			platform7.sprite.body.velocity.y = -diagonal_velocity;
		}
		
		//Bounce Platform8/9 vertically
		if(platform8.sprite.y >= 300 || platform9.sprite.y >= 300){
			platform8.sprite.body.velocity.y = -diagonal_velocity -20;
			platform9.sprite.body.velocity.y = -diagonal_velocity -20;
		}else if(platform8.sprite.y <= 200 || platform9.sprite.y <= 200){
			platform8.sprite.body.velocity.y = diagonal_velocity + 20;
			platform9.sprite.body.velocity.y = diagonal_velocity + 20;
		}
		
		//Bounce Platform 11/12 vertically
		if(platform11.sprite.y >= 150 || platform12.sprite.y >= 150){
			platform11.sprite.body.velocity.y = -diagonal_velocity -20;
			platform12.sprite.body.velocity.y = -diagonal_velocity -20;
		}else if(platform11.sprite.y <= 50 || platform12.sprite.y <= 50){
			platform11.sprite.body.velocity.y = diagonal_velocity + 20;
			platform12.sprite.body.velocity.y = diagonal_velocity + 20;
		}
		
		//Bounce platform24 left/right
		if(platform24.sprite.x >= 1400){
			platform24.sprite.body.velocity.x = -80;
		}else if(platform24.sprite.x <= 900){
			platform24.sprite.body.velocity.x = 80;
			
		}//Bounce platform25 left/right
		if(platform25.sprite.x >= 1400){
			platform25.sprite.body.velocity.x = -80;
		}else if(platform25.sprite.x <= 900){
			platform25.sprite.body.velocity.x = 80;
			
		}//Bounce platform26 left/right
		if(platform26.sprite.x >= 1400){
			platform26.sprite.body.velocity.x = -80;
		}else if(platform26.sprite.x <= 900){
			platform26.sprite.body.velocity.x = 80;
		}
		
		//Check if player if overlapping villager
		// call update on villager to respond accordingly
		villager6.update(p1,karmaBar,this.balance);
		if (villager6.interacted == 'yes' && villager6.timer == 59) {
			villager6.task = new task();
			villager6.task.spawn(game,1320,140,'goat', villager6);
			villager6.task.sprite.alpha = 0;
		}
		if (villager6.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager6.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager6.complete(this.balance, p1);
			this.peopleHelped++;
			// karmaBar.update(this.balance);
			goat.kill();
			villager6.task.sprite.kill();
		}

		villager5.update(p1,karmaBar,this.balance);
		if (villager5.interacted == 'yes' && villager5.timer == 59) {
			villager5.task = new task();
			villager5.task.spawn(game, 1380, 128, 'hat', villager5);
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
			villager4.task.spawn(game, 150,370,'totem', villager4);
		}
		if (villager4.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager4.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager4.complete(this.balance, p1);
			this.peopleHelped++;
			// karmaBar.update(this.balance);
			totem.kill();
			villager4.task.sprite.kill();
		}

		villager3.update(p1,karmaBar,this.balance);
		if (villager3.interacted == 'yes' && villager3.timer == 59) {
			villager3.task = new task();
			villager3.task.spawn(game, 1480, 90, 'chat', villager3);

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
			transition = 'HOUSE2';
			fade();
			villager2.task.spawn(game, 1200, 460, 'chat', villager2);
		}
		if (villager2.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager2.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager2.complete(this.balance, p1);
			this.peopleHelped++;
			// karmaBar.update(this.balance);
			villager2.task.sprite.kill();
			transition = 'OVERWORLD2';
			fade();
		}

		villager1.update(p1,karmaBar,this.balance);
		if (villager1.interacted == 'yes' && villager1.timer == 59) {
			villager1.task = new task();
			villager1.task.spawn(game, 50, 600, 'flag', villager1);
			transition = 'HOUSE';
			fade();
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
			game.camera.onFadeComplete.remove(resetFade5, this);
			game.state.start('level_1')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.TWO)){
			game.camera.onFadeComplete.remove(resetFade5, this);
			game.state.start('level_2_good')
			bgm.stop();
		} else if(game.input.keyboard.justPressed(Phaser.Keyboard.THREE)){
			game.camera.onFadeComplete.remove(resetFade5, this);
			game.state.start('level_2_bad')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.FOUR)){
			game.camera.onFadeComplete.remove(resetFade5, this);
			game.state.start('level_3_good')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.FIVE)){
			game.camera.onFadeComplete.remove(resetFade5, this);
			game.state.start('level_3_bad')
			bgm.stop();
		}
		

		// the player will either quit or finish the game by helping everyone
		/*if (this.peopleHelped == 2 ||
			game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			game.state.start('GameOver', true, false, this.peopleHelped, this.balance);
		}*/
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
function resetFade5() {
	if(transition == 'HOUSE'){
		p1.sprite.x = 50;
		p1.sprite.y = 790;
		villager1.sprite.x = 150;
		villager1.sprite.y = 785;
	}else if(transition == 'HOUSE2'){
		p1.sprite.x = 850;
		p1.sprite.y = 790;
		villager2.sprite.x = 900;
		villager2.sprite.y = 785;
	}else if(transition == 'OVERWORLD1'){
		p1.sprite.x = 760;
		p1.sprite.y = 80;
		villager1.sprite.x = 770;
		villager1.sprite.y = 75;
	}else if(transition == 'OVERWORLD2'){
		p1.sprite.x = 520;
		p1.sprite.y = 190;
		villager2.sprite.x = 540;
		villager2.sprite.y = 185;
		game.camera.x = 30;
		game.camera.y = 0;
	}
    game.camera.resetFX();
}