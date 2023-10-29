function countZeroes(arr) {
	let bottom = 0;
	let top = arr.length - 1;

	while (bottom <= top) {
		let pvt = Math.floor((bottom + top) / 2);
		if (arr[pvt] === 0) {
			top = pvt - 1;
		} else {
			bottom = pvt + 1;
		}
    }
    return arr.length - bottom;
}

module.exports = countZeroes;
