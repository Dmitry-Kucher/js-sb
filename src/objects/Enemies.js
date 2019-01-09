import Phaser from 'phaser';
import {GraphicUtil} from '../utils/graphic-util';

class Enemies {
	constructor(game){
		this.game = game;
		const x = this.game.width / 2 - this.game.PHYSICAL_PROPERTIES.enemies.diameter / 2;
        const y = this.game.PHYSICAL_PROPERTIES.enemies.diameter;
		this.enemyProps = {
            x,
            y,
            color: 0x555555,
            circle: {
                x: 0,
                y: 0,
                diameter: this.game.PHYSICAL_PROPERTIES.enemies.diameter,
            },
            lineStyle: {
                width: 2,
                color: 0xffffff,
                alpha: 0.5,
            },
        };
        const enemy = GraphicUtil.getCircleItem(this.enemyProps, this.game);
        this.enemyTexture = enemy.generateTexture();
        this.initEnemiesGroup();
    }

    initEnemiesGroup() {
        this.enemiesGroup = this.game.add.group();
        this.enemiesGroup.enableBody = true;
    }

	spawn(spawnProperties) {
        const properties = {
            gravity: {x: 0, y: 20},
            velocity: {x: 0, y: 0},
            position: {x: this.enemyProps.x, y: this.enemyProps.y},
            moveTo: false,
        };
        Object.assign(properties, spawnProperties);
        let enemy = this.enemiesGroup.getFirstDead(true, properties.position.x, properties.position.y, this.enemyTexture);

        if(properties.moveTo) {
            enemy.body.toRestore = {
                velocity: {x: properties.velocity.x},
                gravity: {y: properties.gravity.y},
            };
            const angle = properties.velocity.x > 0 ? 315 : 225;
            enemy.body.moveTo(500, this.game.PHYSICAL_PROPERTIES.enemies.diameter, angle);
        } else {
            enemy.body.velocity.x = properties.velocity.x;
        }
        enemy.checkWorldBounds = true;
	    enemy.outOfBoundsKill = true;
		return enemy;
    }

    onCollide(hurtEnemy) {
        const gravity = {
            y: this.game.PHYSICAL_PROPERTIES.enemies.onHurt.gravity.y,
        };
        const position = {x: hurtEnemy.x, y: hurtEnemy.y};
        const spawnLeft = {
            gravity,
            position,
            velocity: {
                x: -this.game.PHYSICAL_PROPERTIES.enemies.onHurt.velocity.x,
            },
            moveTo: true,
        };
        const spawnRight = {
            gravity,
            position,
            velocity: {
                x: this.game.PHYSICAL_PROPERTIES.enemies.onHurt.velocity.x,
            },
            moveTo: true,
        };

        const left = this.spawn(spawnLeft);
        const right = this.spawn(spawnRight);
        left.body.onMoveComplete.addOnce(this.restorePhysics, this, 0, left);
        right.body.onMoveComplete.addOnce(this.restorePhysics, this, 0, right);
    }

    restorePhysics(enemyForRestoration) {
        enemyForRestoration.body.velocity.x = enemyForRestoration.body.toRestore.velocity.x;
    }
}

export default Enemies;
