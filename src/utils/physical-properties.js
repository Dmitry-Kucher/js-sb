const PHYSICAL_PROPERTIES = {
    enemies: {
        onHurt: {
            gravity: {
                y: 20,
                x: 10,
            },
            velocity: {
                x: 50,
            },
        },
        diameter: 30,
    },
    player: {
        diameter: 20,
    },
    bullet: {
        speed: 200,
        fireRate: 100,
        poolSize: 2,
    },
    world: {
        gravity: {
            y: 20,
        },
        dimensions: {
            width: 320,
            height: 480,
        },
    },
    score: {
        position: {
            x: 600,
            y: 0,
        },
        incrementValue: 5,
    },
};

export {PHYSICAL_PROPERTIES};
