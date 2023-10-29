function findRotationCount(arr) {
	let bottom = 0;
	let top = arr.length - 1;
	let max = top;
	while (bottom <= top) {
		if (arr[bottom] <= arr[top]) {
			return bottom;
		}
		let pvt = Math.floor((bottom + top) / 2);
		if (arr[pvt] < arr[top]) {
			return pvt;
		} else if (arr[pvt] > arr[top]) {
			bottom = pvt + 1;
		} else {
			top = pvt - 1;
		}
	}
}

module.exports = findRotationCount;
