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
		villager3.setText('Find me one of those chat bubbles');

		bubble = game.add.sprite(65,185,'textbubble');
		bubble.width = 280;
		bubble.height = 75;

		instructions = game.add.bitmapText(90, 200, 'myfont', 'Use    to jump', 48);
		instructionsVisual = game.add.sprite(160,212,'arrow');
		instructionsVisual2 = game.add.sprite(160,212,'arrow');

		p1 = new player();
		p1.spawn(game,110,330,'dude');
		p1.sprite.scale.setTo(.9,.9);
		p1.addAnimations('left', [0, 1, 2, 5], 6, true);
		p1.addAnimations('right', [3, 8, 4, 7], 6, true);

		//Focus camera on player
		game.camera.follow(p1.sprite,Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

		//Enable controls
		cursors = game.input.keyboard.createCursorKeys();
		
	},
	update: function() {

		timer++;

		if (timer > 30 && timer%70 == 5) {
			instructions.visible = !instructions.visible;
			instructionsVisual.visible = !instructionsVisual.visible;
			instructionsVisual2.visible = !instructionsVisual2.visible;
		}

		villager3.update(p1);
		if (villager3.interacted == 'yes' && villager3.timer == 59) {
			task = new task();
			task.spawn(game, 1560, 148, 'chat', villager3);
			timer = 0;
			//console.log('hewwo');
		}
		if (game.physics.arcade.overlap(p1.sprite, task.sprite, finishTask, null, this)) {
			// if task is completed, update the villager instance and overall balance
			//balance = villager3.complete(balance, p1);
			bubble.destroy();
			instructions.destroy();
			instructionsVisual.destroy();
			bubble = game.add.sprite(970,180,'textbubble');
			bubble.width = 590;
			bubble.height = 130;
			instructions = game.add.bitmapText(1000, 200, 'myfont', 'Thank you!\nReturn to the statue to continue', 48);
			timer = 0;
		}

		//Variables to check if player is on platform or ground
		var onPlatform = game.physics.arcade.collide(p1.sprite, platformgroup);
		var onGround = game.physics.arcade.collide(p1.sprite, groundgroup);
		
		//Enable player controls
		p1.controls(onGround,onPlatform);
		
		//  Enables player to fall on platforms
		game.physics.arcade.collide(p1.sprite, platformgroup);
		
		//Enables villagers to fall on platforms
		game.physics.arcade.collide(villagergroup, platformgroup);
		

		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)  && ( onGround) && learned == 0)
		{
			instructions.destroy();
			instructionsVisual.destroy();
			instructionsVisual2.destroy();
			bubble.width = 425;
			instructions = game.add.bitmapText(90, 200, 'myfont', 'Use    to move forward', 48);
			instructionsVisual = game.add.sprite(175,222,'arrow');
			instructionsVisual.anchor.set(0.5);
			instructionsVisual.angle = 90;
			learned = 1;
			timer = 0;
		}
		if (cursors.right.isDown && learned == 1)
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
			learned = 4;
			timer = 0;
		}

		if (villager3.interacted == 3 && learned == 4) {
			bubble = game.add.sprite(660,185,'textbubble');
			bubble.width = 280;
			bubble.height = 120;
			instructions = game.add.bitmapText(700, 200, 'myfont', '  to agree\n  to decline', 48);
			instructionsVisual = game.add.sprite(690,212,'ykey');
			instructionsVisual2 = game.add.sprite(690,250,'nkey');
			learned = 5;
			timer = 0;
		}

		if (villager3.interacted == 'no' && learned == 5) {
			instructions.destroy();
			instructionsVisual.destroy();
			instructionsVisual2.destroy();
			bubble.x = 590;
			bubble.y = 130;
			bubble.width = 320;
			bubble.height = 170;
			instructions = game.add.bitmapText(620, 150, 'myfont', "Don't you want to\nbe helpful?\nTry again!", 48);
			learned = 6;
			timer = 0;
		} else if (villager3.interacted == 'yes' && learned == 5) {
			bubble.height = 75;
			instructions.destroy();
			instructionsVisual.destroy();
			instructionsVisual2.destroy();
			instructions = game.add.bitmapText(690, 200, 'myfont', "  Find the", 48);
			instructionsVisual = instructionsVisual = game.add.sprite(860,208,'chat');
			learned = 7;
			timer = 0;
		}

		if (villager3.interacted == 1 && learned == 6) {
			bubble.destroy();
			instructions.destroy();
			learned = 4;
			timer = 0;
		}


		//  Enables player to fall on platforms
		game.physics.arcade.collide(p1.sprite, platformgroup);
	}
}
// helper function for when task is done
function finishTask(p1, task){
	task.kill();
}