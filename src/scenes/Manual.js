// Capitalized because scenes in Phaser are classes
class Manual extends Phaser.Scene {
    constructor() {
        super("manualScene");
    }
    
    preload() {

    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (cursors.space.isDown) {
            this.scene.start('menuScene');
        }
    }
}