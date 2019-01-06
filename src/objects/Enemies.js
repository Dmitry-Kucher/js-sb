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
        this.initEnemiesGroup();
    }
    
    initEnemiesGroup() {
        const enemy = GraphicUtil.getCircleItem(this.enemyProps, this.game);
        const enemyTexture = enemy.generateTexture();

        this.enemiesGroup = this.game.add.group();
        this.enemiesGroup.enableBody = true;
        this.enemiesGroup.createMultiple(30, enemyTexture);
    }

	spawn(spawnProperties) {
        const properties = {
            gravity: {x: 0, y: 10},
            velocity: {x: 0, y: 0},
            position: {x: this.enemyProps.x, y: this.enemyProps.y},
        };
        Object.assign(properties, spawnProperties);
        let enemy = this.enemiesGroup.getFirstDead();
        
        enemy.reset(properties.position.x, properties.position.y);
		enemy.body.gravity.y = properties.gravity.y;
		enemy.body.velocity.x = properties.velocity.x;
        enemy.body.allowGravity = true;
        enemy.checkWorldBounds = true;
	    enemy.outOfBoundsKill = true;
		return enemy;
    }
    
    onCollide(hurtEnemy) {
        const gravity = {
            y: this.game.PHYSICAL_PROPERTIES.enemies.onHurt.gravity.y,
        };
        const positionX = hurtEnemy.x;
        const positionY = hurtEnemy.y - this.game.PHYSICAL_PROPERTIES.enemies.diameter - 20;
        const position = {x: positionX, y: positionY};
        const spawnLeft = {
            gravity,
            position,
            velocity: {
                x: -this.game.PHYSICAL_PROPERTIES.enemies.onHurt.velocity.x,
            }
        };
        const spawnRight = {
            gravity,
            position,
            velocity: {
                x: this.game.PHYSICAL_PROPERTIES.enemies.onHurt.velocity.x,
            }
        };

        this.spawn(spawnLeft);
        this.spawn(spawnRight);
    }
}

export default Enemies;
