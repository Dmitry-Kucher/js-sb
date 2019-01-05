import Phaser from 'phaser';
import Player from '../objects/Player';
import Weapon from '../objects/Weapon';
import Enemies from '../objects/Enemies';

class Main extends Phaser.State {

	create() {
		//Set the games background colour
		this.game.stage.backgroundColor = '#cecece';

		const playerWrapper = new Player(this.game);
		const player = playerWrapper.spawn();

		const weaponWrapper = new Weapon(this.game);
		this.weapon = weaponWrapper.spawn(player);

		this.enemyWrapper = new Enemies(this.game);
		this.enemies = this.enemyWrapper.enemiesGroup;
		this.enemy = this.enemyWrapper.spawn();

		this.game.physics.enable([this.enemies, this.weapon.bullets], Phaser.Physics.ARCADE, true);

		weaponWrapper.addControls();
	}

	update() {
		this.game.physics.arcade.overlap(this.weapon.bullets, this.enemies, this.collisionHandler, null, this);
	}

	collisionHandler(enemy, bullet) {
		enemy.kill();
		bullet.kill();
		this.enemyWrapper.spawn({gravity:{x: -5, y: 10}});
		this.enemyWrapper.spawn({gravity:{x: 5, y: 10}});
	}

}

export default Main;
