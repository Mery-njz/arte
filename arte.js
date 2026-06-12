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
	createCanvas(900, 900);
	background(0); // Mudado para preto inicial para combinar com seu CSS
	strokeCap(SQUARE);
	cols = floor(width/scl)
	rows = floor(height/scl)
	
	flowfield = new Array(cols * rows)
	
	for(let i=0; i<2000; i++) {
		if (random() > 0.8) {
			h += golden_ratio_conjugate
			h %= 1
			particles.push(new Particle(getNewVec()))
		} else if (random() < 0.1) {
			particles.push(new Particle())
		}
	}
}

function draw() {
	// CORREÇÃO 1: Fundo semi-transparente para criar o rastro "brilhante" das partículas
	background(0, 0, 0, 15); 
	
	let yoff = 0
	for (let y=0; y<rows; y++) {
		let xoff = 0
		for (let x=0; x<cols; x++) {
			let index = x + y*cols
			let angle = noise(xoff, yoff, zoff) * TWO_PI * 2
			let v = p5.Vector.fromAngle(angle)
			v.setMag(1)
			flowfield[index] = v
			xoff += inc
		}
		yoff += inc
		zoff += 0.0003 // Deixa o movimento do campo mais suave
	}
	
	for(let i=0; i<particles.length; i++) {
		particles[i].follow(flowfield)
		particles[i].update()
		particles[i].edges() // CORREÇÃO 2: Ativado para as partículas não sumirem infinitamente
		particles[i].show(i)
	}
}

const dia = 350
function getNewVec() {
	let vec = createVector(random(width), random(height))
	if (dist(width/2, height/2, vec.x, vec.y) < dia) {
		return vec
	}
	return getNewVec()
}

function Particle(pos) {
	this.pos = pos || createVector(random(width),random(height))
	this.vel = createVector(0,0)
	this.acc = createVector(0,0)
	this.sw = random() > 0.1 ? random(1, 3) : random(5); // Ajustado o tamanho para pontos brilhantes definidos
	this.clr = color(...hsvToRgb(h, 0.8, 0.95))
	this.maxspeed = 2.0 // Aumentado um pouco a velocidade para o fluxo ficar mais visível
	
	this.update = function() {
		this.vel.add(this.acc)
		this.vel.limit(this.maxspeed)
		this.pos.add(this.vel)
		this.acc.mult(0)
	}
	
	this.follow = function(vectors) {
		let x = floor(this.pos.x/scl)
		let y = floor(this.pos.y/scl)
		// Previne erros caso a partícula saia da área limite por um frame
		if(x >= 0 && x < cols && y >= 0 && y < rows) {
			let index = x + y*cols
			let force = vectors[index]
			this.applyForce(force)
		}
	}
	
	this.applyForce = function(force) {
		this.acc.add(force)
	}
	
	this.show = function(index) {
		push()
		stroke(this.clr)
		strokeWeight(this.sw) // CORREÇÃO 3: Define a espessura para o ponto brilhar
		point(this.pos.x, this.pos.y) // Desenha diretamente na posição atualizada da tela
		pop()
	}
	
	this.edges = function() {
		// Mantém as partículas circulando no meio da tela gerando o efeito luminoso
		if (dist(width/2, height/2, this.pos.x, this.pos.y) > dia) {
			this.pos = getNewVec()
			this.vel.mult(0) // Reinicia a velocidade ao teleportar
		}
	}
}

function hsvToRgb(h, s, v) {
	let h_i = Math.floor(h * 6);
	let f = h * 6 - h_i;
	let p = v * (1 - s);
	let q = v * (1 - f * s);
	let t = v * (1 - (1 - f) * s);
	let r, g, b;
	if (h_i === 0) { r = v; g = t; b = p; }
	if (h_i === 1) { r = q; g = v; b = p; }
	if (h_i === 2) { r = p; g = v; b = t; }
	if (h_i === 3) { r = p; g = q; b = v; }
	if (h_i === 4) { r = t; g = p; b = v; }
	if (h_i === 5) { r = v; g = p; b = q; }
	return [Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256)];
}

function mousePressed() {
	particles = []
	for(let i=0; i<100; i++) {
		if (random() > 0.1) {
			particles.push(new Particle())
		}
	}
}

function keyTyped() {
	if (key === 's' || key === 'S') {
		saveCanvas('myCanvas', 'png');
	}
	return false;
}
