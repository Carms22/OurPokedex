const router = require("express").Router();
const passport = require('passport');
const miscController = require("../controllers/misc.controller");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const pokemonController = require("../controllers/pokemon.controller")
const authMiddlewares = require("../middlewares/authMiddleware");

const SCOPE = [
  "profile",
  "email"
]

//HOME
router.get("/", miscController.home)

//AUTH
router.get("/register", authController.register)
router.post("/register", authController.doRegister)
router.get("/login", authMiddlewares.isNotAuthenticated, authController.login)
router.post("/login", authController.doLogin)
router.get('/login/google', authMiddlewares.isNotAuthenticated, passport.authenticate('google-auth', { scope: SCOPE  }))
router.get('/auth/google/callback', authMiddlewares.isNotAuthenticated, authController.doLoginGoogle)
router.get("/logout", authMiddlewares.isAuthenticated, authController.logout);



// USERS
router.get("/profile", authMiddlewares.isAuthenticated, usersController.profile);

//POKEMON
router.get("/pokemon/list", authMiddlewares.isAuthenticated, pokemonController.list)
router.get("pokemon/create", authMiddlewares.isAuthenticated, pokemonController.create)
router.post("pokemon/create", authMiddlewares.isAuthenticated, pokemonController.doCreate)
router.get("pokemon/:id", authMiddlewares.isAuthenticated, pokemonController.detail)
router.delete("/pokemon/:id", authMiddlewares.isAuthenticated, pokemonController.delete)

module.exports = router;