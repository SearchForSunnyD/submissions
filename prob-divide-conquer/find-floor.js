function findFloor(arr, t) {
	let bottom = 0;
	let top = arr.length - 1;
	let result = -1;
	while (bottom <= top) {
		let pvt = Math.floor((bottom + top) / 2);
		if (arr[pvt] <= t) {
			result = arr[pvt];
			bottom = pvt + 1;
		} else {
			top = pvt - 1;
		}
	}
	return result;
}

module.exports = findFloor;
