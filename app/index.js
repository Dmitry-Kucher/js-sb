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

    initEnemy() {
        this.enemyGraphic = this.game.add.graphics(0, 0);
        this.enemyGraphic.beginFill(0x555555);
        this.enemyGraphic.lineStyle(2, 0xffffff, 0.5);
        this.enemyGraphic.drawCircle(0, 0, 40);

        this.enemy = this.game.add.sprite(this.game.width, 0, null);
        this.enemy.addChild(this.enemyGraphic);
    }

    initiPlayer() {
        this.playerGraphic = this.game.add.graphics(0, 0);
        this.playerGraphic.beginFill(0x555555);
        this.playerGraphic.lineStyle(2, 0xffffff, 0.5);
        this.playerGraphic.drawCircle(0, 0, 20);

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, null);
        this.player.addChild(this.playerGraphic);
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
        this.initiPlayer();
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
        this.playerTween.stop();
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
        this.bullet = this.player;
        this.playerTween = this.game.add.tween(this.bullet);
        this.playerTween.to({
            y: -this.player.width
        }, 500, "Linear", true);
        this.playerTween.onComplete.add(this.die, this);
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
