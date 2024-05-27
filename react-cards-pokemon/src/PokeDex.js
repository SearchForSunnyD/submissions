import React from "react";
import "./PokeDex.css";
import PokemonCard from "./PokemonCard";
import PokemonSelect from "./PokemonSelect";
import { useAxios } from "./hook";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const url = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemon, addPokemon, clearPokemon] = useAxios(url, (data) => {
    return {
      front: data.sprites.front_default,
      back: data.sprites.back_default,
      name: data.name,
      stats: data.stats.map((stat) => ({
              value: stat.base_stat,
              name: stat.stat.name,
            })),
    };
  });

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} />
        <button onClick={clearPokemon}>Clear all pokemon!</button>
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map((cardData) => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
