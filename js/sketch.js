/**

    Jacob Seiler
    4/3/2016
    Carnival

    - Ferris Wheel with 5 carts
    - Cyclops ride with 4 carts
    - Rollercoaster with carts on it
    - Blimb with banner

**/

function setup() {
	createCanvas(400, 400);
	frameRate(60);
	angleMode(DEGREES);
}

var drunk = false;
var BAL = 0;

var angleFerrisWheel = 0;
var angleCyclops = 0;

var blimbX = -280;
var blimbY = 40;

var rcX1 = 400 + 0.3 * 1000;
var rcY1 = 130 - 0.1 * 1000;
var rcX2 = -100;
var rcY2 = 0;
var rcX3 = -100;
var rcY3 = 0;
var rcWait = 0;
var rcSpeed = 10;

var defaultSpeed = 1;
var speed = 1;

var cloudX1 = 320;
var cloudX2 = 115;
var cloudX3 = 240;

var ferrisWheelCart = function(x, y) {
	fill(255, 255, 255);
	stroke(0, 0, 0);

	strokeWeight(10);
	point(x, y);
	strokeWeight(1);
	line(x, y, x + 10, y + 20); // Line connecting to cart
	line(x, y, x - 10, y + 20); // Line connecting to cart

	fill(66, 255, 170);
	stroke(66, 255, 170);
	quad(x - 27, y + 55, x - 20, y + 70, x + 20, y + 70, x + 27, y + 55); // Bottom of the cart

	stroke(255, 100, 140);
	strokeWeight(7);
	fill(0, 0, 0, 0);
	ellipse(x, y + 40, 65, 45); // The cart

	strokeWeight(3);
	stroke(215, 85, 120);
	fill(215, 85, 120);
	quad(x - 27, y + 50, x - 20, y + 55, x + 20, y + 55, x + 27, y + 50); // Floor of the cart
	quad(x - 8, y + 55, x - 7, y + 58, x + 7, y + 58, x + 8, y + 55); // Floor of the cart

	stroke(255, 100, 140);
	fill(255, 100, 140);
	rect(x + 10, y + 20, 5, 40); // Bar 1
	rect(x - 10, y + 20, -5, 40); // Bar 2
}; // Ferris Wheel Carts
var ferrisWheel = function(xCentre, yCentre, radius) {
	var x1 = xCentre + radius * cos(angleFerrisWheel + 0);
	var y1 = yCentre - radius * sin(angleFerrisWheel + 0);

	var x2 = xCentre + radius * cos(angleFerrisWheel + 72);
	var y2 = yCentre - radius * sin(angleFerrisWheel + 72);

	var x3 = xCentre + radius * cos(angleFerrisWheel + 144);
	var y3 = yCentre - radius * sin(angleFerrisWheel + 144);

	var x4 = xCentre + radius * cos(angleFerrisWheel + 216);
	var y4 = yCentre - radius * sin(angleFerrisWheel + 216);

	var x5 = xCentre + radius * cos(angleFerrisWheel + 288);
	var y5 = yCentre - radius * sin(angleFerrisWheel + 288);

	// draw a circle so we can see the line the ball will follow
	stroke(112, 118, 186);
	strokeWeight(7);
	fill(0, 0, 0, 0);
	ellipse(xCentre, yCentre, radius * 2 - 20, radius * 2 - 20);

	// Ferris Wheel Design
	line(xCentre, yCentre, xCentre + 70, yCentre + 200);
	line(xCentre, yCentre, xCentre - 70, yCentre + 200);

	fill(255, 242, 0);
	stroke(255, 242, 0);
	strokeWeight(7);
	line(x1, y1, xCentre, yCentre); // Lines connecting from middle to cart
	line(x2, y2, xCentre, yCentre);
	line(x3, y3, xCentre, yCentre);
	line(x4, y4, xCentre, yCentre);
	line(x5, y5, xCentre, yCentre);

	stroke(112, 118, 186);
	strokeWeight(5);
	fill(50, 235, 136);
	ellipse(xCentre, yCentre, 45, 45);

	ferrisWheelCart(x1, y1);
	ferrisWheelCart(x2, y2);
	ferrisWheelCart(x3, y3);
	ferrisWheelCart(x4, y4);
	ferrisWheelCart(x5, y5);

	angleFerrisWheel = angleFerrisWheel + speed;
}; // Ferris Wheel

var cyclopsCart = function(x, y, xCentre, yCentre) {
	stroke(255, 0, 0);
	strokeWeight(12);
	line(x - 20, y, xCentre, yCentre);

	strokeWeight(1);
	stroke(0, 0, 0);
	fill(219, 219, 219);
	rect(x - 30, y - 15, 20, 30);
	rect(x - 50, y - 15, 20, 30);
	rect(x - 10, y - 15, 20, 30);
	stroke(212, 59, 59);
	strokeWeight(3);
	arc(x + 1, y - 13, 9, 45, 0, 180);
	arc(x - 20, y - 13, 9, 45, 0, 180);
	arc(x - 40, y - 13, 9, 45, 0, 180);
	stroke(0, 0, 0);
	strokeWeight(1);
	fill(219, 219, 219);
	rect(x - 50, y + 12, 20, 3);
	rect(x - 30, y + 12, 20, 3);
	rect(x - 10, y + 12, 20, 3);
}; // Cyclops Carts
var cyclops = function(xCentreCyclops, yCentreCyclops, radiusCyclops) {
	fill(255, 255, 255);
	stroke(0, 0, 0);
	strokeWeight(1);

	var x1Cyclops = xCentreCyclops + radiusCyclops * cos(angleCyclops + 0);
	var x2Cyclops = xCentreCyclops + radiusCyclops * cos(angleCyclops + 90);
	var x3Cyclops = xCentreCyclops + radiusCyclops * cos(angleCyclops + 180);
	var x4Cyclops = xCentreCyclops + radiusCyclops * cos(angleCyclops + 270);
	var yCyclops = yCentreCyclops - radiusCyclops * sin(angleCyclops + 0);

	noStroke();
	fill(64, 64, 64);
	ellipse(xCentreCyclops, yCentreCyclops + 153, 200, 30);
	fill(110, 110, 110);
	ellipse(xCentreCyclops, yCentreCyclops + 150, 200, 30);
	fill(158, 158, 158);
	rect(xCentreCyclops - 7.5, yCentreCyclops, 15, 150);
	fill(140, 140, 140);
	ellipse(xCentreCyclops, yCentreCyclops + 10, 30, 30);

	cyclopsCart(x1Cyclops, yCyclops, xCentreCyclops, yCentreCyclops);
	cyclopsCart(x2Cyclops, yCyclops, xCentreCyclops, yCentreCyclops);
	cyclopsCart(x3Cyclops, yCyclops, xCentreCyclops, yCentreCyclops);
	cyclopsCart(x4Cyclops, yCyclops, xCentreCyclops, yCentreCyclops);

	angleCyclops = angleCyclops + speed;
}; // Cyclops

var rollercoasterCarts = function() {
	rcWait++;
	ellipse(rcX1, rcY1, 20, 20);
	ellipse(rcX2, rcY2, 20, 20);
	ellipse(rcX3, rcY3, 20, 20);

	if (rcWait === 20) {
		rcX2 = 400 + 0.3 * 1000;
		rcY2 = 130 - 0.1 * 1000;
	} else if (rcWait === 40) {
		rcX3 = 400 + 0.3 * 1000;
		rcY3 = 130 - 0.1 * 1000;
	}

	if (rcX1 > 320) {
		rcX1 -= 0.3 * (speed * rcSpeed);
		rcY1 += 0.1 * (speed * rcSpeed);
	} else if (rcX1 > 270) {
		rcX1 -= 0.3 * (speed * rcSpeed);
		rcY1 += 0.15 * (speed * rcSpeed);
	} else if (rcX1 > 210) {
		rcX1 -= 0.3 * (speed * rcSpeed);
		rcY1 += 0.2 * (speed * rcSpeed);
	} else if (rcX1 > 190) {
		rcX1 -= 0.3 * (speed * rcSpeed);
		rcY1 += 0.15 * (speed * rcSpeed);
	} else if (rcX1 > 170) {
		rcX1 -= 0.3 * (speed * rcSpeed);
		rcY1 -= 0.005 * (speed * rcSpeed);
	} else if (rcX1 > 130) {
		rcX1 -= 0.3 * (speed * rcSpeed);
		rcY1 -= 0.01 * (speed * rcSpeed);
	} else if (rcX1 > -50) {
		rcX1 -= 0.3 * (speed * rcSpeed);
		rcY1 -= 0.055 * (speed * rcSpeed);
	} else {
		rcX1 = 400 + 0.3 * 1000;
		rcY1 = 130 - 0.1 * 1000;

		rcWait = 0;
	}

	if (rcX2 > 320) {
		rcX2 -= 0.3 * (speed * rcSpeed);
		rcY2 += 0.1 * (speed * rcSpeed);
	} else if (rcX2 > 270) {
		rcX2 -= 0.3 * (speed * rcSpeed);
		rcY2 += 0.15 * (speed * rcSpeed);
	} else if (rcX2 > 210) {
		rcX2 -= 0.3 * (speed * rcSpeed);
		rcY2 += 0.2 * (speed * rcSpeed);
	} else if (rcX2 > 190) {
		rcX2 -= 0.3 * (speed * rcSpeed);
		rcY2 += 0.15 * (speed * rcSpeed);
	} else if (rcX2 > 170) {
		rcX2 -= 0.3 * (speed * rcSpeed);
		rcY2 -= 0.005 * (speed * rcSpeed);
	} else if (rcX2 > 130) {
		rcX2 -= 0.3 * (speed * rcSpeed);
		rcY2 -= 0.01 * (speed * rcSpeed);
	} else if (rcX2 > -50) {
		rcX2 -= 0.3 * (speed * rcSpeed);
		rcY2 -= 0.055 * (speed * rcSpeed);
	}

	if (rcX3 > 320) {
		rcX3 -= 0.3 * (speed * rcSpeed);
		rcY3 += 0.1 * (speed * rcSpeed);
	} else if (rcX3 > 270) {
		rcX3 -= 0.3 * (speed * rcSpeed);
		rcY3 += 0.15 * (speed * rcSpeed);
	} else if (rcX3 > 210) {
		rcX3 -= 0.3 * (speed * rcSpeed);
		rcY3 += 0.2 * (speed * rcSpeed);
	} else if (rcX3 > 190) {
		rcX3 -= 0.3 * (speed * rcSpeed);
		rcY3 += 0.15 * (speed * rcSpeed);
	} else if (rcX3 > 170) {
		rcX3 -= 0.3 * (speed * rcSpeed);
		rcY3 -= 0.005 * (speed * rcSpeed);
	} else if (rcX3 > 130) {
		rcX3 -= 0.3 * (speed * rcSpeed);
		rcY3 -= 0.01 * (speed * rcSpeed);
	} else if (rcX3 > -50) {
		rcX3 -= 0.3 * (speed * rcSpeed);
		rcY3 -= 0.055 * (speed * rcSpeed);
	}
}; // Rollercoaster Carts
var rollercoaster = function() {
	strokeWeight(5);
	stroke(255, 152, 74);
	noFill();
	bezier(400, 140, 140, 215, 290, 280, 0, 215); // Track

	// Supports
	line(50, 300, 50, 230);
	line(150, 300, 150, 245);
	line(250, 300, 250, 205);
	line(350, 300, 350, 160);

	fill(255, 0, 0);
	noStroke();
	rollercoasterCarts(); // Carts
}; // Rollercoaster

var cloud = function(x, y) {
	noStroke();
	fill(255, 255, 255);
	ellipse(x, y, 87, 20);
	ellipse(x + 27, y - 11, 77, 20);
}; // Clouds
var sky = function() {
	cloud(cloudX1, 104);
	cloud(cloudX2, 200);
	cloud(cloudX3, 241);

	cloudX1 += speed * 0.1;
	cloudX2 += speed * 0.1;
	cloudX3 += speed * 0.1;

	if (cloudX1 > 450) {
		cloudX1 = -50;
	}

	if (cloudX2 > 450) {
		cloudX2 = -50;
	}

	if (cloudX3 > 450) {
		cloudX3 = -50;
	}
}; // Sky

var manageDrunk = function() {
	if (drunk === true) {
		if (BAL < 2) {
			BAL += 0.1;
		}
	} else {
		if (BAL > 0) {
			BAL -= 0.1;
		}
	}

	if (BAL > 0) {
		filter(BLUR, BAL);
	}

	speed = defaultSpeed + (speed * BAL) / 5;
}; // Drunk

var blimb = function() {
	// Banner
	noFill();
	stroke(255, 102, 102);
	for (var counter = 1; counter <= 20; counter++) {
		bezier(
			blimbX - 70,
			blimbY - 10 + counter,
			blimbX - 115,
			blimbY + 50 + counter,
			blimbX - 195,
			blimbY - 20 + counter,
			blimbX - 300,
			blimbY - 10 + counter
		);
	}
	fill(0, 0, 0);
	text("W", blimbX - 285, blimbY - 5, 400, 400);
	text("E", blimbX - 270, blimbY - 5, 400, 400);
	text("L", blimbX - 255, blimbY - 5.2, 400, 400);
	text("C", blimbX - 240, blimbY - 2, 400, 400);
	text("O", blimbX - 225, blimbY, 400, 400);
	text("M", blimbX - 210, blimbY + 3, 400, 400);
	text("E", blimbX - 195, blimbY + 7, 400, 400);
	text("!", blimbX - 180, blimbY + 11, 400, 400);
	text("A", blimbX - 140, blimbY + 19, 400, 400);
	text("+", blimbX - 125, blimbY + 19, 400, 400);

	// Blimb
	noStroke();
	fill(255, 220, 130);
	triangle(blimbX - 30, blimbY, blimbX - 50, blimbY + 20, blimbX - 50, blimbY - 20);
	rect(blimbX - 70, blimbY - 20, 20, 40);
	fill(196, 196, 196);
	rect(blimbX, blimbY + 20, 20, 10);
	triangle(blimbX, blimbY + 20, blimbX, blimbY + 30, blimbX - 20, blimbY + 15);
	fill(97, 87, 240);
	ellipse(blimbX, blimbY, 150, 40);

	blimbX += speed;

	if (blimbX > 700) {
		blimbX = -280;
	}

	noStroke();
}; // Blimb

draw = function() {
	// TODO: Rollercoaster in background

	noStroke();
	background(115, 255, 255);
	sky();
	blimb();
	fill(194, 194, 194);
	rect(0, 300, 400, 100);

	rollercoaster();

	ferrisWheel(68, 126, 100);
	cyclops(297, 213, 100);

	manageDrunk();
};
