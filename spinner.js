var points = [];
var x = window.innerWidth / 2;
var increment = 0.5;
var rotationAngle = 0;
var incrementRotationAngle = 0.01;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	stroke(255);     
    strokeWeight(3)
	background(0);
}

function draw() {
    background(0);
    iterate();
    drawPoints();

}

function drawPoints() {
    points.forEach(p => {
        circle(p.x, p.y, 2);
    });
}

function iterate() {
    let y = fnLine(x)
    let point = {x: x, y: y};
    point = rotatePoint(point, rotationAngle);
    points.push(point);
    x = x + increment;
    rotationAngle = rotationAngle + incrementRotationAngle;
}

function rotatePoint(point, angle) {
    point.x = point.x - window.innerWidth / 2; 
    point.y = point.y - window.innerHeight / 2;

    let x = point.x * Math.cos(angle) - point.y * Math.sin(angle);
    let y = point.y * Math.cos(angle) + point.x * Math.sin(angle);

    x = x + window.innerWidth / 2; 
    y = y + window.innerHeight / 2;

    return {
        x: x,
        y: y
    }
}

function fnLine(x) {
    let m = 0;
    let b = window.innerHeight / 2;

    return m * x + b
}
