// Capitalized because scenes in Phaser are classes
class Manual extends Phaser.Scene {
    constructor() {
        super("manualScene");
    }
    
    preload() {

    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();

        this.input.keyboard.on('keydown', () => {this.scene.start('menuScene')}, this)
    }

    update() {
        if (cursors.space.isDown) {
            this.scene.start('menuScene');
        }
    }
}