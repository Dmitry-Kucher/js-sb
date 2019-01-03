import {GraphicUtil} from '../utils/graphic-util';

class Player {

	constructor(game){
		this.game = game;
		const x = this.game.width / 2;
        const y = this.game.height / 5 * 4;
		this.playerProps = {
            x,
            y,
            color: 0x555555,
            circle: {
                x: 0,
                y: 0,
                diameter: 20,
            },
            lineStyle: {
                width: 2,
                color: 0xffffff,
                alpha: 0.5,
            },
        };
	}

	spawn() {
		GraphicUtil.initCircleItem(this.playerProps, this.game);
	}

}

export default Player;