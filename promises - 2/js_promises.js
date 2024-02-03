async function numCall() {
  try {
    const facts = await Promise.all(
      Array.from({ length: 4 }, async () => {
        const response = await axios.get(`http://numbersapi.com/15`);
        return response.data;
      }),
    );
    $(`#fact_div`).html("");
    facts.forEach((fact) =>
      $(`#fact_div`).append(`<span class="bg-light border">${fact}</span>`),
    );
  } catch (error) {
    console.error(error.message);
  }
}

let deckId = null;

async function initializeDeck() {
  try {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/new/shuffle`,
    );
    deckId = response.data.deck_id;
  } catch (error) {
    console.error(error.message);
  }
}

initializeDeck();

async function cardCall() {
  try {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/`,
    );
    $(`#card_div`).html(
      `<img src="${response.data.cards[0].image}" height=auto width=200></img>`,
    );
  } catch (error) {
    console.error(error.message);
  }
}

function randInt(count) {
  return Math.floor(Math.random() * count);
}

let pkmCache = [];

async function getAllPokemon() {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    );
    pkmCache = response.data.results;
  } catch (error) {
    console.error(error.message);
  }
}

getAllPokemon();

async function getThreePokemon() {
  var selectedPkm = [];

  while (selectedPkm.length < 3) {
    var randomNumber = randInt(pkmCache.length);

    if (!selectedPkm.includes(randomNumber)) {
      selectedPkm.push(pkmCache[randomNumber].name);
    }
  }
  $(`#pkm_div`).html("");

  const axiosRequests = selectedPkm.map(async (pkm) => {
    try {
      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pkm}`,
      );
      const spriteUrl = pokemonResponse.data.sprites.front_default;

      const speciesResponse = await axios.get(pokemonResponse.data.species.url);
      const pokemonName = pokemonResponse.data.name;
      const flavorTextEntries = speciesResponse.data.flavor_text_entries.find(
        (entry) => entry.language.name === "en",
      );
      const flavorText = flavorTextEntries
        ? flavorTextEntries.flavor_text
        : "Flavor text not available.";

      $(`#pkm_div`).append(genPkmCard(spriteUrl, pokemonName, flavorText));
    } catch (error) {
      console.error(error.message);
    }
  });

  try {
    await Promise.all(axiosRequests);
  } catch (error) {
    console.error(error.message);
  }
}

function genPkmCard(img, name, text) {
  return `<div class="container col mt-4">
              <div class="card" style="width: 12rem;">
                  <img src="${img}" class="card-img-top" alt="Image Alt Text">
                  <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <p class="card-text">${text}</p>
                  </div>
              </div>
          </div>`;
}
