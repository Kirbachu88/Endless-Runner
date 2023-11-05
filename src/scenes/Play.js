// Capitalized because scenes in Phaser are classes
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load images/tile sprites
        this.load.image('stars', './assets/Stars.png');
        this.load.image('moon', './assets/moon.png');
        this.load.image('backgrass', './assets/Back Grass.png');
        this.load.image('foregrass', './assets/Foie Gras.png');

        this.load.spritesheet('player', './assets/player.png', {
            frameWidth: 128
        })
    }

    create() {
        // Place background tile sprite
        this.stars = this.add.tileSprite(0, 0, width, height, 'stars').setOrigin(0, 0);

        // Place moon sprite
        this.moon = this.add.image(0, 0, 'moon').setOrigin(0, 0);

        // Place background tile sprite
        this.backgrass = this.add.tileSprite(0, 0, width, height, 'backgrass').setOrigin(0, 0);

        // Add player (p1)
        this.player = new Player(this, width / 2, height / 2, 'player').setOrigin(0, 0);

        // Place fore grass tile sprite
        this.foregrass = this.add.tileSprite(0, 0, width, height, 'foregrass').setOrigin(0, 0);

        // Populating an object with Left/Right/Up/Down keys, Shift, and Space
        cursors = this.input.keyboard.createCursorKeys()

        // GAME OVER flag
        this.gameOver = false
    }

    update() {
        // Check key input for Restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart(); 
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.stars.tilePositionX += 0.125;
        this.backgrass.tilePositionX += 7;
        this.foregrass.tilePositionX += 8;

        // Run (Literally)
        if (!this.gameOver) {
            this.player.update()    // Update Player sprite
        }
    }

    someFunction(arg) {

    }
}