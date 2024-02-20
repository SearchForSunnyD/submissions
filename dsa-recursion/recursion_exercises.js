function product(arr, n = 0) {
  let val = arr[n];
  if (n < arr.length - 1) {
    val *= product(arr, n + 1);
  }
  return val;
}

