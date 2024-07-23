function guessingGame() {
  const target = Math.floor(Math.random() * 100)

  let count = 0
  let gameOver = false

  return (guess) => {
    if (gameOver) return "The game is over, you already won!";
    
    count++
    
    if (guess === target) {
      gameOver = true
      return `You win! You found ${target} in ${
        count === 1 ? `1 guess` : `${count} guesses`
      }.`;
    } else if (guess < target) return `${guess} is too low!`;
    else return `${guess} is too high!`;
  }
}

module.exports = { guessingGame };
