//main.js:
//Creates game and manages states in the StateManager

// be strict
'use strict';

//Variables
var width = 800;
var height = 450;

//Game
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser');

// add states to StateManager
game.state.add('test_environment', test_environment);
game.state.add('test_environment2', test_environment2);
game.state.start('test_environment');
