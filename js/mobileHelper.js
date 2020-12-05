let btnsForMobile = document.getElementById("btnsForMobile");

let fire = document.getElementById("fire");
let thrustBtn = document.getElementById("thrustBtn");
let leftBtn = document.getElementById("leftBtn");
let rightBtn = document.getElementById("rightBtn");

const showMobileButtons = () => {
	btnsForMobile.style.display = "flex";

	fire.addEventListener("click", e => {
		if (ship.isDead) {
			return;
		}
		shootLaser();
		ship.canShoot = true;
	});

	thrustBtn.addEventListener("touchstart", e => {
		ship.isThrusting = true;
	});

	thrustBtn.addEventListener("touchend", e => {
		ship.isThrusting = false;
	});

	thrustBtn.addEventListener("mousedown", e => {
		ship.isThrusting = true;
	});

	thrustBtn.addEventListener("mouseup", e => {
		ship.isThrusting = false;
	});

	rightBtn.addEventListener("touchstart", () => {
		ship.rotation = -((ROTATE_SPEED / 180) * Math.PI) / FPS;
	});

	rightBtn.addEventListener("touchend", () => {
		ship.rotation = 0;
	});

	rightBtn.addEventListener("mousedown", () => {
		ship.rotation = -((ROTATE_SPEED / 180) * Math.PI) / FPS;
	});

	rightBtn.addEventListener("mouseup", () => {
		ship.rotation = 0;
	});

	leftBtn.addEventListener("touchstart", () => {
		ship.rotation = ((ROTATE_SPEED / 180) * Math.PI) / FPS;
	});

	leftBtn.addEventListener("touchend", () => {
		ship.rotation = 0;
	});

	leftBtn.addEventListener("mousedown", () => {
		ship.rotation = ((ROTATE_SPEED / 180) * Math.PI) / FPS;
	});

	leftBtn.addEventListener("mouseup", () => {
		ship.rotation = 0;
	});
};
