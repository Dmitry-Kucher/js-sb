import {GraphicUtil} from '../utils/graphic-util';

class Enemy {
	constructor(game){
		this.game = game;
		const x = this.game.width / 2;
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
	}

	spawn({gravity = {x: 0, y: 10}} = {}) {
		this.enemy = GraphicUtil.initCircleItem(this.enemyProps, this.game);
		this.game.physics.arcade.enable(this.enemy);
		this.enemy.body.gravity = gravity;
        this.enemy.body.allowGravity = true;
        this.enemy.checkWorldBounds = true;
        this.enemy.events.onOutOfBounds.add(this.reset, this);
		return this.enemy;
	}

	reset() {
		this.enemy.x = this.enemyProps.x;
		this.enemy.y = this.enemyProps.y;
		this.enemy.body.velocity.y = 10;
	}
}

export default Enemy;
