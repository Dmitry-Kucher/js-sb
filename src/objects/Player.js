import Phaser from 'phaser';
import {GraphicUtil} from '../utils/graphic-util';

class Player {
	constructor(game){
		this.game = game;
		const x = this.game.width / 2 - this.game.PHYSICAL_PROPERTIES.player.diameter / 2;
        const y = this.game.height / 5 * 4;
		this.playerProps = {
            x,
            y,
            color: 0x555555,
            circle: {
                x: 0,
                y: 0,
                diameter: this.game.PHYSICAL_PROPERTIES.player.diameter,
            },
            lineStyle: {
                width: 2,
                color: 0xffffff,
                alpha: 0.5,
            },
        };
        this.movementValue = 5;
	}

	spawn() {
        const player = GraphicUtil.getCircleItem(this.playerProps, this.game);
        const playerTexture = player.generateTexture();
        this.playerSprite = this.game.add.sprite(this.playerProps.x, this.playerProps.y, playerTexture);
        this.game.physics.arcade.enable(this.playerSprite);
        this.playerSprite.body.collideWorldBounds = true;
        this.playerSprite.body.bounce.set(0);
		return this.playerSprite;
    }
    
    addControls() {
        const leftKey = this.game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
        const rightKey = this.game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);

        leftKey.onHoldContext = this;
        leftKey.onHoldCallback = this.moveLeft;
        rightKey.onHoldContext = this;
        rightKey.onHoldCallback = this.moveRight;
        leftKey.onUp.add(this.stopMovement, this);
        rightKey.onUp.add(this.stopMovement, this);
    }

    moveLeft() {
        this.move(-this.movementValue);
    }

    moveRight() {
        this.move(this.movementValue);
    }

    move(velocityValue) {
        this.playerSprite.body.velocity.x += velocityValue;
    }

    stopMovement() {
        this.playerSprite.body.velocity.x = 0;
    }

}

export default Player;
