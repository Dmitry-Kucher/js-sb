import Phaser from 'phaser';
import GraphicUtil from '../utils/graphic-util';

class Preload extends Phaser.State {
  preload() {
    this.game.load.image(GraphicUtil.bulletGraphicName, 'assets/shmup-bullet.png');
  }

  create() {
    // NOTE: Change to GameTitle if required
    this.game.state.start('Main');
  }
}

export default Preload;
