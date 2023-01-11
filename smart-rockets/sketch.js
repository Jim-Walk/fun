var population
var count = 0  // tracks how long the rocket has lived
var lifespan = 200
var lifeP
var target
var g_iterations = 0

var rx = 100
var ry = 250
var rw = 150
var rh = 10

function setup(){
  createCanvas(400,400)
  population = new Population(25)
  countP = createP()
  iterP  = createP() 
  target = createVector(width/2, 50)
}

function draw(){
  background(0)
  population.run()
  countP.html(count)
  iterP.html(g_iterations)
  count++
  if (count == lifespan){
    population.evaluate()
    population.selection()
    count = 0
    g_iterations += 1
  }

  fill(255)
  rect(rx, ry, rw, rh)

  ellipse(target.x, target.y, 16, 16)
}

function Population(siz){
  this.rockets = []
  this.matingpool = []
  this.popsize = siz

  for (let i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket()
  }

  // The actual genetic algorithm part
  this.evaluate = function(){
    var maxfit = 0
    for (let i = 0; i<this.popsize; i++){
      this.rockets[i].calcFitness()
      if (this.rockets[i].fitness > maxfit){
          maxfit = this.rockets[i].fitness
      }
    }

    // normalise fitness
    for (let i = 0; i<this.popsize; i++){
      this.rockets[i].fitness /= maxfit
    }

    this.matingpool = []

    /* Place more of the rockets with higher
     *  fitness into the mating pool
     */
    for (let i = 0; i<this.popsize; i++){
      var n = this.rockets[i].fitness * 100
      for (let j = 0; j<n; j++){
          this.matingpool.push(this.rockets[i])
      }
    }

  }

  // creates a new child rocket
  this.selection = function () {
    const newRockets = []
    for (let i=0; i<this.rockets.length; i++) {
      var parentA = random(this.matingpool).dna
      var parentB = random(this.matingpool).dna
      var child = parentA.crossover(parentB)
      child.mutation()
      newRockets[i] = new Rocket(child)
    }
    this.rockets = newRockets
  }

  this.run = function(){
    for (let i = 0; i<this.popsize; i++){
      this.rockets[i].update()
      this.rockets[i].show()
    }
  }
}

function DNA (genes) {
  if (genes) {
    this.genes = genes
  } else {
    this.genes = []
    for (let i = 0; i < lifespan; i++) {
      this.genes[i] = (p5.Vector.random2D())
      this.genes[i].setMag(0.2)
    }
  }

  this.crossover = function (partner) {
    const newgenes = []
    let mid = floor(random(this.genes.length))
    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i]
      } else {
        newgenes[i] = partner.genes[i]
      }
    }
    return new DNA(newgenes)
  }

  this.mutation = function () {
    for (let i = 0; i < this.genes.length; i++){
      if (random(i) < 0.01){
        this.genes[i] = p5.Vector.random2D()
        this.genes[i].setMag(0.2)
      }
    }
  }
}

function Rocket(dna){
  this.pos = createVector(width/2, height)
  this.vel = createVector()
  this.acc = createVector()
  this.age = 0
  this.completed = false
  this.crashed = false
  if (dna){
    this.dna = dna
  } else {
    this.dna = new DNA()
  }

  this.calcFitness = function(){
    var d = dist(this.pos.x, this.pos.y, target.x, target.y)
    // invert dist to get fitness
    this.fitness = map(d, 0, width, width, 0)
    if (this.completed){
      this.fitness *= 10
    }
    if (this.crashed){
      this.fitness /= 50
    }
  }

  this.applyForce = function(force){
    this.acc.add(force)
  }

  this.update = function(){

    const d = dist(this.pos.x, this.pos.y, target.x, target.y)
    if (d < 10){
      this.completed = true
    }

    // rectangle check
    if ((this.pos.x > rx && this.pos.x < rx + rw &&
      this.pos.y > ry && this.pos.y < ry + rh) ||
      this.pos.x > width || this.pos.x < 0){
      this.crashed = true
    }

    if (!this.completed && !this.crashed){
      this.applyForce(this.dna.genes[count])
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.acc.mult(0)
    }
  }


  this.show = function(){
    push()
    fill(255, 150)
    translate(this.pos.x, this.pos.y)
    rotate(this.vel.heading())
    rectMode(CENTER)
    rect(0, 0, 25, 5) 
    pop()
  }
}
