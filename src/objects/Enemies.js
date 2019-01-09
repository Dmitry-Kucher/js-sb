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
        this.poolSize = this.game.PHYSICAL_PROPERTIES.enemies.poolSize;
        this.initEnemiesGroup();
    }
    
    initEnemiesGroup() {
        const enemy = GraphicUtil.getCircleItem(this.enemyProps, this.game);
        const enemyTexture = enemy.generateTexture();

        this.enemiesGroup = this.game.add.group();
        this.enemiesGroup.enableBody = true;
        this.enemiesGroup.createMultiple(this.poolSize, enemyTexture);
    }

	spawn(spawnProperties) {
        const properties = {
            gravity: {x: 0, y: 20},
            velocity: {x: 0, y: 0},
            position: {x: this.enemyProps.x, y: this.enemyProps.y},
        };
        Object.assign(properties, spawnProperties);
        let enemy = this.enemiesGroup.getFirstDead();
        
        enemy.reset(properties.position.x, properties.position.y);
        if(this.enemiesGroup.countLiving() > 1) {
            enemy.body.toRestore = {
                velocity: {x: properties.velocity.x},
                gravity: {y: properties.gravity.y},
            };
            enemy.body.gravity.y = 0;
            enemy.body.velocity.x = 0;
            const angle = properties.velocity.x > 0 ? 315 : 225;
            enemy.body.moveTo(500, this.game.PHYSICAL_PROPERTIES.enemies.diameter, angle);
        } else {
            enemy.body.velocity.x = properties.velocity.x;
            enemy.body.gravity.y = properties.gravity.y;
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
        };
        const spawnRight = {
            gravity,
            position,
            velocity: {
                x: this.game.PHYSICAL_PROPERTIES.enemies.onHurt.velocity.x,
            },
        };

        const left = this.spawn(spawnLeft);
        const right = this.spawn(spawnRight);
        // left.body.moveTo(500, this.game.PHYSICAL_PROPERTIES.enemies.diameter, 225);
        left.body.onMoveComplete.add(this.restorePhysics, this, 0, left);

        // right.body.moveTo(500, this.game.PHYSICAL_PROPERTIES.enemies.diameter, 315);
        right.body.onMoveComplete.add(this.restorePhysics, this, 0, right);
    }

    restorePhysics(enemyForRestoration) {
        enemyForRestoration.body.velocity.x = enemyForRestoration.body.toRestore.velocity.x;
		enemyForRestoration.body.gravity.y = enemyForRestoration.body.toRestore.gravity.y;
    }
}

export default Enemies;
