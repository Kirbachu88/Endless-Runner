// Star prefab
class Star extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.play({key: 'Shine', repeat: -1})
        this.counter = 0
    }
    
    update() {
        this.body.position.x -= 1

        if (this.body.position.x < -this.body.width) {
            this.reset()
        }
    }

    reset() {
        this.setAlpha(1)
        this.body.setVelocity(0)
        this.body.position.x = (width * 1.125) + (this.counter / width)
        this.body.position.y = Phaser.Math.Between(height / 2, height - this.body.height)
        this.counter++
    }
}