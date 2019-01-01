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
        this.game.load.image('bullet', 'shmup-bullet.png');
    }

    initCircleItem(itemProps) {
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
        const x = this.game.width / 2;
        const y = 40;
        const enemyProps = {
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
                diameter: 10,
            },
            lineStyle: {
                width: 2,
                color: 0xffffff,
                alpha: 0.5,
            },
        };
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
        this.initBullet();
        this.weapon = this.game.add.weapon(2, 'bullet');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 100;


        this.initEnemy();
        // this.placeEnemy(this.enemy.width, 50);
        this.weapon.trackSprite(this.player, 0, 0);

        this.initScore();
        this.updateScore();

        this.game.physics.enable([this.enemy, this.weapon.bullets], Phaser.Physics.ARCADE, true);
    }

    update() {
        this.game.physics.arcade.overlap(this.weapon.bullets, this.enemy, this.collisionHandler, null, this);
    }

    collisionHandler() {
        this.enemyTween.stop();
        this.score++;
        this.placeEnemy();
        const playerX = this.game.width / 2;
        const playerY = this.game.height / 5 * 4;
        this.resetBullet();
        this.placePlayer(playerX, playerY);
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
        this.enemy.x = x;
        this.enemy.y = y;
        this.enemyTween = this.game.add.tween(this.enemy)
            .to({
                y: this.game.rnd.between(this.enemy.width * 2, this.game.height / 4 * 3 - this.player.width / 2)
            }, 200, "Linear", true);
        this.enemyTween.onComplete.add(this.moveEnemy, this);
    }

    die() {
        localStorage.setItem("topboomdots", Math.max(this.score, this.topScore));
        this.game.state.start("Play");
    }

    fire() {
        this.weapon.fire();
    }

    moveEnemy() {
        this.enemyTween = this.game.add
            .tween(this.enemy);
        const movementProperties = {
            x: this.game.world.width - this.enemy.width / 2,
        };
        const movementVelocity = 500 + this.game.rnd.between(0, 2500);
        const ease = Phaser.Easing.Cubic.InOut;
        const autoStart = true;
        const delay = 0;
        const repeat = 50;
        const yoyo = true;

        this.enemyTween.to(
            movementProperties,
            movementVelocity,
            ease,
            autoStart,
            delay,
            repeat,
            yoyo,
        );
    }
}

window.onload = function () {
    const game = new GameProcess(320, 480, Phaser.AUTO);
    const play = new GameState();

    game.state.add("Play", play);
    game.state.start("Play");
};
