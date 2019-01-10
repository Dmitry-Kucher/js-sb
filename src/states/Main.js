import Phaser from 'phaser';
import Player from '../objects/Player';
import Weapon from '../objects/Weapon';
import Enemies from '../objects/Enemies';
import Score from '../objects/Score';
import {GraphicUtil} from "../utils/graphic-util";

class Main extends Phaser.State {

	create() {
		this.game.stage.backgroundColor = '#cecece';

		const playerWrapper = new Player(this.game);
		const player = playerWrapper.spawn();
		playerWrapper.addControls();

		const weaponWrapper = new Weapon(this.game);
		this.weapon = weaponWrapper.spawn(player);
		weaponWrapper.addControls();

		this.enemyWrapper = new Enemies(this.game);
		this.enemies = this.enemyWrapper.enemiesGroup;
		this.enemy = this.enemyWrapper.spawn();

		this.game.physics.enable([this.enemies, this.weapon.bullets], Phaser.Physics.ARCADE, true);
		this.game.physics.arcade.gravity.y = this.game.PHYSICAL_PROPERTIES.world.gravity.y;

		this.score = new Score(this.game);
	}

	update() {
		// this.score.incrementScore();
		this.game.physics.arcade.overlap(this.weapon.bullets, this.enemies, this.collisionHandler, null, this);
		if(!this.enemies.countLiving()) {
			this.game.finalScore = this.score.score;
			this.game.state.start("GameOver");
		}
	}

	render() {
		this.game.debug.text('Living: ' + this.enemies.countLiving() + '   Dead: ' + this.enemies.countDead(), GraphicUtil.adjustPixelToDevice(32), GraphicUtil.adjustPixelToDevice(64));
	}

	collisionHandler(bullet, enemy) {
		if(bullet.alive && enemy.alive){ // keep condition to trigger collision handler only once
			bullet.kill();
			enemy.destroy();
			this.enemyWrapper.onCollide(enemy);
			const incrementValue = (this.enemies.countLiving() - 1) * this.game.PHYSICAL_PROPERTIES.score.incrementValue;
			this.score.createScoreAnimation(enemy.x, enemy.y, incrementValue);
			// this.score.incrementScore(incrementValue);
		}
	}

}

export default Main;
