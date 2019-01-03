import Phaser from 'phaser';
import Player from '../objects/Player';
import Weapon from '../objects/Weapon';

class Main extends Phaser.State {

	create() {
		//Set the games background colour
		this.game.stage.backgroundColor = '#cecece';

		//Enable Arcade Physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		const player = new Player(this.game);
		player.spawn();

		const weapon = new Weapon(this.game);
		weapon.spawn(player);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		weapon.addControls();
	}

	update() {
		
	}

}

export default Main;
