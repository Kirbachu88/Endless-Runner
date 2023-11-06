// Star prefab
class Star extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.play({key: 'Shine', repeat: -1})
    }
    
    update() {
        this.body.position.x -= 1

        if (this.body.position.x < -this.body.width) {
            this.body.position.x = width
        }
    }

    reset() {
        this.body.setVelocity(0)
        this.body.position.x = width
    }
}