const mongoose = require('mongoose');
const Pokemon = require('../models/Pokemon.model');
const POKEMONS = require('../data/pokemon.json')
// Conectarme a la base de datos

require('../config/db.config');


// VaciarlaS

mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
    .then(() => {
      console.info('Db dropped')

      return Pokemon.create(POKEMONS)
    })
    .then(createdPokemons => {
      createdPokemons.forEach(pokemon => console.log(`${pokemon.name} was created`))

      // Cerrar la conexion
      return mongoose.connection.close()
    })
    .then(() => {
      console.log('Connection closed')

      process.exit(1)
    })
    .catch(err => {
      console.error(err)
      process.exit(0)
    })
})