const drawShip = (x, y, angle, radius, color = "white") => {
	// ctx.drawImage(
	// 	ship.image,
	// 	x + (4 / 3) * radius * Math.cos(angle) - PLAYER_DIM / 2,
	// 	y - (4 / 3) * radius * Math.sin(angle) + PLAYER_DIM / 2 - 9,
	// 	PLAYER_DIM,
	// 	PLAYER_DIM
	// );

	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(
		// nose of the ship
		x + (4 / 3) * radius * Math.cos(angle),
		y - (4 / 3) * radius * Math.sin(angle)
	);

	ctx.lineTo(
		// rear left
		x - radius * ((2 / 3) * Math.cos(angle) + Math.sin(angle)),
		y + radius * ((2 / 3) * Math.sin(angle) - Math.cos(angle))
	);
	ctx.lineTo(
		// rear right
		x - radius * ((2 / 3) * Math.cos(angle) - Math.sin(angle)),
		y + radius * ((2 / 3) * Math.sin(angle) + Math.cos(angle))
	);

	ctx.closePath();
	ctx.stroke();

	if (SHOW_BOUNDING) {
		ctx.strokeStyle = "lime";
		ctx.beginPath();
		ctx.arc(ship.playerXMiddle, ship.playerYMiddle, ship.radius, 0, Math.PI * 2, false);
		ctx.stroke();
	}
};

// const drawShip = (x, y, angle, radius, color = "white") => {
// 	ctx.drawImage(greenufo, x, y, 150, 50);
// };

const drawThruster = () => {
	ctx.fillStyle = "red";
	ctx.strokeStyle = "orange";
	ctx.lineWidth = SHIP_SIZE / 5;
	ctx.beginPath();

	ctx.moveTo(
		// rear left
		ship.x - ship.radius * ((2 / 3) * Math.cos(ship.angle) + 0.5 * Math.sin(ship.angle)),
		ship.y + ship.radius * ((2 / 3) * Math.sin(ship.angle) - 0.5 * Math.cos(ship.angle))
		// ship.x,
		// ship.y - PLAYER_DIM / 2
	);
	ctx.lineTo(
		// rear centre (behind the ship)
		ship.x - ((ship.radius * 5) / 3) * Math.cos(ship.angle),
		ship.y + ((ship.radius * 5) / 3) * Math.sin(ship.angle)
	);
	ctx.lineTo(
		// rear right
		ship.x - ship.radius * ((2 / 3) * Math.cos(ship.angle) - 0.5 * Math.sin(ship.angle)),
		ship.y + ship.radius * ((2 / 3) * Math.sin(ship.angle) + 0.5 * Math.cos(ship.angle))
	);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
};

const drawShipExplosion = () => {
	ctx.fillStyle = "darkred";
	ctx.beginPath();
	ctx.arc(ship.x, ship.y, ship.radius * 1.5, Math.PI * 2, false);
	ctx.fill();

	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(ship.x, ship.y, ship.radius * 1.4, Math.PI * 2, false);
	ctx.fill();

	ctx.fillStyle = "orange";
	ctx.beginPath();
	ctx.arc(ship.x, ship.y, ship.radius * 1.2, Math.PI * 2, false);
	ctx.fill();

	ctx.fillStyle = "yellow";
	ctx.beginPath();
	ctx.arc(ship.x, ship.y, ship.radius * 0.8, Math.PI * 2, false);
	ctx.fill();

	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(ship.x, ship.y, ship.radius * 0.5, Math.PI * 2, false);
	ctx.fill();
};
