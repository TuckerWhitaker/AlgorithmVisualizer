import "./Boids.css";
import React, { useState } from "react";
let ctx = null;

const flock = [];

class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	add(v) {
		return new Vector(this.x + v.x, this.y + v.y);
	}
	subtract(v) {
		return new Vector(this.x - v.x, this.y - v.y);
	}

	divide(n) {
		return new Vector(this.x / n, this.y / n);
	}

	magnitude() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	multiply(n) {
		return new Vector(this.x * n, this.y * n);
	}

	normal() {
		return new Vector(-this.y, this.x);
	}

	distance(v) {
		let sideA = Math.round(v.x - this.x);
		let sideB = Math.round(v.y - this.y);
		return Math.sqrt(sideA ** 2 + sideB ** 2);
	}

	static dot(v1, v2) {
		return v1.x * v2.x + v1.y * v2.y;
	}

	setMag(n) {
		let Mag = Math.sqrt(this.x * this.x + this.y * this.y);
		this.x = (this.x * n) / Mag;
		this.y = (this.y * n) / Mag;
	}

	unit() {
		if (this.magnitude() === 0) {
			return new Vector(0, 0);
		} else {
			return new Vector(this.x / this.magnitude(), this.y / this.magnitude());
		}
	}
}

class Bird {
	constructor() {
		this.Position = new Vector(Math.random() * 1500, Math.random() * 1000);
		this.Velocity = new Vector(Math.random() * 10 - 5, Math.random() * 10 - 5);
		this.Acceleration = new Vector(0, 0);
		this.maxForce = 0.2;
		this.maxSpeed = 5;
	}

	draw() {
		ctx.strokeStyle = "#ffffff";
		ctx.beginPath();
		let height = 50 * Math.cos(Math.PI / 6);

		/*
        let height = 200 * Math.cos(Math.PI / 6);

context.beginPath();
context.moveTo(100, 300);
context.lineTo(300, 300);
context.lineTo(200, 300 - height);
context.closePath(); */

		ctx.arc(this.Position.x, this.Position.y, 5, 0, 2 * Math.PI);
		ctx.stroke();
	}

	flock(boids) {
		this.Acceleration.multiply(0);
		let alignment = this.align(boids);
		let cohesion = this.cohesion(boids);
		let seperation = this.seperation(boids);

		this.Acceleration = this.Acceleration.add(alignment);
		this.Acceleration = this.Acceleration.add(cohesion);
		this.Acceleration = this.Acceleration.add(seperation);
	}

	sides() {
		if (this.Position.x < 0) {
			this.Position.x = 1500;
		}
		if (this.Position.y < 0) {
			this.Position.y = 1000;
		}
		if (this.Position.x > 1500) {
			this.Position.x = 0;
		}
		if (this.Position.y > 1000) {
			this.Position.y = 0;
		}
	}

	update() {
		this.Position = this.Position.add(this.Velocity);
		this.Velocity = this.Velocity.add(this.Acceleration);
		this.Acceleration = this.Acceleration.multiply(0);
	}

	align(boids) {
		let MaxDistance = 200;
		let steering = new Vector(0, 0);
		let total = 0;
		for (let other of boids) {
			let distance = this.Position.distance(other.Position);

			if (distance < MaxDistance && other != this) {
				steering = steering.add(other.Velocity);
				total++;
			}
		}
		if (total > 0) {
			steering = steering.divide(total);
			steering.setMag(this.maxSpeed);
			steering = steering.subtract(this.Velocity);
			if (steering.x > this.maxForce) {
				steering.x = this.maxForce;
			}
			if (steering.x < -this.maxForce) {
				steering.x = -this.maxForce;
			}
			if (steering.y > this.maxForce) {
				steering.y = this.maxForce;
			}
			if (steering.y < -this.maxForce) {
				steering.y = -this.maxForce;
			}
		}

		return steering;
	}

	cohesion(boids) {
		let MaxDistance = 200;
		let steering = new Vector(0, 0);
		let total = 0;
		for (let other of boids) {
			let distance = this.Position.distance(other.Position);

			if (distance < MaxDistance && other != this) {
				steering = steering.add(other.Position);
				total++;
			}
		}
		if (total > 0) {
			steering = steering.divide(total);
			steering = steering.subtract(this.Position);
			steering.setMag(this.maxSpeed);
			steering = steering.subtract(this.Velocity);
			if (steering.x > this.maxForce) {
				steering.x = this.maxForce;
			}
			if (steering.x < -this.maxForce) {
				steering.x = -this.maxForce;
			}
			if (steering.y > this.maxForce) {
				steering.y = this.maxForce;
			}
			if (steering.y < -this.maxForce) {
				steering.y = -this.maxForce;
			}
		}

		return steering;
	}
	seperation(boids) {
		let MaxDistance = 200;
		let steering = new Vector(0, 0);
		let total = 0;
		for (let other of boids) {
			let distance = this.Position.distance(other.Position);

			if (distance < MaxDistance && other != this) {
				let diff = this.Position.subtract(other.Position);
				diff.multiply(distance);
				steering = steering.add(diff);
				total++;
			}
		}
		if (total > 0) {
			steering = steering.divide(total);
			steering.setMag(this.maxSpeed);
			steering = steering.subtract(this.Velocity);
			if (steering.x > this.maxForce) {
				steering.x = this.maxForce;
			}
			if (steering.x < -this.maxForce) {
				steering.x = -this.maxForce;
			}
			if (steering.y > this.maxForce) {
				steering.y = this.maxForce;
			}
			if (steering.y < -this.maxForce) {
				steering.y = -this.maxForce;
			}
		}

		return steering;
	}
}

let lastTime;

function Update(time) {
	ctx.fillStyle = "#00";
	//ctx.clearRect(0, 0, 1500, 1000);
	ctx.globalAlpha = 0.2;
	ctx.fillRect(0, 0, 1500, 1000);
	ctx.globalAlpha = 1.0;

	for (let bird of flock) {
		bird.flock(flock);
		bird.sides();
		bird.draw();
		bird.update();
	}

	if (lastTime != null) {
		const delta = time - lastTime;
	}

	lastTime = time;

	window.requestAnimationFrame(Update);
}

const Setup = () => {
	for (let i = 0; i < 50; i++) {
		flock.push(new Bird());
	}

	console.log("Running Setup");
	let canvas = document.getElementById("BoidCanvas");
	ctx = canvas.getContext("2d");

	window.requestAnimationFrame(Update);
};

function Boids() {
	function Delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	async function start() {
		await Delay(100);
		Setup();
	}

	start();

	return (
		<div className="BoidsParent">
			<div className="BoidDisplay">
				<canvas id="BoidCanvas" width={1500} height={1000}></canvas>
			</div>
		</div>
	);
}

export default Boids;
