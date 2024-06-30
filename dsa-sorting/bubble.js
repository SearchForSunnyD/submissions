function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let swap = false;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        let t = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = t;
        swap = true;
      }
    }
    if (!swap) break;
  }
  return arr;
}

module.exports = bubbleSort;
