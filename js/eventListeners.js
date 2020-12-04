const keyDown = e => {
	if (ship.isDead) {
		return;
	}

	switch (e.keyCode) {
		// PRESSING SPACE
		case 32:
			shootLaser();
			break;

		case 37: // rotate ship left
			ship.rotation = ((ROTATE_SPEED / 180) * Math.PI) / FPS;
			break;

		case 38: // thrust the ship up
			ship.isThrusting = true;

			break;

		case 39:
			ship.rotation = -((ROTATE_SPEED / 180) * Math.PI) / FPS;
			break;

		default:
			break;
	}
};

const keyUp = e => {
	if (ship.isDead) {
		return;
	}
	// stop rotating
	switch (e.keyCode) {
		case 32:
			ship.canShoot = true;
			break;

		case 37:
			ship.rotation = 0;
			break;

		case 38:
			ship.isThrusting = false;
			break;

		case 39:
			ship.rotation = 0;
			break;

		default:
			break;
	}
};
