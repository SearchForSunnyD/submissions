// add whatever parameters you deem necessary
function longestFall(arr) {
  if (arr.length === 0) return 0;

  let highScore = 1;
  let score = 1;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      score++;
      if (score > highScore) highScore = score;
    } else score = 1;
  }
  return highScore;
}
