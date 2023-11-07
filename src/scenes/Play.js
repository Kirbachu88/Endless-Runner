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
        this.star = new Star(this, width * 1.25, height / 2, 'star').setOrigin(0, 0).setScale(2);
        this.rock = new Rock(this, width * 2, height - 64, 'rock').setOrigin(0, 0);
        this.rock2 = new Rock(this, width * 8.75, height - 64, 'rock').setOrigin(0, 0);
        this.rock3 = new Rock(this, width * 25, height - 64, 'rock').setOrigin(0, 0);

        this.rocks = this.add.group([this.rock, this.rock2, this.rock3])

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
        this.spaceToRestart = this.add.sprite(width / 2, height / 2, 'spaceToRestart').setAlpha(0)
        this.otherMenus = this.add.sprite(width * 7 / 9, height * 7 / 9, 'otherMenus').setAlpha(0);

        // Background Music
        let bgm = this.sound.add('bgm', { loop: true });
        if (!musicPlaying) {
            bgm.play()
            musicPlaying = true
        }

        this.select = this.sound.add('select')
        this.pickup = this.sound.add('pickup', {volume: 0.5})
        this.hit = this.sound.add('hit', {volume: 0.4})

        // Populating an object with Left/Right/Up/Down keys, Shift, and Space
        cursors = this.input.keyboard.createCursorKeys()
        keys = this.input.keyboard.addKeys('W,A,S,D,C,M')
        escKey = this.input.keyboard.addKey('ESC')

        escKey.on('down', () => {
            this.select.play()
            this.scene.start('menuScene')
        }, this)

        // GAME OVER flag
        this.gameOver = false

        this.score = 0

        // Collisions
        this.physics.add.collider(this.player, this.star, (player, star) => {
            this.star.disableBody()
            if (!this.gameOver) {
                this.pickup.play()
                this.score++
                this.star.reset()
            }
            this.star.enableBody()
        })

        this.physics.add.collider(this.player.hitbox, this.rocks, (player, rock) => {
            if (!this.gameOver) this.hit.play()
            this.gameOver = true
            
            this.player.body.setCollideWorldBounds(false)
            this.player.body.setGravityX(0)
        })

        // I hate adding text in Phaser 3
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: width / 2
        }
        this.scoreText = this.add.text(width / 2, 5, this.score, textConfig)
    }

    update() {
        // Run (Literally)
        if (!this.gameOver) {
            this.player.update()    // Update Player sprite
            this.star.update()
            this.rock.update()
            this.rock2.update()
            this.rock3.update()

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
            this.spaceToRestart.setAlpha(1)
            this.otherMenus.setAlpha(1)

            if (cursors.space.isDown) {
                titleAlpha = 0
                this.select.play();
                this.scene.restart()
            }
            if (keys.C.isDown) {
                this.select.play();
                this.scene.start('creditsScene');
            }
            if (keys.M.isDown) {
                this.select.play();
                this.scene.start('manualScene');
            }

            this.clouds.tilePositionX += 0.25;
            this.clouds.tilePositionY += 0.00625;
        }

        this.title.setAlpha(this.title.alpha - 0.0125)
        this.scoreText.text = "Score: " + this.score
        console.log(this.score)
    }

    someFunction(arg) {

    }
}