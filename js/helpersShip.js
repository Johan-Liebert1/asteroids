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
