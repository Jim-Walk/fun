var population;
var count = 0;  // tracks how long the rocket has lived
var lifespan = 400;
var lifeP;
var target;

var rx = 100
var ry = 250
var rw = 150;
var rh = 10;

function setup(){
    createCanvas(400,400);
    population = new Population(25);
    lifeP = createP();
    target = createVector(width/2, 50);
}

function draw(){
    background(0);
    population.run();
    lifeP.html(count);
    count++;
    if (count == lifespan){
        population.evaluate();
        population.selection();
        count = 0;
    }

    fill(255);
    rect(rx, ry, rw, rh);

    ellipse(target.x, target.y, 16, 16);
}



