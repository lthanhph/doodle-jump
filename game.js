class Game {

    game;
    loop;
    stage;
    doodler;
    platforms;
    movingUp;

    constructor() {
        this.game = document.getElementById('game');
        this.game.width = GAME.WIDTH;
        this.game.height = GAME.HEIGHT;
        GAME.CONTEXT = this.game.getContext('2d');

        this.stage = new Stage();
        var middle = Math.floor(this.game.width / 2) - 25;
        this.doodler = new Doodler(middle, GAME.HEIGHT);
        this.createPlatforms(12);
        this.setGravity();

        this.start();
    }

    start() {
        this.startLoop();
        this.doodler.jump();    
        this.listenEvent();
    }

    startLoop() {
        this.loop = setInterval(() => {
            this.stage.draw();
            this.doodler.draw();
            this.drawPlatforms();
            this.hitPlatformCheck();
            this.moveUp();
            this.appendPlatforms(10);
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

    setGravity() {
        setInterval(() => {
            if (this.doodler.isJumping() && GAME.SPEED > 0) GAME.SPEED--;
            if (this.doodler.isFalling() && GAME.SPEED < MAX_SPEED) GAME.SPEED++;
        }, GRAVITY_TIME);
    }

    // setPlatforms(min, max, position) {
    //     if (!this.platforms) this.platforms = [];
    //     // var max = 15;
    //     // var min = 10;
    //     var platforms_numb = Math.floor(Math.random() * (max - min + 1)) + min;
    //     for (var i = 0; i <= platforms_numb; i++) {
    //         var platform = this.createPlatform(position);
    //         this.platforms.push(platform);
    //     }
    // }

    createPlatforms(numb, append = false) {
        if (!this.platforms) this.platforms = [];
        var gap = GAME.HEIGHT / numb;
        if (append) gap = - gap;
        for (var i = 0; i < numb; i++) {
            var x = Math.floor(Math.random() * (GAME.WIDTH - 80)) + 1;
            var y = gap * i == 0 ? gap / 2 : gap * i;
            this.platforms.push(new Platform(x, y));
        }
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

    moveUp() {
        if (this.doodler.toMiddleOfScreen() && !this.movingUp) {
            // this.createPlatforms(5, true);
            // this.appendPlatforms(12);
            this.movingUp = setInterval(() => {
                if (this.doodler.isJumping() && GAME.SPEED > 0) {
                    this.platforms.forEach((platform) => { platform.moveDown() });
                }
                if (this.doodler.isFalling() && GAME.SPEED == 0) {
                    clearInterval(this.movingUp);
                    this.movingUp = null;
                } 
            }, GAME.LOOP_NUMB);
        } 
    }

    appendPlatforms(numb) {
        var platform = this.platforms.filter((platform) => { return platform.y < 0 });
        if (platform.length == 0) {
            var append = true;
            this.createPlatforms(numb, append);
        }
    }
}

var game = new Game();