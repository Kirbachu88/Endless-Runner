// Rock prefab
class Rock extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.setFrame(Phaser.Math.Between(0, 3))
    }
    
    update() {
        this.body.position.x -= 5

        if (this.body.position.x < -this.body.width) {
            this.reset()
        }
    }

    reset() {
        this.setFrame(Phaser.Math.Between(0, 3))
        this.setAlpha(1)
        this.body.setVelocity(0)
        this.body.position.x = width
    }
}