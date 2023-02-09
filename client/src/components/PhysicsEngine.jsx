import "./PhysicsEngine.css";
import React, { useState } from "react";

let ObjectArray = [];
let ctx = null;

function RGB(r, g, b) {
	return "rgb(" + r + "," + g + "," + b + ")";
}

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

	magnitude() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	multiply(n) {
		return new Vector(this.x * n, this.y * n);
	}

	normal() {
		return new Vector(-this.y, this.x);
	}

	static dot(v1, v2) {
		return v1.x * v2.x + v1.y * v2.y;
	}

	unit() {
		if (this.magnitude() === 0) {
			return new Vector(0, 0);
		} else {
			return new Vector(this.x / this.magnitude(), this.y / this.magnitude());
		}
	}
}

class Ball {
	constructor(Position, Radius, Color, Mass, Drag) {
		this.Position = Position;
		this.Radius = Radius;
		this.Color = Color;
		this.Mass = Mass;
		this.Drag = Drag;
		this.Velocity = new Vector(0, 0);
		this.Acceleration = new Vector(0, 0);

		ObjectArray.push(this);
	}

	Draw() {
		this.Velocity = this.Velocity.add(this.Acceleration);
		this.Velocity = this.Velocity.multiply(1 - this.Drag);
		this.Position = this.Position.add(this.Velocity);
		ctx.beginPath();

		ctx.arc(this.Position.x, this.Position.y, this.Radius, 0, 2 * Math.PI);
		ctx.strokeStyle = this.Color;
		ctx.stroke();
		ctx.fillStyle = this.Color;
		ctx.fill();
	}
}

let distanceVector = new Vector(0, 0);

function round(number, precision) {
	let factor = 10 ** precision;
	return Math.round(number * factor) / factor;
}

function coll_det_bb(b1, b2) {
	if (
		b1.Radius + b2.Radius >= b1.Position.subtract(b2.Position).magnitude() &&
		b1.Position.subtract(b2.Position).magnitude() != 0
	) {
		return true;
	} else {
		return false;
	}
}

function pen_res_bb(b1, b2) {
	let dist = b1.Position.subtract(b2.Position);
	let pen_depth = b1.Radius + b2.Radius - dist.magnitude();
	let pen_res = dist.unit().multiply(pen_depth / 2);
	b1.Position = b1.Position.add(pen_res);
	b2.Position = b2.Position.add(pen_res.multiply(-1));
}

function coll_res_bb(b1, b2) {
	let normal = b1.Position.subtract(b2.Position).unit();
	let relVel = b1.Velocity.subtract(b2.Velocity);
	let sepVel = Vector.dot(relVel, normal);
	let new_sepVel = -sepVel;
	let sepVelVec = normal.multiply(new_sepVel);
	b1.Velocity = b1.Velocity.add(sepVelVec);
	b2.Velocity = b2.Velocity.add(sepVelVec.multiply(-1));
}

let ball;
let ball2;

let lastTime;

function Update(time) {
	ctx.clearRect(0, 0, 500, 500);
	ObjectArray.forEach((object, index) => {
		object.Draw();

		for (let i = 0; i < ObjectArray.length; i++) {
			if (coll_det_bb(ObjectArray[index], ObjectArray[i])) {
				pen_res_bb(ObjectArray[index], ObjectArray[i]);
				coll_res_bb(ObjectArray[index], ObjectArray[i]);
			}
		}
	});

	if (lastTime != null) {
		const delta = time - lastTime;
	}

	lastTime = time;

	window.requestAnimationFrame(Update);
}

const Setup = () => {
	ball = new Ball(new Vector(100, 110), 10, RGB(255, 0, 0), 1, 0.05);
	ball2 = new Ball(new Vector(300, 120), 10, RGB(0, 255, 0), 1, 0.05);
	ball.Velocity = new Vector(12, 0);
	console.log("Running Setup");
	let canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	window.requestAnimationFrame(Update);
};

function PhysicsEngine() {
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
		<div className="PEParent">
			<canvas id="canvas" width="500" height="500"></canvas>
		</div>
	);
}

export default PhysicsEngine;
