import axios from "axios";

async function getAllPokemon() {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0",
    );
    return response.data.results;
  } catch (error) {
    console.error(error.message);
  }
}

const pkmCache = await getAllPokemon();

function randInt(count) {
  return Math.floor(Math.random() * count);
}

async function getPokemon() {
  const rand = pkmCache[randInt(pkmCache.length)].url
  const pokemonResponse = await axios.get(
    `${rand}`,
  );
  return {
    id: pokemonResponse.data.id,
    name: pokemonResponse.data.name,
    types: pokemonResponse.data.types,
    baseExp: pokemonResponse.data.base_experience,
    spriteUrl: pokemonResponse.data.sprites.front_default,
  };
}

async function getTenPokemon() {
  let arr = []
  for (let i = 0; i < 10; i++){
    arr.push(await getPokemon());
  }
  return arr
}

// const tenMons = await getTenPokemon()

export { getTenPokemon };
