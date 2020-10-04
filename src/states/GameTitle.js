import Phaser from 'phaser';

class GameTitle extends Phaser.State {
/*  create() {
// boilerplate for create method

  } */

  startGame() {
    this.game.state.start('Main');
  }
}

export default GameTitle;
