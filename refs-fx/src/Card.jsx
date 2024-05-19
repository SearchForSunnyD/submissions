const Card = ({ id, src, suit, value, zIdx }) => {
  function getRandom(mult) {
    /* make a random number that is centered on zero
    ex. an input of 90 will return a random number between -45 and 45
    */
    return Math.random() * mult - mult/2;
  }

  return (
    <>
      <img
        src={src}
        alt={`${value} of ${suit}`}
        id={id}
        style={{
          transform: `rotate(${getRandom(75)}deg)`,
          zIndex: zIdx,
          translate: `${getRandom(5)}em`,
        }}
      />
    </>
  );
};

export default Card;
