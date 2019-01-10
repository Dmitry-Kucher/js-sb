import {GraphicUtil} from "./graphic-util";

const PHYSICAL_PROPERTIES = {
    enemies: {
        onHurt: {
            gravity: {
                y: GraphicUtil.adjustPixelToDevice(20),
                x:  GraphicUtil.adjustPixelToDevice(10),
            },
            velocity: {
                x:  GraphicUtil.adjustPixelToDevice(50),
            },
        },
        diameter:  GraphicUtil.adjustPixelToDevice(30),
    },
    player: {
        diameter:  GraphicUtil.adjustPixelToDevice(20),
        movementValue: GraphicUtil.adjustPixelToDevice(5),
    },
    bullet: {
        speed:  GraphicUtil.adjustPixelToDevice(200),
        fireRate: 100,
        poolSize: 2,
    },
    world: {
        gravity: {
            y:  GraphicUtil.adjustPixelToDevice(20),
        },
        dimensions: {
            width:  GraphicUtil.adjustPixelToDevice(640),
            height:  GraphicUtil.adjustPixelToDevice(800),
        },
    },
    score: {
        position: {
            x:  GraphicUtil.adjustPixelToDevice(600),
            y:  GraphicUtil.adjustPixelToDevice(0),
        },
        incrementValue: 5,
    },
};

export {PHYSICAL_PROPERTIES};
