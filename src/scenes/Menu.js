// Capitalized because scenes in Phaser are classes
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        // Load images/tile sprites
        this.load.image('stars', './assets/Stars.png');
        this.load.image('title', './assets/Title.png');
        this.load.image('moon', './assets/moon.png');
        this.load.image('clouds', './assets/Clouds.png');
        this.load.image('trees', './assets/Trees.png');
        this.load.image('backgrass', './assets/Back Grass.png');
        this.load.image('foregrass', './assets/Foie Gras.png');
        this.load.image('spaceToStart', './assets/SpaceToStart.png');
        this.load.image('spaceToRestart', './assets/SpaceToRestart.png');
        this.load.image('otherMenus', './assets/Other Menus.png');
        this.load.image('manual', './assets/Manual.png');

        this.load.spritesheet('rock', './assets/Rocks.png', {frameWidth: 128});

        // Load Aseprite Sheets
        this.load.aseprite('player', './assets/player.png', './assets/player.json');
        this.load.aseprite('star', './assets/star.png', './assets/Star.json');

        // Load audio
        this.load.audio('select', './assets/select_wood.wav');
        this.load.audio('howl', './assets/howl.wav');
        this.load.audio('jump', './assets/jump_heavy.wav');
        this.load.audio('thud', './assets/thud.wav');
        this.load.audio('pickup', './assets/pickup_clink.wav');
        this.load.audio('hit', './assets/impact_light.wav');
        this.load.audio('bgm', './assets/Loop+Volume Edit - 11 HoliznaCC0 - Dance Till You Die.mp3');
    }

    create() {
        // Place titlescreen sprite
        // this.titlescreen = this.add.image(0, 0, 'titlescreen').setOrigin(0, 0);

        // Place background tile sprite
        this.stars = this.add.tileSprite(0, 0, width, height, 'stars').setOrigin(0, 0);

        // Place moon sprite
        this.moon = this.add.image(0, 0, 'moon').setOrigin(0, 0);

        // Place background tile sprite
        this.clouds = this.add.tileSprite(0, 0, width, height, 'clouds').setOrigin(0, 0);
        this.trees = this.add.tileSprite(0, 0, width, height, 'trees').setOrigin(0, 0);
        this.backgrass = this.add.tileSprite(0, 0, width, height, 'backgrass').setOrigin(0, 0);

        // Create Animations
        this.anims.createFromAseprite('player');
        this.anims.createFromAseprite('star');

        // Add player (p1)
        this.player = this.add.sprite(width / 8, height, 'player', 15).setOrigin(0, 0.75)

        // Place fore grass tile sprite
        this.foregrass = this.add.tileSprite(0, 0, width, height, 'foregrass').setOrigin(0, 0);

        this.title = this.add.sprite(width / 15, height / 15, 'title').setOrigin(0, 0).setAlpha(0);
        this.spaceToStart = this.add.sprite(width / 2, height / 2, 'spaceToStart').setAlpha(0);
        this.otherMenus = this.add.sprite(width * 7 / 9, height * 7 / 9, 'otherMenus').setAlpha(0);
        this.select = this.sound.add('select')
        this.sfxHowl = this.sound.add('howl', { volume: 0.5})

        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys('C, M')
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.sceneTransition = false
        this.transition = 0

        spaceBar.on('down', () => {
            if (!this.sceneTransition) {
                this.spaceToStart.setAlpha(0)
                this.otherMenus.setAlpha(0)
                this.sceneTransition = true
                if (!this.sfxHowl.isPlaying) {
                    this.sfxHowl.play()
                    this.player.play('Start')
                }
                this.transition = setTimeout(() => {
                    titleAlpha = this.title.alpha
                    cloudsPos = {
                        x: this.clouds.tilePositionX,
                        y: this.clouds.tilePositionY
                    }
                    this.scene.start('playScene');
                }, 3000)
            }
            spaceBar.on('down', () => {
                clearTimeout(this.transition);
                titleAlpha = this.title.alpha
                cloudsPos = {
                    x: this.clouds.tilePositionX,
                    y: this.clouds.tilePositionY
                }
                this.scene.start('playScene');
            }, this)
        }, this)
    }

    update() {
        this.title.setAlpha(this.title.alpha + 0.0125)
        if(this.title.alpha >= 1) {
            this.time.delayedCall(1000, () => {
                if(!this.sceneTransition) {
                    this.spaceToStart.setAlpha(1)
                    this.time.delayedCall(1000, () => {
                        if(!this.sceneTransition) {
                            this.otherMenus.setAlpha(1)
                        }
                    })
                }
            })
        }

        this.clouds.tilePositionX += 0.25;
        this.clouds.tilePositionY += 0.00625;

        if (keys.C.isDown) {
            this.select.play();
            clearTimeout(this.transition);
            this.scene.start('creditsScene');
        }
        if (keys.M.isDown) {
            this.select.play();
            clearTimeout(this.transition);
            this.scene.start('manualScene');
        }
    }
}