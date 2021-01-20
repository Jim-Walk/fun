var cols
var rows
var scl = 20;
var w = 850;
var h = 2500;
var flying = 0;

var terrain = [];

function setup(){
  createCanvas(1000, 800, WEBGL);
  cols = w/scl
  rows = h/scl

  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
    for (var y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw(){
  flying -= 0.1;
  var yoff = flying;
  for (var y = 0; y <  rows; y++){
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff,yoff), 0, 1, -100, 100);
      xoff += 0.2;
    }
    yoff += 0.2;
  }
  background(0);
  stroke(255);
  rotateX(PI/3);
  fill(200, 200, 200, 50);
  translate(-w/2, -h/2);
  for (var y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
      // rect(x*scl, y*scl, scl, scl);
    }
    endShape();
  }
}
