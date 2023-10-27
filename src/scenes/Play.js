// Capitalized because scenes in Phaser are classes
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load images/tile sprites
        this.load.image('moon', './assets/moon.png');
    }

    create() {
        // Place moon sprite
        this.moon = this.add.image(0, 0, 'moon').setOrigin(0, 0);
    }

    update() {
        // Run (Literally)
    }

    someFunction(arg) {

    }
}