/**********************************************************************************************/
/* Author: Angela Ku
/* Title:  Starbitten Run
/* Time:   40h
/*
/* Creative Tilt:
/*
/* If not the transition from the Menu to Play scene,
/* I am happy I was able to make the jump have varying height,
/* and cause the sprite changes during various points of the jump.
/* Figuring out how to have a separate, more lenient hitbox that was
/* attached to the player was also pretty tricky to figure out.
/* 
/* I drew/animated almost everything in Aseprite, even the Manual and Credits screens.
/* I know I probably should have worked on the actual gameplay first,
/* but adding the art to begin with made testing and debugging much more enjoyable.
/* I appreciate Aseprite even more than before, since it made animating the player
/* and making adjustments afterwards, incredibly easy.
/*
/* Citations
/* - Change Background Color in HTML    - https://blog.hubspot.com/website/change-background-color-html
/* - Center game window                 - https://phaser.discourse.group/t/how-do-i-move-phaser-game-to-the-center-of-a-browser/8577/10
/* - Character prefab with physics      - https://phaser.discourse.group/t/how-to-create-complex-reusable-game-objects/2997
/* - Character jumping                  - https://phasergames.com/how-to-jump-in-phaser-3/
/* - Check character is onFloor         - https://phaser.discourse.group/t/how-to-catch-when-player-hit-the-ground-after-jump/2037
/* - Looping music                      - https://phasertutorials.com/creating-a-phaser-3-template-part-3/
/* - WASD Input                         - https://rexrainbow.github.io/phaser3-rex-notes/docs/site/keyboardevents/
/* - Aseprite sprite atlas              - https://saricden.github.io/aseprite-sprites-in-phaser3-5
/* - setTimeout()                       - https://stackoverflow.com/questions/17883692/how-to-set-time-delay-in-javascript
/* - clearTimeout()                     - https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout
/* - Compound bodies                    - https://codepen.io/samme/pen/ExYGRyo
/* - Web safe fonts                     - https://www.w3schools.com/cssref/css_websafe_fonts.php
/**********************************************************************************************/

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        }
    },
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [ Menu, Credits, Manual, Play ],
}

// Reserve keyboard vars
let cursors, keys, escKey

let game = new Phaser.Game(config)

let { height, width } = game.config // Destructuring an object and assigning its properties to variables

let musicPlaying = false
let titleAlpha = 0
let cloudsPos = {
    x: 0,
    y: 0
}

// Set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// Functions that will be hoisted in JS

// Some initialization function that does some thing
function initFunction() {

}