/* eslint-disable react/prop-types */

const PokemonCard = ({ data }) => {
  return (
    <div className="card">
      <h5> {data.name} </h5>
      <img src={data.spriteUrl} alt="" />
      <p> type:
        {data.types.map((t) => (
          <span key={t.type.name}> {t.type.name} </span>
        ))}
      </p>
      <p> exp: {data.baseExp} </p>
    </div>
  );
};

export default PokemonCard;
