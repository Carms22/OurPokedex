const axios = require('axios')

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL:  "https://pokeapi.co/api/v2"
    });
  }

  getAllPokemon = () => {
    return this.api.get("/pokemon")
  }

  getOnePokemon = () => {
    return  this.api.get(`/pokemon/${id}`)
  }

}

module.exports =  ApiService