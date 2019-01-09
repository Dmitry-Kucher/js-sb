import 'p2';
import 'pixi';
import Phaser from 'phaser';

import Boot from './states/Boot';
import Preload from './states/Preload';
import GameTitle from './states/GameTitle';
import Main from './states/Main';
import GameOver from './states/GameOver';
import {PHYSICAL_PROPERTIES} from './utils/physical-properties';

class Game extends Phaser.Game {

	constructor() {

		super(...arguments);
		this.PHYSICAL_PROPERTIES = PHYSICAL_PROPERTIES;

		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
		this.state.add('GameTitle', GameTitle, false);
		this.state.add('Main', Main, false);
		this.state.add('GameOver', GameOver, false);

		this.state.start('Boot');
	}

}

const width = PHYSICAL_PROPERTIES.world.dimensions.width;
const height = PHYSICAL_PROPERTIES.world.dimensions.height;
new Game(width * window.devicePixelRatio, height * window.devicePixelRatio, Phaser.AUTO);
