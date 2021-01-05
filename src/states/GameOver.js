import Phaser from 'phaser';

class GameOver extends Phaser.State {
  create() {
    const style = {
      align: 'center',
    };

    const text = this.game.add.text(
      this.game.world.centerX,
      this.game.world.centerY,
      `Game Over\nYour score: ${this.game.finalScore}\n\nTap to continue`,
      style,
    );

    text.anchor.set(0.5);
    this.game.input.onDown.add(this.restartGame, this);
  }

  restartGame() {
    this.game.state.start('Main');
  }
}

export default GameOver;
