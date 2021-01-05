import Phaser from 'phaser';
import GraphicUtil from '../utils/graphic-util';

class Score {
  constructor(game) {
    this.game = game;
    this.scorePosition = this.game.PHYSICAL_PROPERTIES.score.position;
    this.score = 0;
    this.strokeThickness = GraphicUtil.adjustPixelToDevice(4);
    this.createScoreLabel();
  }

  createScoreLabel() {
    const scoreFont = '30px Arial';
    this.scoreLabel = this.game.add.text(
      this.scorePosition.x,
      this.scorePosition.y,
      this.score,
      {
        font: scoreFont,
        fill: '#ffffff',
        stroke: '#535353',
        strokeThickness: this.strokeThickness,
      },
    );
    this.scoreLabel.anchor.setTo(0.5, 0);
    this.scoreLabel.align = 'center';

    const fontScaling = {
      x: GraphicUtil.adjustPixelToDevice(1.5),
      y: GraphicUtil.adjustPixelToDevice(1.5),
    };
    const fontNormal = {
      x: GraphicUtil.adjustPixelToDevice(1),
      y: GraphicUtil.adjustPixelToDevice(1),
    };
    const animationDuration = 200;
    this.scoreLabelTween = this.game.add
      .tween(this.scoreLabel.scale)
      .to(fontScaling, animationDuration, Phaser.Easing.Linear.In)
      .to(fontNormal, animationDuration, Phaser.Easing.Linear.In);
  }

  incrementScore(incrementValue) {
    this.score += incrementValue;
    this.scoreLabel.text = this.score;
  }

  createScoreAnimation(x, y, incrementValue) {
    const scoreFont = '20px Arial';
    const scoreAnimation = this.game.add.text(
      x,
      y,
      `+${incrementValue}`,
      {
        font: scoreFont,
        fill: '#ffffff',
        stroke: '#535353',
        strokeThickness: this.strokeThickness,
      },
    );
    scoreAnimation.anchor.setTo(0.5, 0.5);
    scoreAnimation.align = 'center';

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
