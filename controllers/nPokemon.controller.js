const ApiService = require("../services/api.services")
const apiService = new  ApiService()

module.exports.list = (req, res, next) => {
  apiService
    .getAllPokemon()
      .then((response) => {
        let pokemon = response.data.results;
        res.render('npokemon/list', { pokemon: pokemon.slice(0, 151) });
      })
};