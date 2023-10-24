/***********************************************/
/* Author: Angela Ku
/* Title:  Endless Runner (WIP)
/* Time:   ?
/*
/* Citations
/* - 
/***********************************************/

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ Menu, Play ],
}

// Reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

let game = new Phaser.Game(config)

// Set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// Functions that will be hoisted in JS

// Some initialization function that does some thing
function initFunction() {

}