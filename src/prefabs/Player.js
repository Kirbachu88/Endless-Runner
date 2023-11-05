// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // Add object to existing scene
        /*  
            Because we're extending Phaser's base Sprite class,
            it cannot add our sprite to the scene automatically.
            Instead, we have to manually add `this`, 
            whose current context is the Player object,
            to the scene that we pass in as a parameter.
        */
        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)
        
        this.body.setCollideWorldBounds(true)
        this.setGravityX(-3000)
        this.setGravityY(2500)

        // Changing collision box
        this.body.setSize(128, 128).setOffset(64, 64)

        this.MAX_JUMP_POWER = 1.3
        this.power = 0
        this.canJump = false
        this.thud = false
        this.velocity = 200
        this.jumpingVelocity = 300

        // this.sfxJump = scene.sound.add('jump')          // Add SFX
        this.sfxJump = scene.sound.add('jump', { volume: 0.3})  // Jumping
        this.sfxLand = scene.sound.add('thud', { volume: 0.4})  // Landing

        this.play({key: 'Walk', repeat: -1, frameRate: 4})
    }
    
    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0) // Roll up a new variable every single frame

        // Left/Right movement
        if ((cursors.left.isDown || keys.A.isDown) && this.body.x >= 0) {
            playerVector.x = -1
        } else if ((cursors.right.isDown || keys.D.isDown) && this.body.x <= game.config.width) {
            playerVector.x = 1
        }

        // Jump button
        if ((cursors.space.isDown || cursors.up.isDown || keys.W.isDown) && this.canJump) {
            // this.sfxJump.play() // Play SFX
            if (this.power < this.MAX_JUMP_POWER) {
                this.thud = true
                this.power += 0.25 * (this.MAX_JUMP_POWER - this.power) + .001
                // console.log(this.power)
            } else {
                this.canJump = false
            }
            this.velocity = this.jumpingVelocity
            this.setVelocityY(this.power * -500)
        }

        if (this.body.velocity.y > -100 && this.body.velocity.y < 500 && this.body.velocity.y != 0) {
            this.play({key: 'JumpSlow'})
        } else if (this.body.velocity.y < -1) {
            this.play({key: 'JumpUp'})
        } else if (this.body.velocity.y > 0) {
            this.play({key: 'JumpDown'})
        } 

        if((Phaser.Input.Keyboard.JustDown(cursors.space) || Phaser.Input.Keyboard.JustDown(cursors.up) || Phaser.Input.Keyboard.JustDown(keys.W)) && this.canJump) {
            this.sfxJump.play()
        }

        if (!this.canJump && this.body.onFloor()) {
            if (this.thud) {
                this.velocity = 200
                this.play({key: 'Walk', repeat: -1, frameRate: 4})
                this.thud = false
                this.sfxLand.play()
            }
        }

        if (cursors.space.isUp && cursors.up.isUp && keys.W.isUp) {
            this.power = 0
            this.canJump = false

            if (!this.canJump && this.body.onFloor()) {
                this.canJump = true;
            }
        }



        playerVector.normalize() // Does all that math for us

        this.setVelocityX(this.velocity * playerVector.x)
    }

    // Reset Player
    reset() {
        this.isFiring = false
        this.y = game.config.height
    }
}