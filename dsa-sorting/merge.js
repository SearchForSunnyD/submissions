function merge(arr1, arr2) {
  const returnArr = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      returnArr.push(arr1[i]);
      i++;
    } else {
      returnArr.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    returnArr.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    returnArr.push(arr2[j]);
    j++;
  }

  return returnArr;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

module.exports = { merge, mergeSort };
