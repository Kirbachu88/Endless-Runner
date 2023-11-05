// Capitalized because scenes in Phaser are classes
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        // Load images/tile sprites
        this.load.image('titlescreen', './assets/titlescreen.png');

        // Load audio
        this.load.audio('thud', './assets/thud.wav');
        this.load.audio('bgm', './assets/Loop+Volume Edit - 11 HoliznaCC0 - Dance Till You Die.mp3');
    }

    create() {
        // Place titlescreen sprite
        this.titlescreen = this.add.image(0, 0, 'titlescreen').setOrigin(0, 0);

        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (cursors.space.isDown) {
            this.scene.start('playScene');
        }
    }
}