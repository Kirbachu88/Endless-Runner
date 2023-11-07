// Capitalized because scenes in Phaser are classes
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {

    }

    create() {
        // Add player (p1)
        this.player = new Player(this, width / 8, height, 'player').setOrigin(0, 0);
        this.star = new Star(this, width / 2, height / 2, 'star').setOrigin(0, 0).setScale(2);
        this.rock = new Rock(this, width * 3 / 4, height - 64, 'rock').setOrigin(0, 0);

        // Place background tile sprites
        this.stars = this.add.tileSprite(0, 0, width, height, 'stars').setOrigin(0, 0).setDepth(-5);

        // Place moon sprite
        this.moon = this.add.image(0, 0, 'moon').setOrigin(0, 0).setDepth(-4);

        // Place foreground tile sprites
        this.clouds = this.add.tileSprite(0, 0, width, height, 'clouds').setOrigin(0, 0).setDepth(-3);
        this.clouds.setTilePosition(cloudsPos.x + 0.5, cloudsPos.y + 0.0125)
        
        this.trees = this.add.tileSprite(0, 0, width, height, 'trees').setOrigin(0, 0).setDepth(-2);
        this.backgrass = this.add.tileSprite(0, 0, width, height, 'backgrass').setOrigin(0, 0).setDepth(-1);
        this.foregrass = this.add.tileSprite(0, 0, width, height, 'foregrass').setOrigin(0, 0).setDepth(1);

        this.title = this.add.sprite(width / 15, height / 15, 'title').setOrigin(0, 0).setAlpha(titleAlpha).setDepth(10);

        // Background Music
        let bgm = this.sound.add('bgm', { loop: true });
        if (!musicPlaying) {
            bgm.play()
            musicPlaying = true
        }

        this.select = this.sound.add('select')

        // Populating an object with Left/Right/Up/Down keys, Shift, and Space
        cursors = this.input.keyboard.createCursorKeys()
        keys = this.input.keyboard.addKeys('W,A,S,D')
        escKey = this.input.keyboard.addKey('ESC')

        escKey.on('down', () => {
            this.select.play()
            this.scene.start('menuScene')
        }, this)

        this.score = 0

        // Collisions
        this.physics.add.collider(this.player, this.star, (player, star) => {
            this.score++
            this.star.reset()

            console.log(this.score)
        })

        this.physics.add.collider(this.player.hitbox, this.rock, (player, rock) => {
            this.gameOver = true
        })
        
        // GAME OVER flag
        this.gameOver = false
    }

    update() {
        // Run (Literally)
        if (!this.gameOver) {
            this.player.update()    // Update Player sprite
            this.star.update()
            this.rock.update()

            // Scrolling Tile Sprites
            this.stars.tilePositionX += 0.25;
            this.stars.tilePositionY += 0.0125;
            this.trees.tilePositionX += 3;
            this.backgrass.tilePositionX += 7;
            this.foregrass.tilePositionX += 8;

            this.clouds.tilePositionX += 0.5;
            this.clouds.tilePositionY += 0.0125;
        } else {
            this.player.stop()
            if (cursors.space.isDown) {
                titleAlpha = 0
                this.scene.restart()
            }

            this.clouds.tilePositionX += 0.25;
            this.clouds.tilePositionY += 0.00625;
        }

        this.title.setAlpha(this.title.alpha - 0.0125)
    }

    someFunction(arg) {

    }
}