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
    }
};

export {PHYSICAL_PROPERTIES};
