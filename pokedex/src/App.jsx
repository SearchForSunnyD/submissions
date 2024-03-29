// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { getTenPokemon } from "./Pokedex";
import PokemonCard from "./Pokecard";

const firstTen = await getTenPokemon();
const nextTen = await getTenPokemon();

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <h1>pokedex</h1>
      <div className="pokemons">
        <div className="pokemonSet">
          {firstTen?.map((m) => (
            <PokemonCard key={m.id} data={m} />
          ))}
        </div>
        <div className="pokemonSet">
          {nextTen?.map((m) => (
            <PokemonCard key={m.id} data={m} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
