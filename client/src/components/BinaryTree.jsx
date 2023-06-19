import { useEffect, useState } from "react";
import "./BinaryTree.css";

let Array = [50, 15, 13, 63, 17, 67, 83, 43, 5, 13, 8];

function Tree() {
	this.root = null;
}
var ctx;
var tree;

Tree.prototype.addValue = function (val) {
	var n = new Node(val);
	if (this.root == null) {
		this.root = n;
		this.root.x = 1000 / 2;
		this.root.y = 10;
		ctx.fillText(this.root.value, this.root.x, this.root.y);
	} else {
		this.root.addNode(n, 1000, 1);
	}
};

function Node(value, x, y) {
	this.x = x;
	this.y = y;
	this.value = value;
	this.left = null;
	this.right = null;
}
Node.prototype.addNode = function (n, w, level) {
	if (n.value < this.value) {
		if (this.left == null) {
			this.left = n;
			this.left.x = this.x - w / 2 ** (level + 1);
			this.left.y = this.y + 200 / (level + 1);
			ctx.fillText(this.left.value, this.left.x, this.left.y);
			ctx.beginPath();
			ctx.moveTo(this.left.x, this.left.y);
			ctx.lineTo(this.x, this.y);
			ctx.stroke();
		} else {
			this.left.addNode(n, w, level + 1);
		}
	} else if (n.value > this.value) {
		if (this.right == null) {
			this.right = n;
			this.right.x = this.x + w / 2 ** (level + 1);
			this.right.y = this.y + 200 / (level + 1);
			let fontSize = Math.max(10 / level, 10); // Decreases font size as level increases but not less than 10.
			ctx.font = `${fontSize}px Arial`;
			ctx.fillText(this.right.value, this.right.x, this.right.y);
			ctx.beginPath();
			ctx.moveTo(this.right.x, this.right.y);
			ctx.lineTo(this.x, this.y);
			ctx.stroke();
		} else {
			this.right.addNode(n, w, level + 1);
		}
	}
};
function BinaryTree() {
	useEffect(() => {
		ctx = document.getElementById("BinaryTreeCanvas").getContext("2d");
		ctx.strokeStyle = "#FFFFFF";
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "20px arial";
		//ctx.fillText("50", 250, 50);

		tree = new Tree();

		tree.addValue(50);
		for (let i = 0; i < 100; i++) {
			tree.addValue(Math.round(Math.random() * 100));
		}

		console.log(tree);
	}, []);
	return (
		<div className="BinaryTree">
			<canvas id="BinaryTreeCanvas" width={1000} height={500}></canvas>
		</div>
	);
}

export default BinaryTree;
