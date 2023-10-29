function findRotatedIndex(arr, t) {
	let bottom = 0;
	let top = arr.length - 1;
	while (bottom <= top) {
		let pvt = Math.floor((bottom + top) / 2);
		if (arr[pvt] === t) {
			return pvt;
		}
		if (arr[bottom] <= arr[pvt]) {
			if (arr[bottom] <= t && t < arr[pvt]) {
				top = pvt - 1;
			} else {
				bottom = pvt + 1;
			}
		} else {
			if (arr[pvt] < t && t <= arr[top]) {
				bottom = pvt + 1;
			} else {
				top = pvt - 1;
			}
		}
	}
	return -1;
}

module.exports = findRotatedIndex;
