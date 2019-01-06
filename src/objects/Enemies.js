import Phaser from 'phaser';
import {GraphicUtil} from '../utils/graphic-util';

class Enemies {
	constructor(game){
		this.game = game;
		const x = this.game.width / 2 - 20;
        const y = 40;
		this.enemyProps = {
            x,
            y,
            color: 0x555555,
            circle: {
                x: 0,
                y: 0,
                diameter: 40,
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

	spawn({gravity = {x: 0, y: 10}, velocity = {x: 0, y: 0}} = {}) {
        let enemy = this.enemiesGroup.getFirstDead();
        
        enemy.reset(this.enemyProps.x, this.enemyProps.y);
		enemy.body.gravity.y = gravity.y;
		enemy.body.velocity.x = velocity.x;
        enemy.body.allowGravity = true;
        enemy.checkWorldBounds = true;
	    enemy.outOfBoundsKill = true;
		return enemy;
    }
    
    onCollide() {
        const spawnLeft = {
            gravity: {
                y: this.game.PHYSICAL_PROPERTIES.enemies.onHurt.gravity.y,
            },
            velocity: {
                x: -this.game.PHYSICAL_PROPERTIES.enemies.onHurt.velocity.x,
            }
        };
        const spawnRight = {
            gravity: {
                y: this.game.PHYSICAL_PROPERTIES.enemies.onHurt.gravity.y,
            },
            velocity: {
                x: this.game.PHYSICAL_PROPERTIES.enemies.onHurt.velocity.x,
            }
        };

        this.spawn(spawnLeft);
        this.spawn(spawnRight);
    }
}

export default Enemies;
