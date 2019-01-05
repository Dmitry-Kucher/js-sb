import {GraphicUtil} from '../utils/graphic-util';

class Enemies {
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
        this.initEnemiesGroup();
    }
    
    initEnemiesGroup() {
        const enemy = GraphicUtil.getCircleItem(this.enemyProps, this.game);
        const enemyTexture = enemy.generateTexture();

        this.enemiesGroup = this.game.add.group();
        this.enemiesGroup.enableBody = true;
        this.enemiesGroup.createMultiple(10, enemyTexture);
    }

	spawn({gravity = {x: 0, y: 10}} = {}) {
        let enemy = this.enemiesGroup.getFirstDead();
        
        // this.game.physics.arcade.enable(this.enemy);
        enemy.reset(this.enemyProps.x, this.enemyProps.y);
		enemy.body.gravity = gravity;
        enemy.body.allowGravity = true;
        enemy.checkWorldBounds = true;
        enemy.events.onOutOfBounds.add(this.reset, this);
		return enemy;
	}

	reset() {
		this.enemy.x = this.enemyProps.x;
		this.enemy.y = this.enemyProps.y;
		this.enemy.body.velocity.y = 10;
	}
}

export default Enemies;
