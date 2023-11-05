// Capitalized because scenes in Phaser are classes
class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
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