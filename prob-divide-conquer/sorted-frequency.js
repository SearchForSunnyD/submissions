function first(arr, t) {
	let bottom = 0;
	let top = arr.length - 1;
	let pvt = -1;

	if (arr[top] < t) {
		return pvt;
	}

	while (bottom <= top) {
		pvt = Math.floor((bottom + top) / 2);
		if (arr[pvt] === t || arr[pvt] > t) {
			top = pvt - 1;
		} else {
			bottom = pvt + 1;
		}
	}
	return pvt;
}

function last(arr, t) {
	let bottom = 0;
	let top = arr.length - 1;
	let pvt = -1;

	while (bottom <= top) {
		pvt = Math.floor((bottom + top) / 2);
		if (arr[pvt] !== t) {
			top = pvt - 1;
		} else {
			bottom = pvt + 1;
		}
	}
	return pvt;
}

function sortedFrequency(arr, t) {
	let bottom = first(arr, t);
	console.log(bottom);
	if (bottom === -1) {
		return -1;
	}
	let top = last(arr.slice(bottom), t);
	console.log(top);
	if (top === 0) {
		return 1;
	}
	return top;
}

module.exports = sortedFrequency;
