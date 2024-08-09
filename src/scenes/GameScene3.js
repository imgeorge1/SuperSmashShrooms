export default class GameScene3 extends Phaser.Scene {
  constructor() {
      super('GameScene3');
  }

  create() {
      //bg
      this.add.image(600, 350, "sky").setScale(1.5);
      this.add.image(600, 100, "sun").setScale(0.1);
      //platforms
      this.add.image(600, 550, "island");
      this.add.image(250, 450, "lilisland1");
      this.add.image(1000, 500, "lilisland2").flipX = true;
      

      this.add.text(600, 350, "3 players")
  }

  update() {
  }
}