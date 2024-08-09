export default class PreloadScene extends Phaser.Scene {
  constructor() {
      super('PreloadScene');
  }

  preload() {
      this.load.image("sky", "src/assets/background/sky.png");
      this.load.image("sun", "src/assets/background/sun.png")
      this.load.image("island", "src/assets/island.png")
      this.load.image("lilisland1", "src/assets/miniisland1.png")
      this.load.image("lilisland2", "src/assets/miniisland2.png")
  }

  create() {
    this.add.text(600, 100, "How many players?").setOrigin(0.5, 0.5)
      // this.scene.start("GameScene1")
  }
}