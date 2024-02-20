function isBalanced(str, count = { "{": 0, "[": 0, "(": 0 }) {
  if (str.length === 0) {
    return count["{"] === 0 && count["["] === 0 && count["("] === 0
      ? "YES"
      : "NO";
  }

  const currentBracket = str[0];

  if ("{[(".includes(currentBracket)) {
    count[currentBracket]++;
  } else if ("}])".includes(currentBracket)) {
    const openBracket =
      currentBracket === "}" ? "{" : currentBracket === "]" ? "[" : "(";
    if (count[openBracket] === 0) {
      return "NO";
    }
    count[openBracket]--;
  }

  return isBalanced(str.slice(1), count);
}
