import Phaser from 'phaser';

class GameOver extends Phaser.State {

	create() {
		// this.restartGame();
		const style = {
            align: "center"
        };
        
        const text = this.game.add.text(
			this.game.width / 2,
			this.game.height / 2,
			"Game Over\n\n Tap to continue",
			style
        );
        
		text.anchor.set(0.5);
		this.game.input.onDown.add(this.restartGame, this);
	}

	restartGame() {
		this.game.state.start("Main");
	}

}

export default GameOver;
