class Doodler {

    x;
    y;
    width;
    height;
    falling;
    jumping;
    turningRight;
    turningLeft;
    direction;
    nose;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.nose = 40;
        this.direction = 'right';
    }

    isFalling() {
        if (this.falling) return true;
        return false;
    }

    fall() {
        GAME.SPEED = 0;
        this.falling = setInterval(() => {
            this.y += GAME.SPEED;
        }, GAME.LOOP_NUMB);
    }

    stopFall() {
        clearInterval(this.falling);
        this.falling = null;
    }

    isJumping() {
        if (this.jumping) return true;
        return false;
    }

    jump() {
        this.stopFall();
        if (this.jumping) this.stopJump();
        GAME.SPEED = MAX_SPEED;
        this.jumping = setInterval(() => {
            if (GAME.SPEED > 0 && !this.toMiddleOfScreen()) {
                this.y -= GAME.SPEED;
            }
            if (GAME.SPEED == 0) {
                this.stopJump();
                this.fall();
            }
        }, GAME.LOOP_NUMB);
    }

    stopJump() {
        clearInterval(this.jumping);
        this.jumping = null;
    }

    turnLeft() {
        if (this.turningRight) this.stopTurnRight();
        if (!this.turningLeft) {
            this.direction = 'left';
            this.turningLeft = setInterval(() => {
                this.x -= TURN_SPEED;
                if (this.goOutLeft()) this.goInsideRight();
            }, GAME.LOOP_NUMB);
        }
    }

    stopTurnLeft() {
        clearInterval(this.turningLeft);
        this.turningLeft = null;
    }

    turnRight() {
        if (this.turningLeft) this.stopTurnLeft();
        if (!this.turningRight) {
            this.direction = 'right';
            this.turningRight = setInterval(() => {
                this.x += TURN_SPEED;
                if (this.goOutRight()) this.goInsideLeft();
            }, GAME.LOOP_NUMB);
        }
    }

    stopTurnRight() {
        clearInterval(this.turningRight);
        this.turningRight = null;
    }

    goOutRight() {
        var left = this.x;
        if (left >= GAME.WIDTH) return true;
        return false;
    }

    goInsideLeft() {
        this.x = - this.width;
    }

    goOutLeft() {
        var right = this.x + this.width;
        if (right <= 0) return true;
        return false;
    }

    goInsideRight() {
        this.x = GAME.WIDTH;
    }

    hit(platform) {
        var bottom = this.y + this.height;
        if (this.direction == 'left') {
            var right = this.x + this.width;
            var left = this.x + this.nose;
        }
        if (this.direction == 'right') {
            var right = this.x + this.width - this.nose;
            var left = this.x;
        }
        var p = platform; // shorthand
        if (bottom >= p.top && bottom < p.bottom && right > p.left && left < p.right) {
            return true;
        }
        return false;
    }

    toMiddleOfScreen() {
        var bottom = this.y + this.height;
        if (bottom <= GAME.HEIGHT / 2) return true;
        return false;
    }


    draw() {
        if (GAME.CONTEXT) {
            if (this.direction == 'right') var doodler = document.getElementById('doodler-right');
            if (this.direction == 'left') var doodler = document.getElementById('doodler-left');
            GAME.CONTEXT.drawImage(doodler, this.x, this.y, this.width, this.height);
        }
    }
}