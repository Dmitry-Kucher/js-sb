import Phaser from 'phaser';
import {GraphicUtil} from '../utils/graphic-util';

class Player {
	constructor(game){
        this.game = game;
		const x = this.game.world.centerX - this.game.PHYSICAL_PROPERTIES.player.diameter / 2;
        const y = this.game.height - this.game.PHYSICAL_PROPERTIES.player.diameter / 2;
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
                width: GraphicUtil.adjustPixelToDevice(2),
                color: 0xffffff,
            },
        };
        this.movementValue = this.game.PHYSICAL_PROPERTIES.player.movementValue;
	}

	spawn() {
        const player = GraphicUtil.getCircleItem(this.playerProps, this.game);
        const playerTexture = player.generateTexture();
        this.playerSprite = this.game.add.sprite(this.playerProps.x, this.playerProps.y, playerTexture);
        this.game.physics.arcade.enable(this.playerSprite);
        this.playerSprite.body.collideWorldBounds = true;
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

    initGyroScopeControl() {
        gyro.frequency = 10;
        gyro.startTracking((data) => {
            if (data.gamma > 10) {
                this.moveRight();
            } else if(data.gamma < -10) {
                this.moveLeft();
            } else {
                this.stopMovement();
            }
            // player.body.velocity.x += o.gamma / 20;
            // player.body.velocity.y += o.beta / 20;
        });
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
