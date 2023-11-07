// Rock prefab
class Rock extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.setFrame(Phaser.Math.Between(0, 3))
        this.counter = 0
    }
    
    update() {
        this.body.position.x -= 3 + (Phaser.Math.Between(0, (this.counter / 10)))

        if (this.body.position.x < -this.body.width) {
            this.reset()
        }
    }

    reset() {
        this.setFrame(Phaser.Math.Between(0, 3))
        this.setAlpha(1)
        this.body.setVelocity(0)
        this.body.position.x = (width * 2) - Phaser.Math.Clamp(this.counter / width, 0, width)
        this.body.position.y = Phaser.Math.Between(height - 128, height - 64)
        this.toggleFlipX()
        this.counter++
    }
}