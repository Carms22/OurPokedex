const router = require("express").Router();
const passport = require('passport');
const miscController = require("../controllers/misc.controller");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
//const pokemonController = require("../controllers/pokemon.controller")
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
router.get("/logout", authMiddlewares.isAuthenticated, authController.logout);


// USERS
router.get("/profile", authMiddlewares.isAuthenticated, usersController.profile);


module.exports = router;