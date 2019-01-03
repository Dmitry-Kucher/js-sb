import Phaser from 'phaser';

class Preload extends Phaser.State {

	preload() {
		this.game.load.image('bullet', 'assets/shmup-bullet.png');
	}

	create() {
		//NOTE: Change to GameTitle if required
		this.game.state.start("Main");
	}

}

export default Preload;
