"use strict"

let x_vals = [];
let y_vals = [];

let m, b;

const learningRate = 0.02;
const optimiser = tf.train.sgd(learningRate);

function setup(){
   createCanvas(400,400);

   m = tf.variable(tf.scalar(random(1)));
   b = tf.variable(tf.scalar(random(1)));
}

// preds are predicted y values, labes are actual y vals
function loss(preds, labels){
    return preds.sub(labels).square().mean();
}


// take an x val, return corresponding y val as tensor
function predict(x){
    // y = mx + b
    const xs = tf.tensor1d(x);
    const ys = xs.mul(m).add(b);

    return ys;
}

function mousePressed(){

   // simplify our x and y values so we only have to think
   // between 0 and 1
   let x = map(mouseX, 0, width, 0, 1);
   let y = map(mouseY, 0, height, 1, 0);
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
        let px = map(x_vals[i], 0, 1, 0, width);
        let py = map(y_vals[i], 0, 1, height, 0);
        point(px,py);
   }
   // draw line between 0 and 1
   // First get points
   let lineX = [0, 1];
   const ys = tf.tidy(() => predict(lineX)); 
   let lineY = ys.dataSync();
   ys.dispose();

   // de-normalise points
   let x1 = map(lineX[0], 0, 1, 0, width);
   let x2 = map(lineX[1], 0, 1, 0, width);
  
   let y1 = map(lineY[0], 0, 1, height, 0);
   let y2 = map(lineY[1], 0, 1, height, 0);

    strokeWeight(2);
    line(x1, y1, x2, y2);
    console.log(tf.memory().numTensors);
}
