// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // Add object to existing scene
        /*  
            Because we're extending Phaser's base Sprite class,
            it cannot add our sprite to the scene automatically.
            Instead, we have to manually add `this`, 
            whose current context is the Player object,
            to the scene that we pass in as a parameter.
        */
        scene.add.existing(this);                       // Add to existing, displayList, updateList
        scene.physics.add.existing(this)
        
        this.isJumping = false;
        this.velocity = 350;
        // this.sfxJump = scene.sound.add('jump')          // Add SFX
    }
    
    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0) // Roll up a new variable every single frame

        // Left/Right movement
        if (cursors.left.isDown && this.x >= 0) {
            playerVector.x = -1
        } else if (cursors.right.isDown && this.x <= game.config.width - this.width) {
            playerVector.x = 1
        }

        // Jump button
        if ((cursors.space.isDown || cursors.up.isDown) && !this.isJumping) {
            this.isJumping = true;
            // this.sfxJump.play(); // Play SFX
            console.log("[Cool Vertical Action Here]")
        }

        playerVector.normalize() // Does all that math for us

        this.setVelocity(this.velocity * playerVector.x, this.velocity * playerVector.y)
    }

    // Reset Player
    reset() {
        this.isFiring = false;
        this.y = game.config.height;
    }
}