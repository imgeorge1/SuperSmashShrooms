export default class GameScene1 extends Phaser.Scene {
  constructor() {
      super('GameScene1');
  }

  
  create() {
    // Define class-level variables
    this.platforms;
    this.player1;
    this.cursors;

    // Background
    this.add.image(600, 350, "sky").setScale(1.5);
    this.add.image(600, 100, "sun").setScale(0.1);

    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(600, 550, "island").refreshBody();
    this.platforms.create(250, 450, "lilisland1").refreshBody();
    this.platforms.create(1000, 500, "lilisland2").refreshBody().flipX = true;

    // Player
    this.player1 = this.physics.add.sprite(600, 350, "p1");
    this.physics.add.collider(this.player1, this.platforms);
    this.player1.setBounce(0.15);
    this.player1.setCollideWorldBounds(false);
    this.player1.body.setSize(53, 20);
    
    // Input handling
    this.cursors = this.input.keyboard.createCursorKeys();

    // Define Animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('p1', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'p1', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('p1', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
  }
  update() {
    if (this.cursors.left.isDown) {
      this.player1.setVelocityX(-160);
      this.player1.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
      this.player1.setVelocityX(160);
      this.player1.anims.play('right', true);
    }
    else {
      this.player1.setVelocityX(0);
      this.player1.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player1.body.touching.down) {
      this.player1.setVelocityY(-200);
    }
  }

  }
