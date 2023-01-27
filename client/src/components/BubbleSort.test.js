let array = [];
for (let i = 0; i < 50; i++) {
	array.push(Math.round(Math.random() * 50));
}

for (let i = 0; i < array.length - 1; i++) {
	if (array[i] > array[i + 1]) {
		let temp = array[i];
		array[i] = array[i + 1];
		array[i + 1] = temp;
		i -= 2;
	}
}

console.log(array);

test("should be in least to greatest order", () => {
	for (let i = 0; i < array.length - 1; i++) {
		expect(array[i]).toBeLessThanOrEqual(array[i + 1]);
	}
});
