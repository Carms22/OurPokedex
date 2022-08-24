const Pokemon = require("../models/Pokemon.model");
const createError = require("http-errors");

module.exports.list = (req, res, next) => {
  Pokemon.find()
    .then((pokemons) => {
      res.render("pokemon/list", { pokemons })
    })
    .catch((err) =>  next(err))
};

module.exports.create = (req, res, next)  => {
  res.render("pokemon/form")
};

module.exports.doCreate =  (req, res,  next)   => {
  const pokemonToCreate = req.body;
  if (req.file) {
    pokemonToCreate.image = req.file.path
  }

  Pokemon.create(pokemonToCreate)
    .then((pokemon)  =>  {
      res.redirect(`/pokemons/${pokemon._id}`)
    })
    .catch((err) => next(err))
};

module.exports.detail = (req, res, next) => {
  const { id } = req.params

  Pokemon.findById(id)
    .then((pokemon) => {
      res.render("pokemon/detail", { pokemon })
    })
    .catch((err) => next(err))
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Pokemon.findByIdAndDelete(id)
    .then((pokemon)  =>  {
      res.status(204).send(pokemon)
    })
    .catch((err) => {
      next(createError(404,  "Pokemon not found"))
    })
}