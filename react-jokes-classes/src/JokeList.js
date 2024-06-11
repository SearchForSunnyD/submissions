import axios from "axios";
import { useEffect, useState } from "react";

import "./JokeList.css";

import Joke from "./Joke";

/** List of jokes. */

// class JokeList extends Component {
//   static defaultProps = {
//     numJokesToGet: 5,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       jokes: [],
//       isLoading: true,
//     };

//     this.generateNewJokes = this.generateNewJokes.bind(this);
//     this.vote = this.vote.bind(this);
//   }

//   /* at mount, get jokes */

//   componentDidMount() {
//     this.getJokes();
//   }

//   /* retrieve jokes from API */

//   async getJokes() {
//     try {
//       // load jokes one at a time, adding not-yet-seen jokes
//       let jokes = [];
//       let seenJokes = new Set();

//       while (jokes.length < this.props.numJokesToGet) {
//         let res = await axios.get("https://icanhazdadjoke.com", {
//           headers: { Accept: "application/json" },
//         });
//         let { ...joke } = res.data;

//         if (!seenJokes.has(joke.id)) {
//           seenJokes.add(joke.id);
//           jokes.push({ ...joke, votes: 0 });
//         } else {
//           console.log("duplicate found!");
//         }
//       }

//       this.setState({ jokes, isLoading: false });
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   /* empty joke list, set to loading state, and then call getJokes */

//   generateNewJokes() {
//     this.setState({ isLoading: true });
//     this.getJokes();
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   vote(id, delta) {
//     this.setState((st) => ({
//       jokes: st.jokes.map((j) =>
//         j.id === id ? { ...j, votes: j.votes + delta } : j,
//       ),
//     }));
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   render() {
//     let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
//     if (this.state.isLoading) {
//       return (
//         <div className="loading">
//           <i className="fas fa-4x fa-spinner fa-spin" />
//         </div>
//       );
//     }

//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={this.generateNewJokes}>
//           Get New Jokes
//         </button>

//         {sortedJokes.map((j) => (
//           <Joke
//             text={j.joke}
//             key={j.id}
//             id={j.id}
//             votes={j.votes}
//             vote={this.vote}
//           />
//         ))}
//       </div>
//     );
//   }
// }

// export default JokeList;

/** Refactored */

export default function JokeList({ numJokes = 5 }) {
  const [isLoading, setIsLoading] = useState(true);
  const [jokeArray, setJokeArray] = useState([]);

  useEffect(() => {
    async function getJokes() {
      let jokes = [...jokeArray];
      let seenJokes = new Set();

      while (seenJokes.size < numJokes) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" },
        });
        let { ...joke } = res.data;
        let toAdd = {
          joke: joke.joke,
          id: joke.id,
          votes: 0,
        };

        if (!seenJokes.has(toAdd)) {
          seenJokes.add(toAdd);
        } else {
          console.log("duplicate found!");
        }
      }

      seenJokes.forEach((j) => jokes.push(j));
      setJokeArray(jokes);
      setIsLoading(false);
    }

    if (jokeArray.length === 0) getJokes();
  }, [jokeArray, numJokes]);

  function getNewJokes() {
    setJokeArray([]);
    setIsLoading(true);
  }

  function vote(id, change) {
    setJokeArray(
      jokeArray.map((j) =>
        j.id === id ? { ...j, votes: j.votes + change } : j,
      ),
    );
  }

  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    );
  } else {
    let sortedJokes = [...jokeArray].sort((a, b) => b.votes - a.votes);

    return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={getNewJokes}>
          Get New Jokes
        </button>

        {sortedJokes.map(({ joke, id, votes }) => (
          <Joke text={joke} key={id} id={id} votes={votes} vote={vote} />
        ))}
      </div>
    );
  }
}
