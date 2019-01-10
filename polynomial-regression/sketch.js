"use strict"

let x_vals = [];
let y_vals = [];

let a, b, c;

const learningRate = 0.02;
const optimiser = tf.train.sgd(learningRate);

function setup(){
   createCanvas(400,400);
   a = tf.variable(tf.scalar(random(-1, 1)));
   b = tf.variable(tf.scalar(random(-1, 1)));
   c = tf.variable(tf.scalar(random(-1, 1)));
}

// preds are predicted y values, labes are actual y vals
function loss(preds, labels){
    return preds.sub(labels).square().mean();
}


// take an x val, return corresponding y val as tensor
function predict(x){
    const xs = tf.tensor1d(x);
    // y = ax^2 + bx + c
    const ys = xs.square().mul(a).add(xs.mul(b)).add(c);

    return ys;
}

function mousePressed(){

   // simplify our x and y values so we only have to think
   // between 0 and 1
   let x = map(mouseX, 0, width, -1, 1);
   let y = map(mouseY, 0, height, 1, -1);
   x_vals.push(x);
   y_vals.push(y);
}

function draw(){
    
    // first train
   tf.tidy(() => {
      if (x_vals.length > 0){
           const ys = tf.tensor1d(y_vals);
          optimiser.minimize(() => loss(predict(x_vals), ys));
      }
   });
   background(0);
   strokeWeight(4);
   stroke(255);
   // draw our points, scale back up from unit square
   for (let i=0; i<x_vals.length; i++){
        let px = map(x_vals[i], -1, 1, 0, width);
        let py = map(y_vals[i], -1, 1, height, 0);
        point(px,py);
   }
   // draw line between 0 and 1
   // First get points
   const curveX = [];
   for (let x = -1; x < 1; x += 0.05){
        curveX.push(x);   
   }
   const ys = tf.tidy(() => predict(curveX)); 
   let curveY = ys.dataSync();
   ys.dispose();

   beginShape();
   noFill();
   stroke(255);
   strokeWeight(2);
   for (let i=0; i<curveX.length; i++){
        let x = map(curveX[i], -1, 1, 0, width);
        let y = map(curveY[i], -1, 1, height, 0);
        vertex(x,y);
   }
    endShape();
    console.log(tf.memory().numTensors);
}
