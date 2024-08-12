export default class PreloadScene extends Phaser.Scene {
  constructor() {
      super('PreloadScene');
  }

  preload() {
    this.load.image("1pBTN", "src/assets/1p.png")
    this.load.image("2pBTN", "src/assets/2p.png")
    this.load.image("3pBTN", "src/assets/3p.png")
    //
    this.load.image("sky", "src/assets/background/sky.png");
    this.load.image("sun", "src/assets/background/sun.png")
    this.load.image("island", "src/assets/island.png")
    this.load.image("lilisland1", "src/assets/miniisland1.png")
    this.load.image("lilisland2", "src/assets/miniisland2.png")
    //enemies
    this.load.image("ball", "src/assets/enemies/bowlingBall.png");
    this.load.image("coconut", "src/assets/enemies/coconut.png");
    this.load.image("rock", "src/assets/enemies/rock.png");
    this.load.image("watermelon", "src/assets/enemies/watermelon.png");

    //player
    this.load.spritesheet("p1", "src/assets/blewit.png", {
      frameWidth: 61,
      frameHeight: 28,
    });
    this.load.spritesheet("p2", "src/assets/tansy.png", {
      frameWidth: 61,
      frameHeight: 28,
    });
    this.load.spritesheet("p3", "src/assets/fancie.png", {
      frameWidth: 61,
      frameHeight: 28,
    });
  }

  create() {
    this.add.image(600, 350, "sky").setScale(1.5)
    const btnp1 = this.add.image(400, 500, "1pBTN")
    const btnp2 = this.add.image(600, 500, "2pBTN")
    const btnp3 = this.add.image(800, 500, "3pBTN")
    this.add.text(600, 300, "How many players?", { fontSize: '48px', fill: '#000000' }).setOrigin(0.5, 0.5)

    btnp1.setInteractive()
    btnp2.setInteractive()
    btnp3.setInteractive()
    btnp1.on("pointerdown", ()=>{
      this.scene.start("GameScene1")
    })
    btnp2.on("pointerdown", ()=>{
      this.scene.start("GameScene2")
    })
    btnp3.on("pointerdown", ()=>{
      this.scene.start("GameScene3")
    })
  

    }
}