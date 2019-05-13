//main.js:
//Creates game and manages states in the StateManager

// be strict
'use strict';

//Variables
var width = 800;
var height = 450;
var style = { font: '24px Comic Sans MS', fill: '#FFF', align: "center" };

//Game
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser');

// add states to StateManager
game.state.add('Menu', Menu);
game.state.add('level_1', level_1);
game.state.add('GameOver', GameOver);

game.state.start('Menu');
