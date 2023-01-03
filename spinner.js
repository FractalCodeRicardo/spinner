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
            j += 1;
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
        let p1 = {x: xCenter, y:yCenter}
        let p2 = {x: xCenter, y:yCenter}
    
        while(i < 2) {
    
            j += 50;

            points.push({x: p1.x, y: p1.y});
            p1 = {x: p1.x + j, y: p1.y}
            points.push(p1);

            points.push({x: p2.x, y: p2.y});
            p2 = {x: p2.x - j, y: p2.y}
            points.push(p2);
    
            i++;

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


class Circle extends Figure {
    
    getPoints() {
        let yCenter = window.innerHeight / 2;
        let xCenter = window.innerWidth / 2;
        let x, y, angle = 0;
        let r = 50;
        let points = [];
        while(angle < Math.PI *2) {
    
            x = r * Math.cos(angle);
            y = r * Math.sin(angle);

            y += yCenter;
            x += xCenter + r;

            angle += 0.1;

            points.push({x: x, y: y})
        }
    
        return points;
    }
}

class Rose extends Figure {
    
    getPoints() {
        let yCenter = window.innerHeight / 2;
        let xCenter = window.innerWidth / 2;
        let x, y, angle = 0;
        let r = 0;
        let points = [];
        let p=1, q=1
        while(angle < Math.PI *8) {
    
            r = Math.cos((p/q) * angle) * 50;

            x = r * Math.cos(angle);
            y = r * Math.sin(angle);

            y += yCenter;
            x += xCenter + r;

            angle += 0.1;

            points.push({x: x, y: y})
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
   // new Rose(),
    new TwoLines(),
   // new FourLines()
]

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	stroke(255);     
    strokeWeight(2)
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
    
    for (let i = 0; i < iteration; i++) {

        if (i == points.length - 1) {
            return;
        }

        let p1 = points[i];
        let p2 = points[i + 1];

        iColor = changeColor(iColor);
        line(p1.x, p1.y, p2.x, p2.y);
    }
}

function rotatePoints(points) {
    var angle = 0;
    points.forEach((p, i) => {
        points[i] = rotatePoint(p, angle)
        angle += incrementRotationAngle;
    })
}

function iterate() {
    if (iteration == 0 && figures.length) {
        points = figures.pop().getPoints();
        rotatePoints(points);
    }

    if (iteration == points.length) {
       
        if (figures.length) {
            points = [];
            points = figures.pop().getPoints();
            rotatePoints(points);
            iteration = 0;
        } 
        
        return;
    }

    iteration ++;
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


