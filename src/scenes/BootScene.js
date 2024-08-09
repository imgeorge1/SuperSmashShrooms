export default class BootScene extends Phaser.Scene {
  constructor() {
      super('BootScene');
  }

  preload() {
      this.load.image("sky", "src/assets/background/sky.png")
      this.load.image("logo", "src/assets/SuperSmashShroomsLogo.png")
  }

  create() {
    this.add.image(600, 350, "sky").setScale(1.5)
    this.add.image(600, 200, "logo").setScale(.4)
    
    const bootText = this.add.text(600, 600, "Press any key to continue", { fontSize: '32px', fill: '#000000' }).setOrigin(0.5, 0.5)
    
    this.tweens.add({
      targets: bootText,
      alpha: 0, // Fade out to alpha 0
      ease: 'Linear',
      duration: 500,
      yoyo: true, // Return to the original state
      repeat: -1 // Repeat indefinitely
  });

    document.addEventListener('keydown', () => {
      this.scene.start('PreloadScene');
    });
  }
}