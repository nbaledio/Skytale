//Group 6: Nathan Baledio, Sophia Santos, Kaylin Wang
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
	spawn: function(game, karmaAmt) {
		//create the container for karma
		this.boxSprite = game.add.sprite(X_POS, Y_POS, 'container');
		this.boxSprite.fixedToCamera = true;

		//create the tokens for karma
		karmaLevel = game.add.group();
		karmaLevel.fixedToCamera = true;
		for(i = 0; i < karmaAmt; i++) {
			karmaLevel.create(X_POS+(KARMA_WIDTH*i), Y_POS, 'karma');
		}

		//keep track of this number throughout levels
		this.numKarma = karmaAmt;
	},
	update: function(balance) {
		//update the karma according to balance
		//must help one good and one bad to make balance = 0
		if (balance != 0 && this.numKarma > 0) { this.numKarma--; }
		else if (this.numKarma < 5) { this.numKarma++; }

		//redraw the karma bar
		karmaLevel.removeAll(true);
		for(i = 0; i < this.numKarma; i++) {
			karmaLevel.create(X_POS+(KARMA_WIDTH*i), Y_POS, 'karma');
		}
	}
}