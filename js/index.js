let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let musicBtn = document.getElementById("music-btn");
let musicOnOff = document.getElementById("musicOnOff");
let MUSIC_ON = false;

let thruster = document.getElementById("fire");

let playerImg = document.getElementById("player");
playerImg.width = PLAYER_DIM;
playerImg.height = PLAYER_DIM;

const WINDOW_WIDTH = window.innerWidth;

if (window.innerWidth < 1000) {
	showMobileButtons();
}

canvas.width = window.innerWidth > 1000 ? window.innerWidth * 0.7 : window.innerWidth * 0.95;

if (window.innerWidth < 600) {
	canvas.height = window.innerHeight * 0.5;
} else {
	canvas.height = window.innerHeight * 0.9;
}

// event listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

musicBtn.addEventListener("click", () => {
	MUSIC_ON = !MUSIC_ON;
	if (MUSIC_ON) {
		musicBtn.innerText = "Turn off Music";
		musicOnOff.innerText = "Music ON";
		musicOnOff.style.color = "#2ecc71";
	} else {
		musicBtn.innerText = "Turn on Music";
		musicOnOff.innerText = "Music OFF";
		musicOnOff.style.color = "#e74c3c";
	}
});

const background = new Image();
background.src = "images/background.jpg";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function () {
	ctx.drawImage(background, 0, 0);
};

// game Parameters
let level, asteroids, ship, text, textAlpha, lives, score, highScore;

// set up sound effects
// have to take index.html as reference when calculating the relative path
const fxLaser = new Sound("sounds/laser.m4a", 5, 0.05);
const fxExplode = new Sound("sounds/AsteroidExplosion.mp3");
const fxThrust = new Sound("sounds/thrust.m4a", 1, 0.5);
const fxHit = new Sound("sounds/AsteroidExplosion.mp3", 5);

// set up music
const music = new Sound("sounds/MainGameMusic.mp3");
const newLevelMusic = new Sound("sounds/NewLevelMusic.mp3");
let asteroidsLeft, asteroidsTotal;

const newLevel = () => {
	music.stopIt();
	newLevelMusic.playIt();
	text = `LEVEL ${level + 1}`;
	textAlpha = 1.0;
	createAsteroids();
};

const newGame = () => {
	lives = LIVES;
	level = 0;
	score = 0;
	highScore = localStorage.getItem("asteroidHighScore")
		? localStorage.getItem("asteroidHighScore")
		: 0;
	ship = new Ship();
	newLevel();
};

newGame();

// ========================== rotate image ============================================

const drawImageRotated = (img, x, y, rot) => {
	ctx.setTransform(1, 0, 0, 1, x, y); // set the scale and the center pos
	ctx.rotate(rot); // set the rotation
	ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height); // draw image offset
	// by half its width
	// and heigth
	ctx.setTransform(1, 0, 0, 1, 0, 0); // restore default transform
};

// ========================== rotate image ============================================

// MAIN GAME LOOP IS DONW BELOW

const mainLoop = () => {
	let isShipExploding = ship.explodeTime > 0;
	let isShipBlinking = ship.blinkNumber % 2 === 0;

	// play the music
	if (MUSIC_ON) {
		music.playIt();
	}

	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// move / thrust the ship
	if (ship.isThrusting && !isShipExploding && !ship.isDead) {
		ship.thrust.x += (ship.thrustAcceleration * Math.cos(ship.angle)) / FPS;
		ship.thrust.y += (ship.thrustAcceleration * Math.sin(ship.angle)) / FPS;
		fxThrust.playIt();
	}

	if (!ship.isThrusting) {
		ship.thrust.x -= (FRICTION * ship.thrust.x) / FPS;
		ship.thrust.y -= (FRICTION * ship.thrust.y) / FPS;
		fxThrust.stopIt();
	}

	// Draw SHIP
	if (!isShipExploding) {
		if (isShipBlinking && !ship.isDead) {
			drawShip(ship.x, ship.y, ship.angle, ship.radius);
		}
		// handle blinking

		if (ship.blinkNumber > 0) {
			// reduce blink number
			ship.blinkTime--;

			// reduce the blink num
			if (ship.blinkTime === 0) {
				ship.blinkTime = Math.ceil(SHIP_BLINK_DURATION * FPS);
				ship.blinkNumber--;
			}
		}
	} else {
		drawShipExplosion();
		fxExplode.playIt();
	}

	// draw lasers
	drawLaser();

	// move lasers
	moveLaser();

	// draw asteroids
	drawAsteriods();

	// draw game level text
	if (textAlpha > 0) {
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = `rgba(255, 255, 255,${textAlpha})`;
		ctx.font = `small-caps ${TEXT_SIZE}rem Fjalla One`;
		ctx.fillText(text, canvas.width / 2, canvas.height * 0.2);
		textAlpha -= 1.0 / TEXT_FADE_TIME / FPS;
	} else if (ship.isDead) {
		newGame();
	}

	// draw game lives
	for (let i = 0; i < lives; i++) {
		ctx.drawImage(
			ship.image,
			canvas.width * 0.05 + i * canvas.width * 0.075,
			canvas.height * 0.05,
			PLAYER_DIM,
			PLAYER_DIM
		);
	}

	// draw Score
	ctx.textAlign = "right";
	ctx.fillStyle = `rgb(255, 255, 255)`;
	ctx.font = `${TEXT_SIZE - 1.5}rem Fjalla One`;
	ctx.fillText(`Score ${score}`, canvas.width - 30, canvas.height * 0.075);

	// draw Score
	ctx.textAlign = "center";
	ctx.fillStyle = `rgb(255, 255, 255)`;
	ctx.font = `${TEXT_SIZE - 1.5}rem Fjalla One`;
	ctx.fillText(`High Score ${highScore}`, canvas.width / 2, canvas.height * 0.075);

	// laster collision with asteroids
	checkLaserCollisionWithAsteroid();

	// ship collision with asteroids
	if (!isShipExploding) {
		if (ship.blinkNumber === 0 && !ship.isDead) {
			// check collisions with asteroids
			for (let i = 0; i < asteroids.length; i++) {
				if (
					circleInRect(
						ship.x,
						ship.y,
						ship.radius,
						asteroids[i].x,
						asteroids[i].y,
						asteroids[i].width,
						asteroids[i].height
					)
				) {
					ship.explodeShip(ctx);
					destroyAsteroid(i);
					break;
				}
			}
		}

		if (!ship.isDead) {
			// rotate ship
			ship.angle += ship.rotation;
			ship.playerAngle += ship.rotation;
			drawImageRotated(ship.image, ship.playerX, ship.playerY, -ship.playerAngle);

			// move the ship
			ship.x += ship.thrust.x;
			ship.y -= ship.thrust.y;
			ship.playerX += ship.thrust.x;
			ship.playerY -= ship.thrust.y;
			ship.playerXMiddle += ship.thrust.x;
			ship.playerYMiddle -= ship.thrust.y;

			// if ship off the edge of the screen then pop it back from the opp edge
			if (ship.x < 0 - ship.radius) {
				ship.x = canvas.width + ship.radius;
				ship.playerX = canvas.width + ship.radius;
			} else if (ship.x > canvas.width + ship.radius) {
				ship.x = 0 - ship.radius;
				ship.playerX = 0 - ship.radius;
			}

			if (ship.y < 0 - ship.radius) {
				ship.y = canvas.height + ship.radius;
				ship.playerY = canvas.height + ship.radius;
			} else if (ship.y > canvas.height + ship.radius) {
				ship.y = 0 - ship.radius;
				ship.playerY = 0 - ship.radius;
			}
		}
	} else {
		// ship is exploding
		ship.explodeTime--;

		if (ship.explodeTime == 0) {
			lives--;
			if (lives === 0) {
				gameOver();
			} else {
				ship = new Ship();
			}
		}
	}
};

// main game loop
setInterval(mainLoop, 1000 / FPS);
