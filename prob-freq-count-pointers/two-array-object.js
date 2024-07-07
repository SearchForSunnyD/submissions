// add whatever parameters you deem necessary
function twoArrayObject(arr1, arr2) {
  let obj = {};

  for (let i in arr1) {
    let val = arr2[i] ? arr2[i] : null;
    obj[arr1[i]] = val;
  }

  return obj;
}
