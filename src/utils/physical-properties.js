const PHYSICAL_PROPERTIES = {
    enemies: {
        onHurt: {
            gravity: {
                y: 20,
                x: 10,
            },
            velocity: {
                x: 25,
            },
        },
        diameter: 40,
        poolSize: 50,
    },
    player: {
        diameter: 20,
    },
    bullet: {
        speed: 600,
        fireRate: 100,
        poolSize: 2,
    }
};

export {PHYSICAL_PROPERTIES};
