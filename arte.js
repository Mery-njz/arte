let palette = "c2f970-44344f-564d80-98a6d4-d3fcd5".split("-").map(a => "#"+a)
let inc = 0.05
let scl = 10
let cols, rows
let zoff = 0
let particles = []
let flowfield
const golden_ratio_conjugate = 0.618033988749895
let h = Math.random()

function setup() {
	describe("This sketch contains a group of fluid, HSB colored particles moving driven by a noise flowfield, which symbolizes the fluidity of accessible knowledge.")
	createCanvas(900, 900);
	background("#c3c3c3");
	strokeCap(SQUARE);
	//colorMode(HSB)
	cols = floor(width/scl)
	rows = floor(height/scl)
	
	flowfield = new Array(cols * rows)
	describe("Initialize flowfield array")
	
	
	for(let i=0; i<2000; i++) {
		if (random() > 0.8) {
			h += golden_ratio_conjugate
  		h %= 1
			particles.push(new Particle(getNewVec()))
		} else if (random() < 0.1) {
			particles.push(new Particle())
		}
	}
	describe("Generate particles, symbolizing the spread of knowledge, inclusivity, and accessibility.")
}

function draw() {
	let yoff = 0
	describe("Initialize y offset for noise, making the particles move by time.")
	for (let y=0; y<rows; y++) {
		let xoff = 0
		for (let x=0; x<cols; x++) {
			let index = x + y*cols
			let r = noise(xoff, yoff) * 255
			let angle= noise(xoff, yoff, zoff) * TWO_PI*2
			let cir = TWO_PI
			let mapAng = map(angle, 0, cir*2, -cir, cir)
			let v = p5.Vector.fromAngle(mapAng)
			v.setMag(1)
			flowfield[index] = v
			xoff += inc
			// push()
			// translate(x*scl, y*scl)
			// rotate(v.heading())
			// line(0,0,scl,0)
			// pop()
			//fill(r)
			//rect(x*scl, y*scl, scl, scl)
		}
		yoff+=inc
		zoff+=0.0005
	}
	describe("Loop through rows and columns and store vector in flowfield array, meaning that accessibility help knowledge spread freely.")
	
	for(let i=0; i<particles.length; i++) {
		particles[i].follow(flowfield)
		particles[i].update()
		//particles[i].edges()
		particles[i].show(i)
	}
	describe("Update and display particles")
	
}
const dia = 350
function getNewVec() {
	describe("Function to get a new random vector within a circular area, symbolizing that time and knowledge will grow forever.")
	let vec = createVector(random(width), random(height))
	if (dist(width/2, height/2, vec.x, vec.y) < dia) {
		return vec
	}
	return getNewVec()
}

function Particle(pos) {
	this.pos = pos || createVector(random(width),random(height))
	this.vel = createVector(0,0)//p5.Vector.random2D()//
	this.acc = createVector(0,0)
	this.sw = random() > 0.1 ? random(0.5,3) : random(80)
	this.clr = color(...hsvToRgb(h, 0.6, 0.95))
	this.maxspeed = 1.3
	
	describe("Particle object constructor: Set stroke weight and color. Different attributes of the particles manifest diversity.")
	
	
	this.update = function() {
		this.vel.add(this.acc)
		this.vel.limit(this.maxspeed)
		this.pos.add(this.vel)
		this.acc.mult(0)
		
		if (this.sw > 5) {
			this.sw *= 0.99
		}
	}
	
	this.follow = function(vectors) {
		let x = floor(this.pos.x/scl)
		let y = floor(this.pos.y/scl)
		let index = x + y*cols
		let force = vectors[index]
		this.applyForce(force)
	}
	
	this.applyForce= function(force) {
		this.acc.add(force)
	}
	
	this.show = function(index) {
		push()
		translate(this.pos.x, this.pos.y)
		//rotate(this.vel.heading())
		stroke(this.clr)
		//strokeWeight(this.sw)
		point(0, 0)
		//rect(0,0,10,10)
		
		pop()
		//stroke(this.clr)
		//stroke(palette[index%palette.length])
		
		// fill(this.clr)
		// rect(this.pos.x, this.pos.y, 10, 10)
	}
	
	this.edges = function() {
		// if (this.pos.x > width) this.pos.x = 0
		// if (this.pos.x < 0) this.pos.x = width
		// if (this.pos.y > height) this.pos.y = 0
		// if (this.pos.y < 0) this.pos.y = height
		if (dist(width/2, height/2, this.pos.x, this.pos.y) > dia) {
			this.pos = getNewVec()
		}
		
	}
}

function hsvToRgb(h, s, v) {
	describe("Function to convert HSV color to RGB color")
  let h_i = Math.floor(h * 6);
  let f = h * 6 - h_i;
  let p = v * (1 - s);
  let q = v * (1 - f * s);
  let t = v * (1 - (1 - f) * s);
  
  let r, g, b;
  
  if (h_i === 0) {
    r = v;
    g = t;
    b = p;
  }
  if (h_i === 1) {
    r = q;
    g = v;
    b = p;
  }
  if (h_i === 2) {
    r = p;
    g = v;
    b = t;
  }
  if (h_i === 3) {
    r = p;
    g = q;
    b = v;
  }
  if (h_i === 4) {
    r = t;
    g = p;
    b = v;
  }
  if (h_i === 5) {
    r = v;
    g = p;
    b = q;
  }

  return [Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256)];
}

function mousePressed() {
	particles = []
	for(let i=0; i<100; i++) {
		if (random() > 0.1) {
			particles.push(new Particle())
		}
	}
	describe("Function to regenerate particles on mouse click")
}

function keyTyped() {
	describe("Function to save canvas as image on key press")
	if (key === 's' || key === 'S') {
    saveCanvas('myCanvas', 'png');
  }
  return false;
}
