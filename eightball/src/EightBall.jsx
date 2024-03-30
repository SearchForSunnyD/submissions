import { useState } from "react";

//Answer states
const states = [
    { msg: "It is certain.", color: "green" },
    { msg: "It is decidedly so.", color: "green" },
    { msg: "Without a doubt.", color: "green" },
    { msg: "Yes - definitely.", color: "green" },
    { msg: "You may rely on it.", color: "green" },
    { msg: "As I see it, yes.", color: "green" },
    { msg: "Most likely.", color: "green" },
    { msg: "Outlook good.", color: "green" },
    { msg: "Yes.", color: "green" },
    { msg: "Signs point to yes.", color: "goldenrod" },
    { msg: "Reply hazy, try again.", color: "goldenrod" },
    { msg: "Ask again later.", color: "goldenrod" },
    { msg: "Better not tell you now.", color: "goldenrod" },
    { msg: "Cannot predict now.", color: "goldenrod" },
    { msg: "Concentrate and ask again.", color: "goldenrod" },
    { msg: "Don't count on it.", color: "red" },
    { msg: "My reply is no.", color: "red" },
    { msg: "My sources say no.", color: "red" },
    { msg: "Outlook not so good.", color: "red" },
    { msg: "Very doubtful.", color: "red" },
];

//Default state
const defaultState = { msg: "Think of a question", color: "black" };

//Generate a random number
function randNum(arr) {
  const num = Math.floor(Math.random() * arr.length);
  return num;
}

//Pull a random fortune
function fortune() {
  const fortune = states[randNum(states)];
  return fortune;
}

//Create and update the ball
function FortuneResponse() {
  const [ball, setBall] = useState(defaultState);

  return (
    <div>
      <div
        className={`magicEight ${ball.color}`}
        onClick={() => setBall(fortune())}
      >
        <span>{ball.msg}</span>
      </div>
      <button onClick={() => setBall(defaultState)}>Reset</button>
    </div>
  );
}

export default FortuneResponse;
