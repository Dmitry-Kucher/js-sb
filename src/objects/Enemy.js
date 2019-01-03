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

	spawn() {
		return GraphicUtil.initCircleItem(this.enemyProps, this.game);
	}
}

export default Enemy;