// Capitalized because scenes in Phaser are classes
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load images/tile sprites
        this.load.image('moon', './assets/moon.png');

        this.load.spritesheet('player', './assets/player.png', {
            frameWidth: 128
        })
    }

    create() {
        // Place moon sprite
        this.moon = this.add.image(0, 0, 'moon').setOrigin(0, 0);

        // Add player (p1)
        this.player = new Player(this, width / 2, height / 2, 'player').setOrigin(0, 0);
        this.player.body.setCollideWorldBounds(true)
        this.player.setGravityY(500);

        // Populating an object with Left/Right/Up/Down keys, Shift, and Space
        cursors = this.input.keyboard.createCursorKeys()

        // GAME OVER flag
        this.gameOver = false;
    }

    update() {
        // Run (Literally)
        if (!this.gameOver) {
            this.player.update();     // Update Player sprite
        }
    }

    someFunction(arg) {

    }
}