//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
//tutorial.js
//introduces the player to basic mechanics

var tutorial = function(game) {};

var timer = 0;
var learned = 0;
var task;

tutorial.prototype = {
	create: function() {
		
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


		platform5 = new platform(game,400,265,'platform',platformgroup);
		platform6 = new platform(game,490,230,'platform',platformgroup);
		platform1 = new platform(game,1150,265,'platform',platformgroup);
		platform2 = new platform(game,1240,230,'platform',platformgroup);
		platform3 = new platform(game,1370,180,'platform',platformgroup);
		platform4 = new platform(game,1515,148,'platform',platformgroup);



		//Add ground to the bottom,enable their physics, and resize their hitboxes
		ground1 = game.add.sprite(0,0,'ground');
		groundgroup.add(ground1);
		ground1.body.immovable = true;
		ground1.body.setSize(800,50,0,400);
		
		ground2 = game.add.sprite(800,0,'ground');
		groundgroup.add(ground2);
		ground2.body.immovable = true;
		ground2.body.setSize(800,50,0,400);



		house = game.add.sprite(900,270,'house');
		house.scale.setTo(.8,.8);



		villagergroup = game.add.group();
		villagergroup.enableBody = true;

		villager3 = new villager();
		villager3.spawn(game,900,337,'villager',1,'Family2');
		villagergroup.add(villager3.sprite);

		villager3.setText("Welcome to the tutorial, I've got a task for you.","Find me one of the chat bubbles.","Can you do it?","Wonderful!\nGood luck!","Alright then...", "Wow, thank you!");

		bubble = game.add.sprite(65,185,'textbubble');
		bubble.width = 315;
		bubble.height = 95;
		bubble.visible = false;


		instructions = game.add.bitmapText(90, 210, 'myfont', 'Use      to move', 48);
		instructionsVisual = game.add.sprite(155,205,'arrow');
		//instructionsVisual2 = game.add.sprite(160,212,'arrow');
		instructions.visible = false;
		instructionsVisual.visible = false;
		//instructionsVisual2.visible = false;

		karmaBar = new karma();
		karmaBar.spawn(game,5);

		timer = -5;

		bigBird = new statue();
		bigBird.spawn(game);
		bigBird.setText("You have been tasked with\nmaintaining the balance in my town.","Let's get you acquainted with\nsome controls, shall we?");


		//Add player
		p1 = new player(6);
		p1.spawn(game,110,330,'dude');
		p1.levelone = 'true';
		p1.sprite.scale.setTo(.9,.9);
		p1.addAnimations('left', [0, 1, 2, 5], 6, true);
		p1.addAnimations('right', [3,7,4,8], 6, true);
		//Focus camera on player
		game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

		//Enable controls
		cursors = game.input.keyboard.createCursorKeys();
		
	},
	update: function() {
		//Variables to check if player is on platform or ground
		var onPlatform = game.physics.arcade.collide(p1.sprite, platformgroup);
		var onGround = game.physics.arcade.collide(p1.sprite, groundgroup);
		
		//Enable player controls
		p1.controls(onGround,onPlatform);
		
		//  Enables player to fall on platforms
		game.physics.arcade.collide(p1.sprite, platformgroup);
		
		//Enables villagers to fall on platforms
		game.physics.arcade.collide(villagergroup, platformgroup);
		
		//  Enables player to fall on platforms
		game.physics.arcade.collide(p1.sprite, platformgroup);

		if ((bigBird.interacted == 'intro' || bigBird.interacted == 'ready')) {
			bigBird.startLevel();
			//bigBird.endTutorial();

		} else {

		timer++;
		
		if (timer <0) {
			bubble.visible = true;
			instructions.visible = true;
			instructionsVisual.visible = true;

		}

		if (timer > 30 && timer%70 == 5) {
			instructions.visible = !instructions.visible;
			instructionsVisual.visible = !instructionsVisual.visible;
			//instructionsVisual2.visible = !instructionsVisual2.visible;
		}

		villager3.update(p1,null,null);
		if (villager3.interacted == 'yes' && villager3.timer == 59) {
			villager3.task = new task();
			villager3.task.spawn(game, 1560, 148, 'chat', villager3);
			timer = 0;
			//console.log('hewwo');
		}
		if (villager3.interacted == 'unfinished' && game.physics.arcade.overlap(p1.sprite, villager3.task.sprite, null, null, this)) {
			// if task is completed, update the villager instance and overall balance
			//balance = villager3.complete(balance, p1);
			bubble.destroy();
			instructions.destroy();
			instructionsVisual.destroy();
			bubble = game.add.sprite(970,180,'textbubble');
			bubble.width = 590;
			bubble.height = 130;
			instructions = game.add.bitmapText(1000, 200, 'myfont', "Don't forget to return this item to\nthe villager", 48);
			timer = 0;
			villager3.complete(null, p1);
			villager3.task.sprite.kill();
		}

		if (villager3.interacted == 'done') {
			bubble.destroy();
			instructions.destroy();
			bubble = game.add.sprite(600,180,'textbubble');
			bubble.width = 590;
			bubble.height = 130;
			instructions = game.add.bitmapText(630, 200, 'myfont', "Nice job! Return to the statue to\ncontinue", 48);
			learned = 'done';
			//bigBird.interacted = 'doneTutorial';
		}
		//if(villager3.interacted == 'done' &&  game.physics.arcade.overlap(p1.sprite, bigBird.sprite, null, null, this)) {
		
		//(bigBird.interacted == 'doneTutorial' || bigBird.interacted == 'readyToLeave')
		if (bigBird.interacted == 'endLevel') {
			timer = 0;
			game.state.start('level_1', true, false);
		} else if(p1.sprite.x < 120 && learned == 'done'){
			bigBird.endTutorial();
		}
		//console.log(bigBird.interacted);


		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP) && (onGround) && learned == 0)
		{
			// instructions.destroy();
			// instructionsVisual.destroy();
			//instructionsVisual2.destroy();
			// bubble.width = 425;
			// instructions = game.add.bitmapText(90, 200, 'myfont', 'Use    to move forward', 48);
			// instructionsVisual = game.add.sprite(175,222,'arrow');
			// instructionsVisual.anchor.set(0.5);
			// instructionsVisual.angle = 90;
			learned = 1;
			timer = 0;
		}
	
		if (timer > 120 && learned == 1)
		{
			instructions.destroy();
			instructionsVisual.destroy();
			bubble.destroy();
			learned = 2;
			timer = 0;
		}
		if (learned == 2 && p1.sprite.x>500) {
			bubble = game.add.sprite(680,185,'textbubble');
			bubble.width = 365;
			bubble.height = 75;
			instructions = game.add.bitmapText(700, 200, 'myfont', 'Use       to interact', 48);
			instructionsVisual = game.add.sprite(765,215,'spacebar');
			learned = 3;
			timer = 0;
		}

		if (villager3.interacted > 0 && learned == 3) {
			instructions.destroy();
			instructionsVisual.destroy();
			bubble.destroy();
			learned = 5;
			timer = 0;
		}

		// if (villager3.interacted == 3 && learned == 4) {
		// 	instructions = game.add.bitmapText(700, 200, 'myfont', '  to agree\n  to decline', 48);
		// 	instructionsVisual = game.add.sprite(690,212,'ykey');
		// 	instructionsVisual2 = game.add.sprite(690,250,'nkey');
		// 	learned = 5;
		// 	timer = 0;
		// }

		if (villager3.interacted == 'no' && learned == 5) {
			instructions.destroy();
			instructionsVisual.destroy();
			//instructionsVisual2.destroy();
			bubble = game.add.sprite(680,185,'textbubble');
			bubble.x = 590;
			bubble.y = 130;
			bubble.width = 320;
			bubble.height = 170;
			instructions = game.add.bitmapText(620, 150, 'myfont', "Don't you want to\nbe helpful?\nTry again!", 48);
			learned = 6;
			timer = 0;
		} else if (villager3.interacted == 'yes' && learned == 5) {
			bubble = game.add.sprite(660,185,'textbubble');
			bubble.width = 280;
			bubble.height = 120;

			bubble.height = 75;
			instructions.destroy();
			instructionsVisual.destroy();
			//instructionsVisual2.destroy();
			instructions = game.add.bitmapText(690, 200, 'myfont', "  Find the", 48);
			instructionsVisual = game.add.sprite(860,208,'chat');
			learned = 7;
			timer = 0;
		}

		if (villager3.interacted == 1 && learned == 6) {
			bubble.destroy();
			instructions.destroy();
			learned = 4;
			timer = 0;
		}



		}
	}
}
