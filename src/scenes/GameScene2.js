export default class GameScene2 extends Phaser.Scene {
  constructor() {
    super('GameScene2');

    this.player1dead = false
    this.player2dead = false
  }

  create() {
    // Define class-level variables
    this.platforms;
    this.player1;
    this.keys;
    this.enemy;
    this.fallingItems;
    this.boostFall;
    this.boost;

    // Add background music
    this.music = this.sound.add("themeSong", { volume: 0.25 });
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

    // Player1
    this.player1 = this.physics.add.sprite(570, 450, "p1");
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
    
    // Player2
    this.player2 = this.physics.add.sprite(630, 450, "p2");
    this.physics.add.collider(this.player2, this.platforms);
    this.player2.setBounce(0.1);
    this.player2.setCollideWorldBounds(false);
    this.player2.body.setSize(15, 28);
    this.player2.body.setOffset(23, -1);

    // Create an invisible sprite to act as the second hitbox
    this.hitbox3 = this.physics.add.sprite(this.player2.x, this.player2.y, null);
    this.hitbox3.body.setSize(50, 10);
    this.hitbox3.body.setOffset(-10, 5);
    this.hitbox3.body.allowGravity = false;
    this.hitbox3.body.setImmovable(true);
    this.hitbox3.visible = false;

    // Collide the secondary hitbox with platforms
    this.physics.add.collider(this.hitbox3, this.platforms);
    this.physics.add.collider(this.hitbox2, this.platforms);

    // Input handling for WASD and arrow keys
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      UP: Phaser.Input.Keyboard.KeyCodes.UP,
      LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
      DOWN: Phaser.Input.Keyboard.KeyCodes.DOWN,
      RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT
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

    // Define Animations for player2
    this.anims.create({
      key: 'left2',
      frames: this.anims.generateFrameNumbers('p2', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn2',
      frames: [{ key: 'p2', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right2',
      frames: this.anims.generateFrameNumbers('p2', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    // Enemies
    this.enemy = this.physics.add.group();
    this.fallingItems = ["ball", "coconut", "rock", "watermelon"];

    // Call the spawn function repeatedly
    this.time.addEvent({
      delay: 400, // Time between each spawn
      callback: this.spawnEnemy, // Reference to the function
      callbackScope: this,
      loop: true
    });

    // Player1 and enemy collisions
    this.physics.add.collider(this.player1, this.enemy, this.hitEnemy, null, this);
    this.physics.add.collider(this.hitbox2, this.enemy, this.hitEnemy, null, this);
    // player2 and enemy collisions
    this.physics.add.collider(this.player2, this.enemy, this.hitEnemy2, null, this);
    this.physics.add.collider(this.hitbox3, this.enemy, this.hitEnemy2, null, this);
    // player1 and player2 collisions
    this.physics.add.collider(this.player1, this.player2);
    this.physics.add.collider(this.hitbox2, this.player2);
    this.physics.add.collider(this.hitbox3, this.player1);
  }

//player1
  hitEnemy(player, enemy) {
    const hurt = this.sound.add("hurt");
    hurt.play();
    this.score = 0;
    this.player1dead = true
    this.physics.pause()

    // Add the image at the player's position
    const powImage = this.add.image(this.player1.x, this.player1.y, "pow").setScale(1.5);

    // Set a timed event to remove the image after 200 milliseconds
    this.time.delayedCall(200, () => {
        powImage.destroy(); // Remove the image
    });

    // Hide player
    this.player1.setVisible(false);
    this.player1.body.enable = false; // Disable physics
    this.player1.setCollideWorldBounds(false); // Disable collisions

    // Optionally, you can also disable the second hitbox
    this.hitbox2.setVisible(false);
    this.hitbox2.body.enable = false;

    this.time.delayedCall(1200, () => {
      this.music.stop(); // Only stop the music
      this.scene.start("PreloadScene");
      this.player1dead = false
      this.player2dead = false
    });
  }
  //player2 
  hitEnemy2(player, enemy) {
    const hurt = this.sound.add("hurt");
    hurt.play();
    this.score = 0;
    this.player2dead = true
    this.physics.pause()

    // Add the image at the player's position
    const powImage = this.add.image(this.player2.x, this.player2.y, "pow").setScale(1.5);

    // Set a timed event to remove the image after 200 milliseconds
    this.time.delayedCall(200, () => {
        powImage.destroy(); // Remove the image
    });

    // Hide player
    this.player2.setVisible(false);
    this.player2.body.enable = false; // Disable physics
    this.player2.setCollideWorldBounds(false); // Disable collisions

    // Optionally, you can also disable the second hitbox
    this.hitbox3.setVisible(false);
    this.hitbox3.body.enable = false;

    this.time.delayedCall(1200, () => {
      this.music.stop(); // Only stop the music
      this.scene.start("PreloadScene");
      this.player1dead = false
      this.player2dead = false
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
  }

  update() {
    // Ensure hitbox2 follows player1 exactly
    this.hitbox2.setPosition(this.player1.x, this.player1.y);
    // Ensure hitbox3 follows player2 exactly
    this.hitbox3.setPosition(this.player2.x, this.player2.y);

    // Input handling and animations for player 1
    if (this.keys.A.isDown) {
      this.hitbox2.setVelocityX(-180);
      this.player1.setVelocityX(-180);
      this.player1.anims.play('left', true);
    } else if (this.keys.D.isDown) {
      this.hitbox2.setVelocityX(180);
      this.player1.setVelocityX(180);
      this.player1.anims.play('right', true);
    } else {
      this.hitbox2.setVelocityX(0);
      this.player1.setVelocityX(0);
      this.player1.anims.play('turn');
    }

    if (this.keys.W.isDown && this.player1.body.touching.down) {
      const jump = this.sound.add("jump");
      jump.play();
      this.hitbox2.setVelocityY(-220);
      this.player1.setVelocityY(-200);
    } else if (this.keys.S.isDown && !this.player1.body.touching.down) {
      this.hitbox2.setVelocityY(300);
      this.player1.setVelocityY(220);
    }
    if (this.player1.body.touching.down) {
      this.hitbox2.setVelocityY(0);
    }

    // Input handling and animations for player 2
    if (this.keys.LEFT.isDown) {
      this.hitbox3.setVelocityX(-180);
      this.player2.setVelocityX(-180);
      this.player2.anims.play('left2', true);
    } else if (this.keys.RIGHT.isDown) {
      this.hitbox3.setVelocityX(180);
      this.player2.setVelocityX(180);
      this.player2.anims.play('right2', true);
    } else {
      this.hitbox3.setVelocityX(0);
      this.player2.setVelocityX(0);
      this.player2.anims.play('turn2');
    }

    if (this.keys.UP.isDown && this.player2.body.touching.down) {
      const jump = this.sound.add("jump");
      jump.play();
      this.hitbox3.setVelocityY(-220);
      this.player2.setVelocityY(-200);
    } else if (this.keys.DOWN.isDown && !this.player2.body.touching.down) {
      this.hitbox3.setVelocityY(300);
      this.player2.setVelocityY(220);
    }
    if (this.player2.body.touching.down) {
      this.hitbox3.setVelocityY(0);
    }

    if(this.player1dead === true){
      this.add.text(600, 250, "Player2 wins", { fontSize: '32px', fill: '#000000' }).setOrigin(0.5, 0.5)
    }
    if(this.player2dead === true){
      this.add.text(600, 250, "Player1 wins", { fontSize: '32px', fill: '#000000' }).setOrigin(0.5, 0.5)
    }
  }
}
