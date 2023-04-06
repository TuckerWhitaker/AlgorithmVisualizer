import React, { useState } from "react";
import "./Water.css";

let ctx = undefined;
let lastTime;

let state = [];
for (let i = 0; i < 500; i++) {
	state.push();
}

class Creature {
	constructor() {
		this.x = Math.random() * 500;
		this.y = Math.random() * 500;
		this.width = 0;
		this.height = 0;
		this.speed = 0;
		this.color = "#000000";
	}

	search() {}
}

function Water() {
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

	function Blur() {
		console.log("blur");
		let currentState = state;
		for (let i = 0; i < state.length; i++) {
			for (let j = 0; j < state.length; j++) {
				if (i > 0 && j > 0 && i < state.length - 1 && j < state.length - 1) {
					let average =
						(state[i][j] +
							state[i][j + 1] +
							state[i][j - 1] +
							state[i + 1][j] +
							state[i + 1][j + 1] +
							state[i + 1][j - 1] +
							state[i - 1][j] +
							state[i - 1][j + 1] +
							state[i - 1][j - 1]) /
						9;

					currentState[i][j] = average;
				}
			}
		}
		for (let i = 0; i < state.length; i++) {
			for (let j = 0; j < state[i].length; j++) {
				ctx.fillStyle =
					"rgb( " +
					state[i][j] * 255 +
					", " +
					state[i][j] * 255 +
					", " +
					state[i][j] * 255 +
					")";
				ctx.fillRect(j, i, 1, 1);
			}
		}

		state = currentState;
	}

	function Update(time) {
		//ctx.fillStyle = "#2e633c";
		//ctx.strokeStyle = "#2e633c";
		ctx.fillRect(500, 500, 1, 1);
		//ctx.fillStyle = "#00000";
		/*
		for (let i = 0; i < state.length; i++) {
			for (let j = 0; j < state[i].length; j++) {
				ctx.fillStyle =
					"rgb( " +
					state[i][j] * 255 +
					", " +
					state[i][j] * 255 +
					", " +
					state[i][j] * 255 +
					")";
				ctx.fillRect(j, i, 1, 1);
			}
		}
*/
		if (lastTime != null) {
			const delta = time - lastTime;
		}

		lastTime = time;
		window.requestAnimationFrame(Update);
	}

	const Setup = () => {
		let canvas = document.getElementById("WaterCanvas");
		ctx = canvas.getContext("2d");

		let food = 0;
		let empty = 0;

		for (let i = 0; i < 500; i++) {
			state.push([]);
			for (let j = 0; j < 500; j++) {
				let random = Math.random();

				ctx.fillStyle =
					"rgb( " +
					random * 255 +
					", " +
					random * 255 +
					", " +
					random * 255 +
					")";
				//console.log("rgb( " + random + ", " + random + ", " + random + ")");
				ctx.fillRect(j, i, 1, 1);
				state[i].push(random);
			}
		}
		console.log(food);
		console.log(empty);
		console.log("startup finished");

		window.requestAnimationFrame(Update);
	};

	return (
		<div>
			<canvas id="WaterCanvas" width={500} height={500}></canvas>
			<button
				onClick={() => {
					Blur();
				}}
			>
				Blur
			</button>
		</div>
	);
}

export default Water;
