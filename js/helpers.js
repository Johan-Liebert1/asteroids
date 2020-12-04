const bullet = document.getElementById("bullet");

const distBetweenPoints = (x1, y1, x2, y2) => {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const pointInRect = (x, y, rx, ry, rw, rh) => {
	first = x > rx && x < rx + rw;
	second = y > ry && y < ry + rh;
	return first && second;
};

const circleInRect = (x, y, r, rx, ry, rw, rh) => {
	first = x + r > rx && x + r < rx + rw;
	second = y + r > ry && y + r < ry + rh;

	third = x - r > rx && x - r < rx + rw;
	fourth = y - r > ry && y - r < ry + rh;

	return (first && second) || (third && fourth);
};

const shootLaser = () => {
	if (ship.canShoot && ship.lasers.length < MAX_LASERS) {
		ship.lasers.push({
			// from the nose of the ship
			x: ship.x + (4 / 3) * ship.radius * Math.cos(ship.angle) - BULLET_RADIUS / 2,
			y: ship.y - (4 / 3) * ship.radius * Math.sin(ship.angle),
			xVel: (LASER_SPEED * Math.cos(ship.angle)) / FPS,
			yVel: -(LASER_SPEED * Math.sin(ship.angle)) / FPS,
			explodeTime: 0
		});
		fxLaser.playIt();
	}

	ship.canShoot = false;
};

const drawLaser = () => {
	for (let i = 0; i < ship.lasers.length; i++) {
		if (ship.lasers[i].explodeTime === 0) {
			ctx.drawImage(bullet, ship.lasers[i].x, ship.lasers[i].y, BULLET_RADIUS, BULLET_RADIUS);
		} else {
			// draw the explosion
			ctx.fillStyle = "orangered";
			ctx.beginPath();
			ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.radius * 0.75, 0, Math.PI * 2, false);
			ctx.fill();

			ctx.fillStyle = "salmon";
			ctx.beginPath();
			ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.radius * 0.5, 0, Math.PI * 2, false);
			ctx.fill();

			ctx.fillStyle = "pink";
			ctx.beginPath();
			ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.radius * 0.25, 0, Math.PI * 2, false);
			ctx.fill();
		}
	}
};

const moveLaser = () => {
	for (let i = ship.lasers.length - 1; i >= 0; i--) {
		if (ship.lasers[i].explodeTime > 0) {
			// currently exploding
			ship.lasers[i].explodeTime--;

			// remove the laser

			if (ship.lasers[i].explodeTime === 0) {
				ship.lasers.splice(i, 1);
				continue;
			}
		} else {
			// handle edge of screen
			if (ship.lasers[i].x < 0) {
				ship.lasers.splice(i, 1);
				continue;
			} else if (ship.lasers[i].x > canvas.width) {
				ship.lasers.splice(i, 1);
				continue;
			}
			if (ship.lasers[i].y < 0) {
				ship.lasers.splice(i, 1);
				continue;
			} else if (ship.lasers[i].y > canvas.height) {
				ship.lasers.splice(i, 1);
				continue;
			}

			ship.lasers[i].x += ship.lasers[i].xVel;
			ship.lasers[i].y += ship.lasers[i].yVel;
		}
	}
};

const checkLaserCollisionWithAsteroid = () => {
	let ax, ay, aw, ah, lx, ly;

	for (let i = asteroids.length - 1; i >= 0; i--) {
		ax = asteroids[i].x;
		ay = asteroids[i].y;
		aw = asteroids[i].width;
		ah = asteroids[i].height;

		// loop over the lasers
		for (let j = ship.lasers.length - 1; j >= 0; j--) {
			lx = ship.lasers[j].x;
			ly = ship.lasers[j].y;

			// detect collision
			if (
				ship.lasers[j].explodeTime === 0 &&
				circleInRect(lx, ly, BULLET_RADIUS, ax, ay, aw, ah)
			) {
				// hit

				// destroy the asteroid and activate laser explosion
				ship.lasers[j].explodeTime = ship.lasers[j].explodeTime = Math.ceil(
					ASTEROID_EXPLODE_DURATION * FPS
				);
				destroyAsteroid(i);
				break;
			}
		}
	}
};

const gameOver = () => {
	//TODO: Game over
	ship.isDead = true;
	text = "GAME OVER";
	textAlpha = 1.0;
};
