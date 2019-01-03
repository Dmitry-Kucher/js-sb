import 'p2';
import 'pixi';
import Phaser from 'phaser';

import Boot from './states/Boot';
import Preload from './states/Preload';
import GameTitle from './states/GameTitle';
import Main from './states/Main';
import GameOver from './states/GameOver';

class Game extends Phaser.Game {

	constructor() {

		super(...arguments);

		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
		this.state.add('GameTitle', GameTitle, false);
		this.state.add('Main', Main, false);
		this.state.add('GameOver', GameOver, false);

		this.state.start('Boot');
	}

}

const width = 320;
const height = 480;
new Game(width * window.devicePixelRatio, height * window.devicePixelRatio, Phaser.AUTO);