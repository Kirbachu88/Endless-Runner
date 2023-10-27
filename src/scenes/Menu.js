// Capitalized because scenes in Phaser are classes
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        // Load images/tile sprites
        this.load.image('titlescreen', './assets/titlescreen.png');
    }

    create() {
        // Place titlescreen sprite
        this.titlescreen = this.add.image(0, 0, 'titlescreen').setOrigin(0, 0);
    
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('playScene');
        }
    }
}