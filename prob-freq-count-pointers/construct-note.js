// add whatever parameters you deem necessary
function constructNote(msg, letters) {
  if (msg.length === 0) return true;

  if (letters.length === 0) return false;

  let map = new Map();
  for (let char of letters) {
    if (!map.get(char)) map.set(char, 1);
    else map.set(char, map.get(char) + 1);
  }

  for (let char of msg) {
    if (!map.get(char) || map.get(char) === 0) return false;
    map.set(char, map.get(char) - 1);
  }
  return true;
}
