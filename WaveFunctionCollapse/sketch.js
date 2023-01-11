const tiles = []

const grid = []

const DIM = 2 // Dimensions

const BLANK = 0
const UP = 1
const RIGHT = 2
const DOWN = 3
const LEFT = 4

const rules = {
  BLANK: [0, 0, 0, 0],
  UP: [1, 1, 0, 1],
  RIGHT: [1, 1, 1, 0],
  DOWN: [0, 1, 1, 1],
  LEFT: [1, 0, 1, 1]
}

function preload () {
  tiles[0] = loadImage("tiles/blank.png")
  tiles[1] = loadImage("tiles/up.png")
  tiles[2] = loadImage("tiles/right.png")
  tiles[3] = loadImage("tiles/down.png")
  tiles[4] = loadImage("tiles/left.png")
}


function setup () {
  createCanvas(400, 400)

  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = {
      collapsed: false,
      options: [BLANK, UP, RIGHT, DOWN, LEFT]
    }
  }
}

function draw() {
  background(0)

  const w = width / DIM;
  const h = height / DIM;



  // Pick cell with least entropy
  let gridCopy = grid.slice()
  gridCopy.sort( (a, b) => {
    return a.options.length - b.options.length
  })

  let maxOptionsLen = gridCopy[0].options.length
  gridCopy =  gridCopy.filter( (tile) => {
      return tile.options.length >= maxOptionsLen // make this > later
    })
  const cell = random(gridCopy)
  cell.collapsed = true
  const pick = random(cell.options)
  cell.options = [pick]

  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let cell = grid[i+j * DIM];
      if (cell.collapsed) {
        let index = cell.options
        image(tiles[index], i*w, j*h, w, h)
      } else {
        fill(0)
        stroke(255)
        rect(i*w, j*h, w, h)
      }
    }
  }

  const nextTiles = []
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let index = i + j * DIM
      if (tiles[index].collapsed) {
        nextTiles[index] = tiles[index]
      } else {
        // Look above

        // Look right

        // Look down

        // Look left
    }
  }
  
  noLoop()
}
