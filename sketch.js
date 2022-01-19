let ghosts = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  
  for (var i = 0; i < 10; i++) {
    ghosts.push(new Ghost());
  }

  noStroke();
}

function draw() {
  background(32);
  for (const ghost of ghosts) {
    ghost.moveAndDraw();
  }
}


class Ghost {

  constructor() {

    this.tail = [];
    this.tailLength = 30;

  
    this.ghostSize = random(10, 100);
    this.ghostX = random(width);
    this.ghostY = random(height);

    this.cosOffset = random(100);
    this.wiggliness = random(2, 10);
    this.floatiness = random(2, 10);


   
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  moveAndDraw() {

    
    this.ghostX += cos((this.cosOffset + frameCount) / 10) * this.wiggliness;
   
    this.ghostY -= this.floatiness;
   
    if (this.ghostY < -this.ghostSize) {
      this.ghostY = height + this.ghostSize;
    }

    
    this.tail.unshift({x: this.ghostX, y: this.ghostY});
   
    if (this.tail.length > this.tailLength) {
      this.tail.pop();
    }


   
    for (let index = 0; index < this.tail.length; index++) {
      const tailPoint = this.tail[index];

    
      const pointSize = this.ghostSize * (this.tail.length - index) / this.tail.length;
      const pointAlpha = 255 * (this.tail.length - index) / this.tail.length;

      fill(this.r, this.g, this.b, pointAlpha);
      ellipse(tailPoint.x, tailPoint.y, pointSize);
    }

   
    fill(32);
    ellipse(this.ghostX - this.ghostSize * .2,
            this.ghostY - this.ghostSize * .1,
            this.ghostSize * .2);
    ellipse(this.ghostX + this.ghostSize * .2,
            this.ghostY - this.ghostSize * .1,
            this.ghostSize * .2);
    ellipse(this.ghostX,
            this.ghostY + this.ghostSize * .2,
            this.ghostSize * .2);
  }
}