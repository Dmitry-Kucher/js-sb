import Phaser from 'phaser';
import {GraphicUtil} from '../utils/graphic-util';

class Score {
	constructor(game){
		this.game = game;
		this.scorePosition = this.game.PHYSICAL_PROPERTIES.score.position;
        this.score = 0;
        this.scoreBuffer = 0;
        this.createScoreLabel();
	}

	createScoreLabel(){
        const scoreFont = "30px Arial";
        //Create the score label
        this.scoreLabel = this.game.add.text(
            this.scorePosition.x,
            this.scorePosition.y,
            this.score,
            {
                font: scoreFont,
                fill: "#ffffff",
                stroke: "#535353",
                strokeThickness: 4
            }
        ); 
        this.scoreLabel.anchor.setTo(0.5, 0);
        this.scoreLabel.align = 'center';

        //Create a tween to grow / shrink the score label
        this.scoreLabelTween = this.game.add.tween(this.scoreLabel.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);
    }

    incrementScore(incrementValue) {
        this.score += incrementValue;
        this.scoreLabel.text = this.score;
    }

    createScoreAnimation(x, y, incrementValue) {
        const scoreFont = "20px Arial";
        const scoreAnimation = this.game.add.text(
            x,
            y,
            `+${incrementValue}`,
            {
                font: scoreFont,
                fill: "#ffffff",
                stroke: "#535353",
                strokeThickness: 4
            }
        );
        scoreAnimation.anchor.setTo(0.5, 0);
        scoreAnimation.align = 'center';

        //Tween this score label to the total score label
        const scoreTween = this.game.add
                            .tween(scoreAnimation)
                            .to(this.scorePosition, 800, Phaser.Easing.Exponential.In, true);

        scoreTween.onComplete.add(() => {
            scoreAnimation.destroy();
            this.incrementScore(incrementValue);
            this.scoreLabelTween.start();
        }, this);
    }
}

export default Score;
