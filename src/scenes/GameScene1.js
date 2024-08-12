export default class GameScene1 extends Phaser.Scene {
  constructor() {
    super('GameScene1');
    this.score = 0;
  }

  create() {
    // Define class-level variables
    this.platforms;
    this.player1;
    this.keys; 
    this.enemy;
    this.scoreText;
    this.fallingItems;

    // Background
    this.add.image(600, 350, "sky").setScale(1.5);
    this.add.image(600, 100, "sun").setScale(0.1);

    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(600, 550, "island").refreshBody();
    this.platforms.create(250, 460, "lilisland1").refreshBody();
    this.platforms.create(1000, 500, "lilisland2").refreshBody().flipX = true;

    // Player
    this.player1 = this.physics.add.sprite(600, 350, "p1");
    this.physics.add.collider(this.player1, this.platforms);
    this.player1.setBounce(0.15);
    this.player1.setCollideWorldBounds(false);
    this.player1.body.setSize(15, 28);
    this.player1.body.setOffset(23, -1);

    // Create an invisible sprite to act as the second hitbox
    this.hitbox2 = this.physics.add.sprite(this.player1.x, this.player1.y, null);
    this.hitbox2.body.setSize(50, 10);
    this.hitbox2.body.setOffset(-10, 5);
    this.hitbox2.body.allowGravity = false;
    this.hitbox2.body.setImmovable(true);
    this.hitbox2.visible = false;

    // Collide the secondary hitbox with platforms
    this.physics.add.collider(this.hitbox2, this.platforms);

    // Input handling for WASD keys
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D
    });

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

    // Enemies
    this.enemy = this.physics.add.group();
    this.fallingItems = ["ball", "coconut", "rock", "watermelon"];

    // Score text
    this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    // Call the spawn function repeatedly
    this.time.addEvent({
      delay: 400, // Time between each spawn
      callback: () => {
        const x = Phaser.Math.Between(20, 1180);
        const texture = Phaser.Math.RND.pick(this.fallingItems);
        this.enemy.create(x, 0, texture);

        this.score += 1;
        this.scoreText.setText("Score: " + this.score);
      },
      callbackScope: this,
      loop: true
    });
  }

  update() {
    // Ensure hitbox2 follows player1 exactly
    this.hitbox2.setPosition(this.player1.x, this.player1.y);

    if (this.keys.A.isDown) {
      this.player1.setVelocityX(-180);
      this.player1.anims.play('left', true);
    } else if (this.keys.D.isDown) {
      this.player1.setVelocityX(180);
      this.player1.anims.play('right', true);
    } else {
      this.player1.setVelocityX(0);
      this.player1.anims.play('turn');
    }

    if (this.keys.W.isDown && this.player1.body.touching.down) {
      this.player1.setVelocityY(-200);
    } else if (this.keys.S.isDown && !this.player1.body.touching.down) {
      this.player1.setVelocityY(200);
    }
  }
}
