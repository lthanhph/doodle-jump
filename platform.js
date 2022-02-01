class Platform {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 20;

        this.top = this.y;
        this.bottom = this.y + this.height;
        this.left = this.x;
        this.right = this.x + this.width;
    }

    duplicate(platform) {
        // shorthand
        var p = platform;
        if (this.bottom > p.top && this.top < p.bottom && this.right > p.left && this.left < p.right ) {
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