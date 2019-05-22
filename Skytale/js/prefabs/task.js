//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
// task.js
// task prefab

function task() {
	var sprite;
	var villager;
}

task.prototype = {
	spawn: function(game, x, y, sprite, villager) {
		this.sprite = game.add.sprite(x,y,sprite);
		game.physics.arcade.enable(this.sprite);
		this.villager = villager;
	}
}