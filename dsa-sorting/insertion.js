function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1
    let check = arr[i]
    while (j >= 0 && arr[j] > check) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = check;
  }
  return arr
}

module.exports = insertionSort;
