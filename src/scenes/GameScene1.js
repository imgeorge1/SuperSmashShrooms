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
    this.boostFall
    this.boost
    
    // Add background music
    this.music = this.sound.add("themeSong", {volume: 0.25});
    this.music.loop = true;
    this.music.play();

    // Background
    this.add.image(600, 350, "sky").setScale(1.5);
    this.add.image(600, 100, "sun").setScale(0.15);

    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(600, 550, "island").refreshBody();
    this.platforms.create(250, 460, "lilisland1").refreshBody();
    this.platforms.create(1000, 500, "lilisland2").refreshBody().flipX = true;

    // Player
    this.player1 = this.physics.add.sprite(600, 450, "p1");
    this.physics.add.collider(this.player1, this.platforms);
    this.player1.setBounce(0.1);
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
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });

    // Call the spawn function repeatedly
    this.time.addEvent({
      delay: 400, // Time between each spawn
      callback: this.spawnEnemy, // Reference to the function
      callbackScope: this,
      loop: true
    });
    //player1 and enemy collisions
    this.physics.add.collider(this.player1, this.enemy, this.hitEnemy, null, this);
    this.physics.add.collider(this.hitbox2, this.enemy, this.hitEnemy, null, this);

    //boost code
    this.boost = this.physics.add.group()
    this.boostFall = ["star", "star1"]
    
    this.time.addEvent({
      delay: 10000, // Time between each spawn
      callback: this.spawnBoost, // Reference to the function
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.player1, this.boost, this.hitBoost, null, this);
    this.physics.add.collider(this.hitbox2, this.boost, this.hitBoost, null, this);
    this.physics.add.collider(this.platforms, this.boost);

  }

  hitEnemy() {
    const hurt = this.sound.add("hurt");
    hurt.play();
    this.score = 0;
    
    this.time.delayedCall(100, () => {
      this.music.stop(); // Only stop the music
      this.scene.start("PreloadScene");
    });
  }

  // Function to spawn enemies
  spawnEnemy() {
    const x = Phaser.Math.Between(20, 1180);
    const texture = Phaser.Math.RND.pick(this.fallingItems);
    const enemy = this.enemy.create(x, 0, texture);
    
    // Ensure the body is available before setting the circular hitbox
    enemy.setCircle(15); // Adjust the radius to fit your needs

    // Set a random angular velocity for rotation
    const rotationSpeed = Phaser.Math.Between(-200, 200); // Adjust the range as needed
    enemy.setAngularVelocity(rotationSpeed);

    this.score += 1;
    this.scoreText.setText("Score: " + this.score);
  }


  spawnBoost(){
    const x = Phaser.Math.Between(20, 1180);
    const texture = Phaser.Math.RND.pick(this.boostFall);
    const boost = this.boost.create(x, 0, texture);
  

    this.score += 1;
    this.scoreText.setText("Score: " + this.score);
  }
  hitBoost(player, boost) {
    this.score += 100;
    this.scoreText.setText("Score: " + this.score);

    boost.destroy(); // Destroy the boost that was hit
}

  update() {
    // Ensure hitbox2 follows player1 exactly
    this.hitbox2.setPosition(this.player1.x, this.player1.y);

    // Input handling and animations
    if (this.keys.A.isDown) {
      this.hitbox2.setVelocityX(-180)
      this.player1.setVelocityX(-180);
      this.player1.anims.play('left', true);
    } else if (this.keys.D.isDown) {
      this.player1.setVelocityX(180);
      this.hitbox2.setVelocityX(180)
      this.player1.anims.play('right', true);
    } else {
      this.hitbox2.setVelocityX(0)
      this.player1.setVelocityX(0);
      this.player1.anims.play('turn');
    }

    if (this.keys.W.isDown && this.player1.body.touching.down) {
      const jump = this.sound.add("jump");
      jump.play();
      this.hitbox2.setVelocityY(-220)
      this.player1.setVelocityY(-200);
    } else if (this.keys.S.isDown && !this.player1.body.touching.down) {
      this.hitbox2.setVelocityY(300)
      this.player1.setVelocityY(220);
    } 
    if(this.player1.body.touching.down ){
      this.hitbox2.setVelocityY(0)
    }
  }
}
