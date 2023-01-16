const tiles = []

let grid = []

const DIM = 3 // Dimensions

const BLANK = 0
const UP = 1
const RIGHT = 2
const DOWN = 3
const LEFT = 4

const RULES = {
  BLANK: [0, 0, 0, 0],
  UP:    [1, 1, 0, 1],
  RIGHT: [1, 1, 1, 0],
  DOWN:  [0, 1, 1, 1],
  LEFT:  [1, 0, 1, 1]
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

function checkValid (tile_options, adjacent_options, side_facing_me) {
  // tile_options: [BLANK, UP, RIGHT, DOWN, LEFT]
  // adjacent_options: [UP]
  // side_facing_me: 3
  // 
  // Result, leave only arr: [UP, DOWN, LEFT]
  let idx_to_remove = []

  for (let opt_a of adjacent_options){
    for (let i = 0; i < tile_options; i++){
      console.log(side_facing_me, (2+side_facing_me)%4)
      console.log(opt_a[side_facing_me],tile_options[i][(2+side_facing_me)%4])
      if (opt_a[side_facing_me] != tile_options[i][(2+side_facing_me)%4]){
        idx_to_remove.push(i)
      }
      for (let j = idx_to_remove.length - j; j > -1; i--){
        tile_options.splice(j, 1)
      }
    }
  }
}

function mousePressed() {
  redraw()
}

function draw() {
  background(0)

  const w = width / DIM;
  const h = height / DIM;



  // Pick cell with least entropy
  let gridCopy = grid.slice()
  gridCopy = gridCopy.filter((a) => !a.collapsed)
  gridCopy.sort( (a, b) => {
    return a.options.length - b.options.length
  })
  if (gridCopy.length == 0) {
    return
  }

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

  const nextGrid = []
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      let index = i + j * DIM
      if (grid[index].collapsed) {
        nextGrid[index] = grid[index]
      } else {
        let options = [BLANK, UP, RIGHT, DOWN, LEFT]
        // look up
        if (j > 0){
          let up = grid[i + (j - 1) * DIM]
          let adjacent_options = up.options
          let side_facing_me = 2
          checkValid(options, adjacent_options, side_facing_me)
        } 
        // Look right
        if (i < DIM - 1) {
          let right = grid[i + 1 + j * DIM]
          let adjacent_options = right.options
          let side_facing_me = 3
          checkValid(options, adjacent_options, side_facing_me)
        } 

        // Look down
        if (j < DIM - 1) {
          let down = grid[i + (j + 1) * DIM]
          let adjacent_options = down.options
          let side_facing_me = 0
          checkValid(options, adjacent_options, side_facing_me)
        } 
        // Look left
        if (i > 0) {
          let left = grid[i - 1 + j * DIM]
          let adjacent_options = left.options
          let side_facing_me = 1
          checkValid(options, adjacent_options, side_facing_me)
        } 
        nextGrid[index] = {
          options,
          collapsed: false
        }
      }
    }
  }
  grid = nextGrid
  
  noLoop()
}
