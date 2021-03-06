class Asteroid {
	constructor(image, x, y, w, h) {
		this.image = image;
		this.levelMult = 1 + 0.1 * level;

		this.x = x;
		this.y = y;
		this.xVel =
			0.5 +
			((Math.random() * ASTEROID_SPEED * this.levelMult) / FPS) *
				(Math.random() < 0.5 ? 1 : -1);
		this.yVel =
			0.5 +
			((Math.random() * ASTEROID_SPEED * this.levelMult) / FPS) *
				(Math.random() < 0.5 ? 1 : -1);

		this.angle = Math.random() * Math.PI * 2; // in radians
		// this.radius = r;

		this.width = w;
		this.height = h;

		this.middleX = Math.ceil((x + w) / 2);
		this.middleY = Math.ceil((y + h) / 2);
	}
}
