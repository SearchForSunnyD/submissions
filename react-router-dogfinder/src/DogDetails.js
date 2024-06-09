import "./DogDetails.css";

export function DogDetails({ dog }) {
  const { name, age, src, facts } = dog;
  return (
    <div className="dog-card">
      <img src={`/${src}.jpg`} alt={`${src}`}></img>
      <div className="details">
        <h3 className="name">{name}</h3>
        <p className="age">Age: {age}</p>
        {facts.map((str) => {
          return <p className="fact" key={str} > {str} </p>;
        })}
      </div>
    </div>
  );
}
