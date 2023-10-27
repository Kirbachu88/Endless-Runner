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
        // Left/Right movement

        // Jump button
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isJumping) {
            this.isJumping = true;
            // this.sfxJump.play(); // Play SFX
        }
    }

    // Reset Player
    reset() {
        this.isFiring = false;
        this.y = game.config.height;
    }
}