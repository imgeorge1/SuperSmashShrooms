import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene1 from './scenes/GameScene1.js';
import GameScene2 from './scenes/GameScene2.js';
import GameScene3 from './scenes/GameScene3.js';

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 },
          debug: false,
        },
      },
    scene: [BootScene, PreloadScene, GameScene1, GameScene2, GameScene3]
};

const game = new Phaser.Game(config);
