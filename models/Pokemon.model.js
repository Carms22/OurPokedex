const mongoose = require("mongoose");

const STATUS = ['Teacher Almighty', 'Your Highness TA', 'Peasant Student']
const PROFILE = ['Technical', 'Artistic', 'Marketing', 'Healthcare', 'Entrepreneur']

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "Name must contain at least 3 characters"],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: STATUS
  },
  profile: {
    type: String,
    required: true,
    enum: PROFILE
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    minLength: [30, "Description must contain at least 30 characters"],
    maxLength: [150, "Description cannot contain more  then 150 characters"]
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/plasoironhack/image/upload/v1644663323/ironhack/multer-example/icono-de-li%CC%81nea-perfil-usuario-si%CC%81mbolo-empleado-avatar-web-y-disen%CC%83o-ilustracio%CC%81n-signo-aislado-en-fondo-blanco-192379539_jvh06m.jpg",
  },
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;