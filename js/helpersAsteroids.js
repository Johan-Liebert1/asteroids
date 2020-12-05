const greenufo = document.getElementById("greenufo");
const blackufo = document.getElementById("blackufo");
const naturalufo = document.getElementById("naturalufo");
const orangeufo = document.getElementById("orangeufo");
const tealufo = document.getElementById("tealufo");
const whiteufo = document.getElementById("whiteufo");
const purpleufo = document.getElementById("purpleufo");

const allAsteroidImages = [greenufo, blackufo, naturalufo, orangeufo, tealufo, whiteufo, purpleufo];

const drawAsteriods = () => {
	for (let i = 0; i < asteroids.length; i++) {
		let asteroidWidth = asteroids[i].width;
		let asteroidHeight = asteroids[i].height;
		let x = asteroids[i].x;
		let y = asteroids[i].y;

		ctx.drawImage(asteroids[i].image, x, y, asteroidWidth, asteroidHeight);

		// move the asteroid
		asteroids[i].x += asteroids[i].xVel;
		asteroids[i].y += asteroids[i].yVel;

		// asteroid goes off the screen
		if (asteroids[i].x < 0 - asteroids[i].width) {
			asteroids[i].x = canvas.width + asteroids[i].width;
		} else if (asteroids[i].x > canvas.width + asteroids[i].width) {
			asteroids[i].x = 0 - asteroids[i].width;
		}
		if (asteroids[i].y < 0 - asteroids[i].height) {
			asteroids[i].y = canvas.height + asteroids[i].height;
		} else if (asteroids[i].y > canvas.height + asteroids[i].height) {
			asteroids[i].y = 0 - asteroids[i].height;
		}

		// show asteroid's collision circle
		if (SHOW_BOUNDING) {
			ctx.strokeStyle = "lime";
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2, false);
			ctx.stroke();
		}
	}
};

const createAsteroids = () => {
	asteroids = [];
	asteroidsTotal = (NO_OF_ASTEROIDS + level) * 7;
	asteroidsLeft = asteroidsTotal;
	let x, y;
	for (let i = 0; i < NO_OF_ASTEROIDS + level; i++) {
		do {
			x = Math.floor(Math.random() * canvas.width);
			y = Math.floor(Math.random() * canvas.height);

			randI = Math.floor(Math.random() * allAsteroidImages.length);

			asteroids.push(
				new Asteroid(allAsteroidImages[randI], x, y, ASTEROID_WIDTH, ASTEROID_HEIGHT)
			);
		} while (
			distBetweenPoints(ship.x, ship.y, x, y) <
			ASTEROID_STARTING_SIZE_PIXELS * 2 + ship.radius
		);
	}
};

const destroyAsteroid = index => {
	let x = asteroids[index].x,
		y = asteroids[index].y,
		aw = asteroids[index].width,
		astImg = asteroids[index].image;

	// split the asteroid in two
	if (aw === ASTEROID_WIDTH) {
		asteroids.push(
			new Asteroid(
				astImg,
				x,
				y,
				Math.ceil(ASTEROID_WIDTH / 2),
				Math.ceil(ASTEROID_HEIGHT / 2)
			)
		);
		asteroids.push(
			new Asteroid(
				astImg,
				x,
				y,
				Math.ceil(ASTEROID_WIDTH / 2),
				Math.ceil(ASTEROID_HEIGHT / 2)
			)
		);
		score += ASTEROID_POINTS_LARGE;
	} else {
		score += ASTEROID_POINTS_SMALL;
	}

	// check high score
	if (score > highScore) {
		highScore = score;
		localStorage.setItem("asteroidHighScore", highScore);
	}

	// destroyAsteroid
	asteroids.splice(index, 1);
	fxHit.playIt();

	// ratio of remaining asteroids
	asteroidsLeft--;

	if (asteroids.length === 0) {
		level++;
		newLevel();
	}
};
