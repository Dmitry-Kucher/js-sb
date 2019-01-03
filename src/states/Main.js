import Phaser from 'phaser';
import Player from '../objects/Player';
import Weapon from '../objects/Weapon';
import Enemy from '../objects/Enemy';

class Main extends Phaser.State {

	create() {
		//Set the games background colour
		this.game.stage.backgroundColor = '#cecece';

		const playerWrapper = new Player(this.game);
		const player = playerWrapper.spawn();

		const weaponWrapper = new Weapon(this.game);
		this.weapon = weaponWrapper.spawn(player);

		const enemyWrapper = new Enemy(this.game);
		this.enemy = enemyWrapper.spawn();

		this.game.physics.enable([this.enemy, this.weapon.bullets], Phaser.Physics.ARCADE, true);

		weaponWrapper.addControls();
	}

	update() {
		this.game.physics.arcade.overlap(this.weapon.bullets, this.enemy, this.collisionHandler, null, this);
	}

	collisionHandler(enemy, bullet) {
		bullet.kill();
	}

}

export default Main;
