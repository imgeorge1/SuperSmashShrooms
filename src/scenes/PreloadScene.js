export default class PreloadScene extends Phaser.Scene {
  constructor() {
      super('PreloadScene');
  }

  preload() {
    this.load.image("1p", "src/assets/1p.png")
    this.load.image("2p", "src/assets/2p.png")
    this.load.image("3p", "src/assets/3p.png")
    //
    this.load.image("sky", "src/assets/background/sky.png");
    this.load.image("sun", "src/assets/background/sun.png")
    this.load.image("island", "src/assets/island.png")
    this.load.image("lilisland1", "src/assets/miniisland1.png")
    this.load.image("lilisland2", "src/assets/miniisland2.png")
  }

  create() {
    this.add.image(600, 350, "sky").setScale(1.5)
    this.add.image(400, 500, "1p")
    this.add.image(600, 500, "2p")
    this.add.image(800, 500, "3p")

    this.add.text(600, 300, "How many players?", { fontSize: '48px', fill: '#000000' }).setOrigin(0.5, 0.5)
    
    // this.scene.start("GameScene1")

    }
}