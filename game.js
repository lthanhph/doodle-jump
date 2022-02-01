class Game {

    game;
    loop;
    stage;
    doodler;
    platforms;

    constructor() {
        this.game = document.getElementById('game');
        this.game.width = GAME.WIDTH;
        this.game.height = GAME.HEIGHT;
        GAME.CONTEXT = this.game.getContext('2d');

        this.stage = new Stage();
        var middle = Math.floor(this.game.width / 2) - 25;
        this.doodler = new Doodler(middle, 0);
        this.setPlatforms();

        this.start();
    }

    start() {
        this.startLoop();
        this.doodler.fall();    
        this.listenEvent();
    }

    startLoop() {
        this.loop = setInterval(() => {
            this.stage.draw();
            this.doodler.draw();
            this.drawPlatforms();
            this.hitPlatformCheck();
         }, GAME.LOOP_NUMB);
    }

    listenEvent() {
        document.body.addEventListener('keydown', (event) => {
            event.preventDefault();
            switch (event.code) {
                case 'ArrowRight': this.doodler.turnRight();
                    break;
                case 'ArrowLeft': this.doodler.turnLeft();
                    break;
            }
        });
    }

    setPlatforms() {
        this.platforms = [];
        var max = 15;
        var min = 10;
        var platforms_numb = Math.floor(Math.random() * (max - min + 1)) + min;
        for (var i = 0; i <= platforms_numb; i++) {
            var platform = this.createPlatform();
            this.platforms.push(platform);
        }
    }

    createPlatform() {
        var x = Math.floor(Math.random() * (GAME.WIDTH - 80) );
        var y = Math.floor(Math.random() * (GAME.HEIGHT - 20) );
        var newPlatform = new Platform(x, y);

        // duplicate check
        if (this.platforms.length > 0) {
            var duplicate = false;
            this.platforms.forEach((platform) => {
                if (newPlatform.duplicate(platform)) {
                    duplicate = true;
                }
            }); 
            if (duplicate) newPlatform = this.createPlatform();
        }

        return newPlatform;
    }
 
    drawPlatforms() {
        this.platforms.forEach((platform) => { platform.draw() });
    }

    hitPlatform() {
        var hit = false;
        this.platforms.forEach((platform) => { 
            if (this.doodler.isFalling() && this.doodler.hit(platform)) {
                hit = true; 
            }
        })
        return hit;
    }

    hitPlatformCheck() {
        if (this.hitPlatform()) this.doodler.jump();
    }
}

var game = new Game();