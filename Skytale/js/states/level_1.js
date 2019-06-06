//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//level_1.js
//First level of the game.

var level_1 = function(game){};
var theta = 1;
var gamplay_state = 'OVERWORLD';
var transition = 'OVERWORLD';

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
		game.world.setBounds(0,0, 1600, 900);

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
		platform2 = new platform(game,480,220,'platform',platformgroup);
		platform3 = new platform(game,610,170,'platform',platformgroup);
		platform4 = new platform(game,715,148,'platform',platformgroup);
		platform4_second = new platform(game,779,148,'platform',platformgroup);
		platform4_third = new platform(game,843,148,'platform',platformgroup);
		platform4_fourth = new platform(game,907,148,'platform',platformgroup);
		platform7 = new platform(game,1175,150,'platform',platformgroup);
		platform7.sprite.body.setSize(62,5,0,32);
		platform7_second = new platform(game,1239,150,'platform',platformgroup);
		platform6 = new platform(game,1435,136,'platform',platformgroup);
		platform6_second = new platform(game,1499,136,'platform',platformgroup);
		
		//Platforms for the doctor's house task
		platform8 = new platform(game,600,700,'platform',platformgroup);
		platform9 = new platform(game,400,680,'platform',platformgroup);
		platform10 = new platform(game,300,680,'platform',platformgroup);
		platform11 = new platform(game,50,600,'platform',platformgroup);
		platform12 = new platform(game,150,530,'platform',platformgroup);
		platform13 = new platform(game,450,530,'platform',platformgroup);
		
		//Platforms for the crystal thief task
		platform14 = new platform(game,1000,750,'platform',platformgroup);
		platform15 = new platform(game,1200,750,'platform',platformgroup);
		platform16 = new platform(game,1400,650,'platform',platformgroup);
		platform17 = new platform(game,1300,550,'platform',platformgroup);
		platform18 = new platform(game,1100,550,'platform',platformgroup);
		platform19 = new platform(game,900,550,'platform',platformgroup);
		
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
		villager1.spawn(game,30,75,1,'Doctors');
		villagergroup.add(villager1.sprite);
		villager1.setText("Hey there, I am Dr. Lancit.","I am working on a cure to the recent weasles disease.","Can you help me test it?","Thanks, come on inside!","Well, that is unfortunate...","Ah, I see my error. You helped quite a lot!");
		
		villager2 = new villager();
		villager2.spawn(game,550,337,0,'Goat_Stealer');
		villagergroup.add(villager2.sprite);
		villager2.setText("Hey, can you lift heavy stuff? I've got a job for you.","Wilson keeps on bragging about a goat. It's getting annoying.","Think you can steal it away?","Cool, bring it here when you got it.","Scared of a goat? Come on now!","Nice, now I don't have to listen to that dumb farmer.");
		
		villager3 = new villager();
		villager3.spawn(game,780,117,1,'Scientists');
		villagergroup.add(villager3.sprite);
		villager3.setText("Greetings, I am Alvis, a 1st gen. scientist.","I am studying crystals, as a source of new magic energy.","Can you find me a sample?","You have my thanks, friend.","But... think about how this can help the village!","Thanks you! Now my research can progress! ");
		
		villager4 = new villager();
		villager4.spawn(game,890,337,0,'Totem_Stealer');
		villagergroup.add(villager4.sprite);
		villager4.setText("Have you seen any shiny totems? They're by the bird statue.","If you steal one for me, I can make some BIG cash.","You wanna help me out?","Nice, you'll get a third of my profit.","You better not steal them for yourself.","Nice, I'm gonna keep the money by the way.");
		
		villager5 = new villager();
		villager5.spawn(game,1420,337,1,'Farmers');
		villagergroup.add(villager5.sprite);
		villager5.setText("Howdy partner! I am Winslow and I'm the farmer!","But I lost my good luck charm! It's a hat!","Can ya help me find it?","Thanks buddy!","Aw, shucks.","Wow! Where did ya find it?");

		villager6 = new villager();
		villager6.spawn(game,1470,105,0,'Crystal_Stealer');
		villagergroup.add(villager6.sprite);
		villager6.setText("Hey you! I hear Alvis has some crystals in his house.","Word is, they go for a pretty penny on the market.","Wanna help me steal one?","Follow me. We'll break in from the back.","No? Why not yes?!","Good stuff kid, now get out of here.");
				
		karmaBar = new karma();
		karmaBar.spawn(game);

		bigBird = new statue();
		bigBird.spawn(game);
		
		//Spawn totem and goat
		totem = game.add.sprite(150,370,'totem');
		goat = game.add.sprite(1500,355,'goat');

		//Add player
		p1 = new player();
		p1.spawn(game,110,330,'dude');
		p1.sprite.scale.setTo(.9,.9);
		p1.addAnimations('left', [0, 1, 2], 6, true);
		p1.addAnimations('right', [4, 5, 6], 6, true);
		
		//Focus camera on player/top half
		game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0);
		
		//Enable controls
		cursors = game.input.keyboard.createCursorKeys();
		
		//Resets black screen once fade is complete 
		game.camera.onFadeComplete.add(resetFade, this);
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
				p1.inverted_controls(onGround,onPlatform);
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
		
		//Bounce platform10 left/right
		if(platform10.sprite.x >= 300){
			platform10.sprite.body.velocity.x = -80;
		}else if(platform10.sprite.x <= 180){
			platform10.sprite.body.velocity.x = 80;
		}
		
		//Bounce platform12 left/right
		if(platform12.sprite.x <= 150){
			platform12.sprite.body.velocity.x = 80;
		}else if(platform12.sprite.x >=320){
			platform12.sprite.body.velocity.x = -80;
		}
		
		//Check if player if overlapping villager
		// call update on villager to respond accordingly
		villager6.update(p1,karmaBar,this.balance);
		if (villager6.interacted == 'yes' && villager6.timer == 59) {
			villager6.task = new task();
			transition = 'HOUSE2';
			fade();
			villager6.task.spawn(game, 930, 550, 'gem', villager6);
			
		}
		if (villager6.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager6.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager6.complete(this.balance, p1);
			this.peopleHelped++;
			//karmaBar.update(this.balance);
			villager6.task.sprite.kill();
			transition = 'OVERWORLD2';
			fade();
		}

		villager5.update(p1,karmaBar,this.balance);
		if (villager5.interacted == 'yes' && villager5.timer == 59) {
			villager5.task = new task();
			villager5.task.spawn(game, 1530, 340, 'hat', villager5);
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
			//karmaBar.update(this.balance);
			totem.kill();
			villager4.task.sprite.kill();
		}

		villager3.update(p1,karmaBar,this.balance);
		if (villager3.interacted == 'yes' && villager3.timer == 59) {
			villager3.task = new task();
			villager3.task.spawn(game, 20, 200, 'gem', villager3);
		}
		if (villager3.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager3.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager3.complete(this.balance, p1);
			this.peopleHelped++;
			//karmaBar.update(this.balance);
			villager3.task.sprite.kill();
		}

		villager2.update(p1,karmaBar,this.balance);
		if (villager2.interacted == 'yes' && villager2.timer == 59) {
			villager2.task = new task();
			villager2.task.spawn(game, 1500,355,'goat', villager2);
		}
		if (villager2.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager2.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			this.balance = villager2.complete(this.balance, p1);
			this.peopleHelped++;
			//karmaBar.update(this.balance);
			goat.kill();
			villager2.task.sprite.kill();
		}

		villager1.update(p1,karmaBar,this.balance);
		if (villager1.interacted == 'yes' && villager1.timer == 59) {
			villager1.task = new task();
			transition = 'HOUSE';
			fade();
			villager1.task.spawn(game, 480, 480, 'flag', villager1);
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

		//console.log(this.peopleHelped);
		
		//DEV TOOLS//

		// the player will either quit or finish the game by helping everyone
		if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
			game.state.start('GameOver', true, false, this.peopleHelped, this.balance);
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.ONE)){
			game.camera.onFadeComplete.remove(resetFade, this);
			game.state.start('level_1')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.TWO)){
			game.camera.onFadeComplete.remove(resetFade, this);
			game.state.start('level_2_good');
			bgm.stop();
		} else if(game.input.keyboard.justPressed(Phaser.Keyboard.THREE)){
			game.camera.onFadeComplete.remove(resetFade, this);
			game.state.start('level_2_bad')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.FOUR)){
			game.camera.onFadeComplete.remove(resetFade, this);
			game.state.start('level_3_good')
			bgm.stop();
		}else if(game.input.keyboard.justPressed(Phaser.Keyboard.FIVE)){
			game.camera.onFadeComplete.remove(resetFade, this);
			game.state.start('level_3_bad')
			bgm.stop();
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
function resetFade() {
	if(transition == 'HOUSE'){
		p1.sprite.x = 50;
		p1.sprite.y = 790;
		villager1.sprite.x = 150;
		villager1.sprite.y = 785;
	}else if(transition == 'HOUSE2'){
		p1.sprite.x = 850;
		p1.sprite.y = 790;
		villager6.sprite.x = 900;
		villager6.sprite.y = 785;
	}else if(transition == 'OVERWORLD1'){
		p1.sprite.x = 10;
		p1.sprite.y = 80;
		villager1.sprite.x = 30;
		villager1.sprite.y = 75;
	}else if(transition == 'OVERWORLD2'){
		p1.sprite.x = 1450;
		p1.sprite.y = 110;;
		villager6.sprite.x = 1470;
		villager6.sprite.y = 105;
	}
    game.camera.resetFX();
}