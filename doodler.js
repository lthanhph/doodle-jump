class Doodler {
    
    x;
    y;
    width;
    height;
    speed;
    falling;
    jumping;
    turningRight;
    turningLeft;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 100;
        this.left = this.x;
        this.right = this.x + this.width;
        this.setGravity();
    }

    isFalling() {
        if (this.falling) return true;
        return false;
    }

    fall() {
        this.speed = 0;
        this.falling = setInterval(() => {
            this.y += this.speed;
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
        this.speed = MAX_SPEED;
        this.jumping = setInterval(() => {
            if (this.speed > 0) {
                this.y -= this.speed;
            } 
            if (this.speed == 0) {
                this.stopJump();
                this.fall();
            }
        }, GAME.LOOP_NUMB);
    }

    setGravity() {
        setInterval(() => {
            if (this.isJumping() && this.speed > 0) this.speed--;
            if (this.isFalling() && this.speed < MAX_SPEED) this.speed++;
        }, GRAVITY_TIME);
    }

    stopJump() {
        clearInterval(this.jumping);
        this.jumping = null;
    }

    turnLeft() {
        if (this.turningRight) this.stopTurnRight();
        if (!this.turningLeft) {
            this.turningLeft = setInterval(() => { this.x -= TURN_SPEED }, GAME.LOOP_NUMB);
        }
    }

    stopTurnLeft() {
        clearInterval(this.turningLeft);
        this.turningLeft = null;
    }

    turnRight() {
        if (this.turningLeft) this.stopTurnLeft();
        if (!this.turningRight) {
            this.turningRight = setInterval(() => { this.x += TURN_SPEED }, GAME.LOOP_NUMB);
        }
    }

    stopTurnRight() {
        clearInterval(this.turningRight);
        this.turningRight = null;
    }

    hit(platform) {
        var bottom = this.y + this.height;
        var right = this.x + this.width;
        var left = this.x;
        var p = platform; // shorthand
        if (bottom >= p.top && bottom < p.bottom && right > p.left && left < p.right) {
            return true;
        }
        return false;
    }


    draw() {
        if (GAME.CONTEXT) {
            GAME.CONTEXT.fillStyle = 'green';
            GAME.CONTEXT.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}