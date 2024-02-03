function numCall() {
  Promise.all(
    Array.from({ length: 4 }, () => {
      return axios.get(`http://numbersapi.com/15`);
    }),
  ).then((facts) => {
    facts.forEach((resp) =>
      $(`#fact_div`).append(
        `<span class="bg-light border">${resp.data}</span>`,
      ),
    );
  });
}

let deckId = null;

axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle`).then((resp) => {
  deckId = resp.data.deck_id;
});
function cardCall() {
  console.log("call");
  axios
    .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`)
    .then((resp) =>
      $(`#card_div`).html(
        `<img src="${resp.data.cards[0].image}" height=auto width=200></img>`,
      ),
    );
}
function randInt(count) {
  return Math.floor(Math.random() * count);
}
let cache = [];
function getAllPokemon() {
  axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then((resp) => {
      cache = resp.data.results;
    });
}
getAllPokemon();
function getThreePokemon() {
  var numbers = [];

  while (numbers.length < 3) {
    var randomNumber = randInt(cache.length);

    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  const axiosRequests = numbers.map((number) =>
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .then((pokemonResponse) => {
        const spriteUrl = pokemonResponse.data.sprites.front_default;

        return axios
          .get(pokemonResponse.data.species.url)
          .then((speciesResponse) => {
            const pokemonName = pokemonResponse.data.name;
            const flavorTextEntries =
              speciesResponse.data.flavor_text_entries.find(
                (entry) => entry.language.name === "en",
              );
            const flavorText = flavorTextEntries
              ? flavorTextEntries.flavor_text
              : "Flavor text not available.";

            $(`#pkm_div`).append(`<div class="container col mt-4">
                                      <div class="card" style="width: 12rem;">
                                          <img src="${spriteUrl}" class="card-img-top" alt="Image Alt Text">
                                          <div class="card-body">
                                              <h5 class="card-title">${pokemonName}</h5>
                                              <p class="card-text">${flavorText}</p>
                                          </div>
                                      </div>
                                  </div>`);
          });
      }),
  );

  Promise.all(axiosRequests).catch((error) => {
    console.error(error.message);
  });
}


