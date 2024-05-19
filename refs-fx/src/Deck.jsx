import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const Deck = () => {
  const [currDeck, setCurrDeck] = useState([]);
  const [currDeckId, setDeckId] = useState();
  const topCard = currDeck[0];

  const url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

  function newDeck() {
    async function getDeck() {
      const res = await axios.get(url);
      setDeckId(res.data.deck_id);
      setCurrDeck([]);
    }
    getDeck();
  }

  function drawCard() {
    async function getCard() {
      try {
        const res = await axios.get(
          `https://deckofcardsapi.com/api/deck/${currDeckId}/draw`,
        );
        let { code, suit, image, value } = res.data.cards[0];
        console.log(res.data.cards[0]);
        setCurrDeck([
          <Card
            id={code}
            key={code}
            src={image}
            suit={suit}
            value={value}
            zIdx={currDeck.length}
          />,
          ...currDeck,
        ]);
      } catch (err) {
        console.log(err);
        alert("Error: no cards remaining!");
      }
    }

    getCard();

    console.log(topCard);
  }

  useEffect(() => {
    newDeck();
  }, []);

  return (
    <div className="container">
      {!currDeckId ? (
        <div className="load">
          <div></div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <div>
            <button onClick={newDeck}>Shuffle</button>
            <button onClick={drawCard}>Draw</button>
          </div>
          {topCard ? (
            <div className="pile"> {[...currDeck].map((c) => c)} </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Deck;
