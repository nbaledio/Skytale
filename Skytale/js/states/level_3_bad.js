//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//level_3_bad.js
//Third level of game, bad karma variant

var level_3_bad = function(game){};
var gamplay_state = 'OVERWORLD';
var transition = 'OVERWORLD';
var color = 'BLACK';

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
		background2 = game.add.sprite(0,450,'homebackground');
		background3 = game.add.sprite(800,450,'homebackground');
		
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
		platform0 = new platform(game,750,165,'platform',platformgroup);
		platform0_second = new platform(game,814,165,'platform',platformgroup);
		platform1 = new platform(game,650,250,'platform',platformgroup);
		platform4 = new platform(game,930,250,'platform',platformgroup);
		
		//Platforms for doctor's house task
		platform5 = new platform(game,300,770,'platform2',platformgroup);
		platform5.sprite.scale.setTo(.5,.5);
		platform6 = new platform(game,380,750,'platform2',platformgroup);
		platform6.sprite.scale.setTo(.5,.5);
		platform7 = new platform(game,520,750,'platform2',platformgroup);
		platform7.sprite.scale.setTo(.5,.5);
		platform8 = new platform(game,570,710,'platform2',platformgroup);
		platform8.sprite.scale.setTo(.5,.5);
		platform9 = new platform(game,600,660,'platform2',platformgroup);
		platform9.sprite.scale.setTo(.5,.5);
		platform10 = new platform(game,520,630,'platform2',platformgroup);
		platform10.sprite.scale.setTo(.5,.5);
		platform11 = new platform(game,343,630,'platform2',platformgroup);
		platform11.sprite.scale.setTo(.5,.5);
		platform12 = new platform(game,200,630,'platform2',platformgroup);
		platform12.sprite.scale.setTo(.5,.5);
		platform13 = new platform(game,50,630,'platform2',platformgroup);
		platform13.sprite.scale.setTo(.5,.5);
		
		//Platforms for the crystal thief's task
		platform14 = new platform(game,1200,730,'platform2',platformgroup);
		platform14.sprite.body.velocity.x = 80;
		platform15 = new platform(game,1400,655,'platform2',platformgroup);
		platform16 = new platform(game,950,580,'platform2',platformgroup);
		platform16.sprite.body.velocity.x = -80;
		
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
	    ground3 = game.add.sprite(0,450,'ground2');
		groundgroup.add(ground3);
		ground3.body.immovable = true;
		ground3.body.setSize(800,0,0,400);
		
		ground4 = game.add.sprite(800,450,'ground2');
		groundgroup.add(ground4);
		ground4.body.immovable = true;
		ground4.body.setSize(800,0,0,400);
		
		//Add houses
		// house1 = game.add.sprite(40,270,'house');
		// house1.scale.setTo(.8,.8);
		house2 = game.add.sprite(550,236,'house2');
		house2.scale.setTo(.8,.8);
		house3 = game.add.sprite(770,36,'house2');
		house3.scale.setTo(.8,.8);
		house4 = game.add.sprite(300,236,'house2');
		house4.scale.setTo(.8,.8);
		house5 = game.add.sprite(1400,236,'house2');
		house5.scale.setTo(.8,.8);
		house6 = game.add.sprite(1000,236,'house2');
		house6.scale.setTo(.8,.8);
		house7 = game.add.sprite(1200,236,'house2');
		house7.scale.setTo(.8,.8);
		
		//Add villager group
		villagergroup = game.add.group();
		villagergroup.enableBody = true;
		
		//Add villagers
		villager1 = new villager();
		villager1.spawn(game,570,335,1,'Doctors');
		villagergroup.add(villager1.sprite);
		villager1.setText("Hi, I am Dr. Lische.","Good, Red Fever hasn't got you. I fear my vaccine is weak.","Can you help me improve it?","On behalf of the village, I must say I'm forever grateful.","Please, I can't do this without you...","Ah yes, now I can fix the side effects!");
		
		villager2 = new villager();
		villager2.spawn(game,1220,335,0,'Goat_Stealer');
		villagergroup.add(villager2.sprite);
		villager2.setText("I'm starving... I need to eat... That goat looks pretty good...","It's right there, who cares if the village needs it.","Hey, wanna steal it for me?","Thanks bud, I'll share the feast with you.","You're just as useless as Wilson Jr. Jr.","Thanks, now go. This is my food. I lied about sharing.");
		
		villager3 = new villager();
		villager3.spawn(game,320,335,1,'Scientists');
		villagergroup.add(villager3.sprite);
		villager3.setText("Hello, I am Alfred, 3rd gen scientist.","Our village is powerless... and I can't fix it without a crystal","Please, can you bring a one?","Thank you, I am in your debt.","Please think it over.. I'm begging you.","Thank you so much! We're gonna be saved!");
		
		villager4 = new villager();
		villager4.spawn(game,1420,335,0,'Crystal_Stealer');
		villagergroup.add(villager4.sprite);
		villager4.setText("That dumb Alfred can't save us. You sell crystals not study them.","Come with me kid, we're gonna steal his last one.","Well, you coming or not?","Alright then, let's get to it.","You punk, don't you realize the village is done for.","Hah now he has none. What a loser.");
		
		villager5 = new villager();
		villager5.spawn(game,1020,335,1,'Farmers');
		villagergroup.add(villager5.sprite);
		villager5.setText("Hiya partner! I'm Winslow Jr. Jr. and I'm the farmer here!","I'm losing crops, but I won't once I find my lucky hat!","Can ya help me find it?","Thanks buddy!","Aw, shuckeroos.","Wow! Where did ya find it?");
		
		villager6 = new villager();
		villager6.spawn(game,790,135,0,'Totem_Stealer');
		villagergroup.add(villager6.sprite);
		villager6.setText("This village is trash. Who cares about the rules? I want money.","I want you to steal a bird statue totem.","So, what do you say?","Well? Don't keep me waiting here.","You think you can still save this place? Get real.","You're slow. But whatever. I got what I wanted.");
		
		karmaBar = new karma();
		karmaBar.spawn(game);

		bigBird = new statue();
		bigBird.spawn(game);
		bigBird.setText("My town is in turmoil and you are to blame.","Continue with\ncaution, and remember:\nbalance is key.");
		
		//Spawn totem and goat
		totem = game.add.sprite(150,370,'totem');
		goat = game.add.sprite(1080,355,'goat');
		
		//Add player
		p1 = new player(3);
		p1.spawn(game,110,330,'dude3');
		p1.levelone = 'false';
		p1.sprite.scale.setTo(.9,.9);
		p1.addAnimations('left', [0, 1, 2], 6, true);
		p1.addAnimations('right', [4, 5, 6], 6, true);
		
		//Focus camera on player
		game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
		
		//Enable controls
		cursors = game.input.keyboard.createCursorKeys();
		
		//Resets black screen once fade is complete 
		game.camera.onFadeComplete.add(resetFade4, this);
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
				if(p1.sprite.x > 770){
					p1.sprite.x -= 2.5;
				}
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
		
		//Bounce platform14 left/right
		if(platform14.sprite.x >= 1400){
			platform14.sprite.body.velocity.x = -80;
		}else if(platform14.sprite.x <= 900){
			platform14.sprite.body.velocity.x = 80;
			
		}//Bounce platform15 left/right
		if(platform15.sprite.x >= 1400){
			platform15.sprite.body.velocity.x = -80;
		}else if(platform15.sprite.x <= 900){
			platform15.sprite.body.velocity.x = 80;
			
		}//Bounce platform16 left/right
		if(platform16.sprite.x >= 1400){
			platform16.sprite.body.velocity.x = -80;
		}else if(platform16.sprite.x <= 900){
			platform16.sprite.body.velocity.x = 80;
		}
		
		//  Enables player to fall on platforms
		game.physics.arcade.collide(p1.sprite, platformgroup);
		
		//Enables villagers to fall on platforms
		game.physics.arcade.collide(villagergroup, platformgroup);
		

		if ((bigBird.interacted == 'intro' || bigBird.interacted == 'ready')) {
			bigBird.startLevel();
			//bigBird.endLevel(4);
		} else {
			// check for ending
			if ((p1.interacting == 'none'|| p1.interacting == 'statue') && p1.sprite.x<100 && p1.sprite.y==345.4) {
				bigBird.endLevel(karmaBar.numKarma, p1);
			}
			if (bigBird.interacted == 'endLevel') {
				// if (karmaBar.numKarma < 5) {
				// 	game.state.start('level_2_bad');
				// } else {
				// 	game.state.start('level_2_good');
				// }
				game.state.start('GameOver');
			}

			//Check if player if overlapping villager
			// call update on villager to respond accordingly
			villager6.update(p1,karmaBar,this.balance);
			if (villager6.interacted == 'yes' && villager6.timer == 59) {
				villager6.task = new task();
				villager6.task.spawn(game, 150,370,'totem', villager6);
			}
			if (villager6.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager6.task.sprite, null, null, this)) {
				// if task is completed, update the villager instance and overall balance
				this.balance = villager6.complete(this.balance, p1);
				this.peopleHelped++;
				//karmaBar.update(this.balance);
				totem.kill()
				villager6.task.sprite.kill();
			}

			villager5.update(p1,karmaBar,this.balance);
			if (villager5.interacted == 'yes' && villager5.timer == 59) {
				villager5.task = new task();
				villager5.task.spawn(game, 1130, 338, 'hat', villager5);
			}
			if (villager5.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager5.task.sprite, null, null, this)) {
				// if task is completed, update the villager instance and overall balance
				this.balance = villager5.complete(this.balance, p1);
				this.peopleHelped++;
				// karmaBar.update(this.balance);
				villager5.task.sprite.kill();
			}

			villager4.update(p1,karmaBar,this.balance);
			if (villager4.interacted == 'yes' && villager4.timer == 59) {
				villager4.task = new task();
				transition = 'HOUSE2';
				fade();
				villager4.task.spawn(game, 1200, 460, 'gem', villager4);
			}
			if (villager4.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager4.task.sprite, null, null, this)) {
				// if task is completed, update the villager instance and overall balance
				this.balance = villager4.complete(this.balance, p1);
				this.peopleHelped++;
				// karmaBar.update(this.balance);
				villager4.task.sprite.kill();
				transition = 'OVERWORLD2';
				fade();
			}

			villager3.update(p1,karmaBar,this.balance);
			if (villager3.interacted == 'yes' && villager3.timer == 59) {
				villager3.task = new task();
				villager3.task.spawn(game, 540, 90, 'gem', villager3);
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
				villager2.task.spawn(game, 1080,355,'goat', villager2);
			}
			if (villager2.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager2.task.sprite, null, null, this)) {
				// if task is completed, update the villager instance and overall balance
				this.balance = villager2.complete(this.balance, p1);
				this.peopleHelped++;
				//karmaBar.update(this.balance);
				goat.kill()
				villager2.task.sprite.kill();
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
				//karmaBar.update(this.balance);
				villager1.task.sprite.kill();
				transition = 'OVERWORLD1';
				fade();
			}
		}
		
		/*if(game.input.keyboard.justPressed(Phaser.Keyboard.ONE)){
			game.camera.onFadeComplete.remove(resetFade4, this);
			game.state.start('level_1')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.TWO)){
			game.camera.onFadeComplete.remove(resetFade4, this);
			game.state.start('level_2_good')
			bgm.stop();
		} else if(game.input.keyboard.justPressed(Phaser.Keyboard.THREE)){
			game.camera.onFadeComplete.remove(resetFade4, this);
			game.state.start('level_2_bad')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.FOUR)){
			game.camera.onFadeComplete.remove(resetFade4, this);
			game.state.start('level_3_good')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.FIVE)){
			game.camera.onFadeComplete.remove(resetFade4, this);
			game.state.start('level_3_bad')
			bgm.stop();
		}*/
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
function resetFade4() {
	if(transition == 'HOUSE'){
		p1.sprite.x = 50;
		p1.sprite.y = 790;
		villager1.sprite.x = 150;
		villager1.sprite.y = 785;
		bubble1 = game.add.sprite(50,590,'textbubble');
		quote1 = textWrap("You look sick. Are you still able to grab that flag?");
		text1 = game.add.bitmapText(74,614,'myfont',quote1,48);
		game.time.events.add(Phaser.Timer.SECOND * 4, killText, this)
	}else if(transition == 'HOUSE2'){
		p1.sprite.x = 850;
		p1.sprite.y = 790;
		villager4.sprite.x = 900;
		villager4.sprite.y = 785;
		bubble2 = game.add.sprite(850,590,'textbubble');
		quote2 = textWrap("There it is! Take it before Alfred returns!");
		text2 = game.add.bitmapText(874,614,'myfont',quote2,48);
		game.time.events.add(Phaser.Timer.SECOND * 4, killText2, this);
	}else if(transition == 'OVERWORLD1'){
		p1.sprite.x = 550;
		p1.sprite.y = 340;
		villager1.sprite.x = 570;
		villager1.sprite.y = 335;
	}else if(transition == 'OVERWORLD2'){
		p1.sprite.x = 1400;
		p1.sprite.y = 340;
		villager4.sprite.x = 1420;
		villager4.sprite.y = 335;
	}
    game.camera.resetFX();
}