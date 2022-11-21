class Figure {
    getPoints() { 
        return [];
    }
}

class OneLine extends Figure {
    getPoints() {
        let points = [];
        let yCenter = window.innerHeight / 2;
        let xCenter = window.innerWidth / 2;
        let i = 0;
        let j = 0; 
    
        while(i < 200) {       
            points.push({x: xCenter + j, y: yCenter});
    
            i++;
            j += 0.2;
        }
    
        return points;
    }
}

class TwoLines extends Figure {
    getPoints() {
        let yCenter = window.innerHeight / 2;
        let xCenter = window.innerWidth / 2;
        let points = [];
        let i = 0;
        let j = 0;
    
        while(i < 200) {
    
            points.push({x: xCenter + j, y: yCenter});
            points.push({x: xCenter - j , y: yCenter});
    
            i++;
            j += 0.2;
        }
    
        return points;
    }
}

class FourLines extends Figure {
    getPoints() {
        let yCenter = window.innerHeight / 2;
        let xCenter = window.innerWidth / 2;
        let points = [];
        let i = 0;
        let j = 0;
    
        while(i < 200) {
       
            points.push({x: xCenter + j, y: yCenter});
            points.push({x: xCenter - j , y: yCenter});
    
            points.push({x: xCenter, y: yCenter + j});
            points.push({x: xCenter , y: yCenter - j});
    
            i++;
            j += 0.5;
        }
    
        return points;
    }
}




var figurePoints = [];
var points = [];
var iteration = 0;
var rotationAngle = 0;
var incrementRotationAngle = 0.2;
var colors = [
    [204, 102, 255],
    [255, 102, 102],
    [255, 153, 51],
    [255, 255, 102],
    [153, 255, 51],
    [0, 255, 0],
    [0, 255, 255],
    [51, 153, 255],
    [153, 51, 255]
];

var figures = [
    new OneLine(),
    new TwoLines(),
    new FourLines()
]

function setup() {
    figurePoints = figures.pop().getPoints();
	createCanvas(window.innerWidth, window.innerHeight);
	stroke(255);     
    strokeWeight(1)
	background(0);
}

function draw() {
    background(0);
    iterate();
    drawPoints();
}

function changeColor(colorIndex) {
    if (colorIndex == colors.length) {
        colorIndex = 0;
    }

    let color = colors[colorIndex];
    stroke(color[0], color[1], color[2]); //RGB

    colorIndex += 1;

    return colorIndex;
}

function drawPoints() {

    let iColor = 0;
    points.forEach(current => {

        iColor = changeColor(iColor);
        circle(current.x, current.y, 1);
    });
}

function iterate() {
    if (!figures.length && !figurePoints.length) {
        return;
    }

    if (iteration == figurePoints.length) {
        figurePoints = figures.pop().getPoints();
        iteration = 0;
        points = [];
    }

    let figurePoint = figurePoints[iteration];
    let rotatedPoint = rotatePoint(figurePoint, rotationAngle);
    points.push(rotatedPoint);

    iteration = iteration + 1;
    rotationAngle = rotationAngle + incrementRotationAngle;
}

function rotatePoint(point, angle) {
    let tx  = point.x - window.innerWidth / 2; 
    let ty = point.y - window.innerHeight / 2;

    x = tx * Math.cos(angle) - ty * Math.sin(angle);
    y = ty * Math.cos(angle) + tx * Math.sin(angle);

    x = x + window.innerWidth / 2; 
    y = y + window.innerHeight / 2;

    return {
        x: x,
        y: y
    }
}


