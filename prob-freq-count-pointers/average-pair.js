// add whatever parameters you deem necessary
function avg(num1, num2) {
  return (num1+num2)/2
}

function averagePair(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let result = avg(arr[left], arr[right])
    if (result === target) return true
    else if (result > target) right--
    else left ++
  }
  return false
}

