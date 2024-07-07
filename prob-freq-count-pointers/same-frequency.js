function sameFrequency(num1, num2) {
  const str1 = num1.toString();
  const str2 = num2.toString();

  if (str1.length !== str2.length) {
    return false;
  }

  const countDigits = (str) => {
    const count = {};
    for (let char of str) {
      count[char] = (count[char] || 0) + 1;
    }
    return count;
  };

  const count1 = countDigits(str1);
  const count2 = countDigits(str2);

  for (let key in count1) {
    if (count1[key] !== count2[key]) return false;
  }

  return true;
}
