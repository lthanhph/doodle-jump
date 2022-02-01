class Stage {
    constructor() {

    }

    draw() {
        if (GAME.CONTEXT) {
            GAME.CONTEXT.fillStyle = '#ddd';
            GAME.CONTEXT.fillRect(0, 0, GAME.WIDTH, GAME.HEIGHT);
        }
    }
}