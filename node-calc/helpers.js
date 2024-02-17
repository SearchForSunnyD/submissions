function convert(inp) {
  if (inp.length === 0) {
    throw new Error("Input array is empty");
  }

  return inp.split(", ").map((val) => {
    if (Number(val)) {
      return Number(val);
    } else {
      throw new Error("Invalid number format");
    }
  });
}

function createFreqMap(arr) {
  return arr.reduce((obj, val) => {
    obj[val] = (obj[val] || 0) + 1;
    return obj;
  }, {});
}

function mean(arr) {
  const sum = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  return sum / arr.length;
}

function median(arr) {
  const mid = Math.floor(arr.length / 2);

  arr.sort((a, b) => a - b);

  return arr.length % 2 ? arr[mid] : (arr[mid] + arr[mid - 1]) / 2;
}

function mode(arr) {
  const freqMap = createFreqMap(arr);

  const maxFreq = Math.max(...Object.values(freqMap));

  return Object.keys(freqMap).filter((key) => freqMap[key] === maxFreq);
}

module.exports = { mode, median, mean, convert };
