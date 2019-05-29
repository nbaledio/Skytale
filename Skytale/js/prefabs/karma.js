//karma.js
//a prefab for our karma indicator to be used across all levels

var X_POS = 640;
var Y_POS = 32;
var KARMA_WIDTH = 24;

function karma() {
	var boxSprite;
	var numKarma;
}

karma.prototype = {
	spawn: function(game) {
		this.boxSprite = game.add.sprite(X_POS, Y_POS, 'container');
		this.boxSprite.fixedToCamera = true;

		karmaLevel = game.add.group();
		karmaLevel.fixedToCamera = true;

		karmaLevel.create(X_POS, Y_POS, 'karma');
		karmaLevel.create(X_POS+KARMA_WIDTH, Y_POS, 'karma');
		karmaLevel.create(X_POS+(KARMA_WIDTH*2), Y_POS, 'karma');
		karmaLevel.create(X_POS+(KARMA_WIDTH*3), Y_POS, 'karma');
		karmaLevel.create(X_POS+(KARMA_WIDTH*4), Y_POS, 'karma');

		this.numKarma = 5;
	},
	update: function(balance) {
		if (balance != 0) { this.numKarma--; }
		else if (this.numKarma < 5) { this.numKarma++; }

		//console.log(this.numKarma);

		karmaLevel.removeAll(true);
		for(i = 0; i < this.numKarma; i++) {
			karmaLevel.create(X_POS+(KARMA_WIDTH*i), Y_POS, 'karma');
		}
	}
}