let angle = 0;
let ma; // magic angle to make things look nice
let maxD;

function setup(){
    createCanvas(400,400, WEBGL);
    ma = atan(1/sqrt(2));
    maxD = dist(0,0,200,200)
}

function draw(){
    background(100);

    ortho(-300, 300, 300, -300, -200, 1000);
    directionalLight(255, 255, 255, 0, -1, 0);

    rotateX(-ma);
    rotateY(-PI/4);

    let w = 32;
    let offset = 0;

    for (let z = 0; z<height; z+=w){
        for (let x = 0; x<width; x+= w){
            push();
            let d = dist(x,z, width/2, height/2)
            let offset = map(d, 0, maxD, -1, 1)
            let a = angle + offset;
            let h = floor(map(sin(a), -1, 1, 20, 200));
            //normalMaterial();
            ambientMaterial(255);
            translate(x-width/2, 0, z);
            box(w-2, h, w-2);

            fill(255);
            //rect(x-width/2 + w/2,0,w-2,h);
            pop();
        }
    }
    angle -= 0.1;
}
