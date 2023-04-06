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

export default Vector;
