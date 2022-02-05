class Game {

    game;
    loop;
    doodler;
    platforms;
    movingUp;
    movingDown;
    score;

    constructor() {
        this.game = document.getElementById('game');
        this.game.width = GAME.WIDTH;
        this.game.height = GAME.HEIGHT;
        GAME.CONTEXT = this.game.getContext('2d');

        var middle = Math.floor(this.game.width / 2) - 25;
        this.doodler = new Doodler(middle, GAME.HEIGHT);

        this.createFirstPlatforms();
        this.setGravity();
        this.score = 0;

        this.start();
    }

    start() {
        this.startLoop();
        this.doodler.jump();    
        this.listenEvent();
    }

    startLoop() {
        this.loop = setInterval(() => {
            this.drawBackground();
            this.drawPlatforms();
            this.doodler.draw();
            this.drawScore();
            this.hitPlatformCheck();
            this.moveUp();
            this.createNextPlatforms(10);
            this.clearOldPlatforms();
            this.gameOverCheck();
         }, GAME.LOOP_NUMB);
    }

    listenEvent() {
        // key board
        document.body.addEventListener('keydown', (event) => {
            event.preventDefault();
            switch (event.code) {
                case 'ArrowRight': this.doodler.turnRight();
                    break;
                case 'ArrowLeft': this.doodler.turnLeft();
                    break;
            }
        });

        // screen orientation
        screen.orientation.addEventListener('change', (event) => {
            document.getElementById('angle').innerHTML = screen.orientation.angle;
            // console.log(screen.orientation.angle);
        });
    }

    setGravity() {
        setInterval(() => {
            if (this.doodler.isJumping() && GAME.SPEED > 0) GAME.SPEED--;
            if (this.doodler.isFalling() && GAME.SPEED < MAX_SPEED) GAME.SPEED++;
        }, GRAVITY_TIME);
    }

    drawBackground() {
        if (GAME.CONTEXT) {
            var bg = document.getElementById('background');
            GAME.CONTEXT.drawImage(bg, 0, 0, GAME.WIDTH, GAME.HEIGHT);
        }
    }
 
    drawPlatforms() {
        this.platforms.forEach((platform) => { platform.draw() });
    }

    drawScore() {
        if (GAME.CONTEXT) {
            GAME.CONTEXT.font = '30px ' + FONT;
            GAME.CONTEXT.fillStyle = FONT_COLOR;
            GAME.CONTEXT.fillText(this.score, 10, 40);
        }
    }

    hitPlatform() {
        var hit = false;
        this.platforms.forEach((platform) => { 
            if (this.doodler.isFalling() && this.doodler.hit(platform)) {
                hit = true; 
                this.score++;
            }
        })
        return hit;
    }

    hitPlatformCheck() {
        if (this.hitPlatform()) this.doodler.jump();
    }

    moveUp() {
        if (this.doodler.toMiddleOfScreen() && !this.movingUp) {
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

    createNextPlatforms(numb) {
        var nextPlatforms = this.platforms.filter((platform) => { return platform.y < 0 });
        if (nextPlatforms.length == 0) {
            var gap = - GAME.HEIGHT / numb;
            for (var i = 0; i < numb; i++) {
                var x = Math.floor(Math.random() * (GAME.WIDTH - PLATFORM.WIDTH)) + 1;
                var y = gap * i + gap;
                this.platforms.push(new Platform(x, y));
            }
        }
    }

    createFirstPlatforms() {
        if (!this.platforms) this.platforms = [];
        var numb = 10;
        var gap = 800 / numb;
        for (var i = 0; i < numb; i++) {
            var x = Math.floor(Math.random() * (GAME.WIDTH - PLATFORM.WIDTH)) + 1;
            var y = gap * i + gap;
            this.platforms.push(new Platform(x, y));
        }

        numb = 4
        gap = GAME.WIDTH / numb ;
        for (var j = 0; j < numb; j++) {
            var x = gap * j;
            var y = 900;
            this.platforms.push(new Platform(x, y));
        }
    }

    clearOldPlatforms() {
        // clear platforms
        this.platforms.forEach((platform, index) => { 
            if (platform.y > GAME.HEIGHT) this.platforms.splice(index, 1);
        });
    }

    gameOverCheck() {
        if (this.doodler.y > GAME.HEIGHT) {
            this.gameOver();
        }
    }

    gameOver() {

        // moving down
        if (!this.movingDown) {
            this.movingDown = setInterval(() => {
                this.platforms.forEach((platform, index) => { platform.moveUp() });  
                var platforms = this.platforms.filter((platform) => { return platform. y > 0 }); 
                if (platforms.length == 0) {
                    clearInterval(this.movingDown);
                    this.movingDown = null;
                }
            
            this.drawGameOverText();
            }, GAME.LOOP_NUMB);
        }

    }

    drawGameOverText() {
        // draw game over text
        if (GAME.CONTEXT && !this.movingDown) {
            GAME.CONTEXT.font = '60px ' + FONT;
            GAME.CONTEXT.fillStyle = FONT_COLOR;
            GAME.CONTEXT.textAlign = 'center';
            GAME.CONTEXT.fillText('Game Over', GAME.WIDTH / 2, GAME.HEIGHT / 2);
        }
    }
}

var game = new Game();