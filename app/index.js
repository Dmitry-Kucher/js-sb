class GameProcess extends Phaser.Game {
    constructor() {
        super(...arguments);
    }
}

class GameState extends Phaser.State {
    constructor(game) {
        super(game);
        this.game = game;
    }

    preload() {

    }

    initCircleItem(itemProps){
        const lineStyle = itemProps.lineStyle;
        const circle = itemProps.circle;
        const graphicObject = this.game.add.graphics(0, 0);
        graphicObject.beginFill(itemProps.color);
        graphicObject.lineStyle(lineStyle.width, lineStyle.color, lineStyle.alpha);
        graphicObject.drawCircle(circle.x, circle.y, circle.diameter);

        const item = this.game.add.sprite(itemProps.x, itemProps.y, null);
        item.addChild(graphicObject);

        return item;
    }

    initEnemy() {
        const enemyProps = {
            x: this.game.width,
            y: 0,
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

        this.enemy = this.initCircleItem(enemyProps);
    }

    initBullet() {
        const bulletProps = {
            x: this.player.x,
            y: this.player.y,
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

        this.bullet = this.initCircleItem(bulletProps);
    }

    initPlayer() {
        const playerProps = {
            x: this.game.world.centerX,
            y: this.game.world.centerY,
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

        this.player = this.initCircleItem(playerProps);
    }

    initScore() {
        this.score = 0;
        this.topScore = localStorage.getItem("topboomdots") === null ? 0 : localStorage.getItem("topboomdots");
        this.scoreText = this.game.add.text(10, 10, "-", {
            font: "bold 16px Arial",
            fill: "#acacac"
        });
    }

    create() {
        this.initPlayer();
        const playerX = this.game.width / 2;
        const playerY = this.game.height / 5 * 4;
        this.placePlayer(playerX, playerY);

        this.initEnemy();
        this.placeEnemy(50, 50);

        this.initScore();
        this.updateScore();

        this.game.physics.enable([this.enemy, this.player], Phaser.Physics.ARCADE);
    }

    update() {
        this.game.physics.arcade.overlap(this.player, this.enemy, this.collisionHandler, null, this);
    }

    collisionHandler() {
        this.enemyTween.stop();
        this.bulletTween.stop();
        this.score++;
        this.placeEnemy();
        this.placePlayer();
        this.updateScore();
    }

    updateScore() {
        this.scoreText.text = `Score: ${this.score} - Best: ${this.topScore}`;
    }

    placePlayer(x, y) {
        this.player.x = x;
        this.player.y = y;
        this.game.input.onDown.add(this.fire, this);
    }

    placeEnemy(x, y) {
        // this.enemy.x = this.game.width - this.enemy.width / 2;
        // this.enemy.y = -this.enemy.width / 2;
        this.enemy.x = x;
        this.enemy.y = y;
        this.enemyEnterTween = this.game.add.tween(this.enemy)
            .to({
            y: this.game.rnd.between(this.enemy.width * 2, this.game.height / 4 * 3 - this.player.width / 2)
        }, 200, "Linear", true);
        this.enemyEnterTween.onComplete.add(this.moveEnemy, this);
    }

    die() {
        localStorage.setItem("topboomdots", Math.max(this.score, this.topScore));
        this.game.state.start("Play");
    }

    fire() {
        this.game.input.onDown.remove(this.fire, this);

        this.initBullet();
        this.bulletTween = this.game.add.tween(this.bullet);
        this.bulletTween.to({
            y: -this.bullet.width
        }, 500, "Linear", true);
        this.bulletTween.onComplete.add(this.die, this);
    }

    moveEnemy() {
        this.enemyTween = this.game.add.tween(this.enemy).to({
            x: this.enemy.width / 2
        }, 500 + this.game.rnd.between(0, 2500), Phaser.Easing.Cubic.InOut, true);
        this.enemyTween.yoyo(true, 0);
        this.enemyTween.repeat(50, 0);
    }
}

window.onload = function() {
    const game = new GameProcess(320, 480, Phaser.AUTO);
    const play = new GameState();

    game.state.add("Play", play);
    game.state.start("Play");
};
