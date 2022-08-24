const ApiService = require("../services/api.services")
const apiService = new  ApiService()

module.exports.list = (req, res, next) => {
  apiService
    .getAllPokemon()
      .then((response) => {
        let pokemon = response.data.results;
        const pokemonWithId = pokemon.map(item => {
          return {
            ...item,
            id: item.url.slice(34, -1)
          }
        })
        console.log(pokemonWithId);
        res.render('npokemon/list', { pokemon: pokemonWithId.slice(0, 151)});
      })
};