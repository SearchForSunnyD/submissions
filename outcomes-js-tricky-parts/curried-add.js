function curriedAdd(total) {
  if (total === undefined) {
    return 0;
  }
  
  function addNext(number) {
    if (number === undefined) {
      return total;
    } else {
      return curriedAdd(total + number);
    }
  }
  return addNext;
}

module.exports = { curriedAdd };
