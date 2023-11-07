// Capitalized because scenes in Phaser are classes
class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    
    preload() {

    }

    create() {
        this.credits = this.add.image(0, 0, 'credits').setOrigin(0, 0);

        this.select = this.sound.add('select')

        cursors = this.input.keyboard.createCursorKeys();
        
        this.input.keyboard.on('keydown', () => {
            this.select.play()
            this.scene.start('menuScene')
        }, this)
    }

    update() {
        if (cursors.space.isDown) {
            this.scene.start('menuScene');
        }
    }
}