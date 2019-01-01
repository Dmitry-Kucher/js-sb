import {GraphicUtil} from "./utils/graphic-util";

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

        this.enemy = GraphicUtil.initCircleItem(enemyProps, this.game);
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

        this.player = GraphicUtil.initCircleItem(playerProps, this.game);
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
        this.weapon = this.game.add.weapon(2, 'bullet');
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 100;
        this.weapon.trackSprite(this.player, 0, 0);

        this.initEnemy();

        this.initScore();

        this.game.physics.enable([this.enemy, this.weapon.bullets], Phaser.Physics.ARCADE, true);
        this.enemy.body.gravity.y = 10;
        this.enemy.body.allowGravity = true;
        this.enemy.checkWorldBounds = true;
        this.enemy.events.onOutOfBounds.add(this.reset, this);

        this.updateScore();
    }

    reset() {
        const x = this.game.width / 2;
        const y = 40;
        this.enemy.x = x;
        this.enemy.y = y;
        this.enemy.body.gravity.y = 10;
    }

    update() {
        this.game.physics.arcade.overlap(this.weapon.bullets, this.enemy, this.collisionHandler, null, this);
    }

    collisionHandler(enemy, bullet) {
        bullet.kill();
        this.score++;
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

    die() {
        localStorage.setItem("topboomdots", Math.max(this.score, this.topScore));
        this.game.state.start("Play");
    }

    fire() {
        this.weapon.fire();
    }
}

window.onload = function () {
    const game = new GameProcess(320, 480, Phaser.AUTO);
    const play = new GameState();

    game.state.add("Play", play);
    game.state.start("Play");
};
