"use strict"

let xs = [];
let ys = [];

function setup(){
   createCanvas(400,400);
   background(0);
}

function mousePressed(){

   // simplify our x and y values so we only have to think
   // between 0 and 1
   let x = map(mouseX, 0, width, 0, 1);
   let y = map(mouseY, 0, height, 0, 1);
   xs.push(x);
   ys.push(y);
}

function draw(){
   background(0);
   strokeWeight(4);
   stroke(255);
   // draw our points, scale back up from unit square
   for (let i=0; i<xs.length; i++){
        let px = map(xs[i], 0, 1, 0, width);
        let py = map(ys[i], 0, 1, 1, height);
        point(px,py);
   }
}
