const player = document.getElementById("player");

class Ship {
	constructor() {
		this.image = player;
		this.x = canvas.width / 2;
		this.y = canvas.height / 2;

		this.angle = (90 / 180) * Math.PI; // convert angle to radians

		this.radius = 40;
		this.canShoot = true;
		this.isDead = false;
		this.explodeTime = 0;
		this.lasers = [];
		this.rotation = 0;
		this.isThrusting = false;
		this.thrust = {
			x: 0,
			y: 0
		};
		this.thrustAcceleration = 5;
		this.blinkTime = Math.ceil(SHIP_BLINK_DURATION * FPS);
		this.blinkNumber = Math.ceil(SHIP_INVINCIBILITY_DURATION / SHIP_BLINK_DURATION);

		this.playerX = this.x;
		this.playerY = this.y;
		this.playerXMiddle = this.x + (4 / 3) * this.radius * Math.cos(this.angle);
		this.playerYMiddle = this.y - (4 / 3) * this.radius * Math.sin(this.angle) + PLAYER_DIM - 9;
	}

	setMiddle = () => {
		this.playerXMiddle = this.x + (4 / 3) * this.radius * Math.cos(this.angle);
		this.playerYMiddle = this.y - (4 / 3) * this.radius * Math.sin(this.angle) + PLAYER_DIM - 9;
	};

	explodeShip = ctx => {
		this.explodeTime = Math.ceil(SHIP_EXPLODE_DURATION * FPS);
	};
}
