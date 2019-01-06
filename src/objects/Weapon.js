import {GraphicUtil} from '../utils/graphic-util';

class Weapon {

	constructor(game){
		this.game = game;
        this.weaponPool = 2;
        this.weaponGraphicName = GraphicUtil.bulletGraphicName;
	}

	spawn(spriteToTrack) {
        this.weapon = this.game.add.weapon(this.weaponPool, this.weaponGraphicName);
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        this.weapon.bulletSpeed = 600;
        this.weapon.fireRate = 100;
        this.weapon.trackSprite(spriteToTrack, 0, 0);
        
        return this.weapon;
    }
    
    addControls() {
        this.game.input.onDown.add(this.fire, this);
        this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR).onDown.add(this.fire, this);
    }

    fire() {
        this.weapon.fire();
    }

}

export default Weapon;
