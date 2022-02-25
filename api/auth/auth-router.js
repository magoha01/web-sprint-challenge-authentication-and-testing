const router = require("express").Router();
const { validateRegistration } = require("./auth-middleware");
const bcrypt = require("bcryptjs");
//const jwt = require('jsonwebtoken')
//const { JWT_SECRET } = require("../../secrets/index");
const Users = require("../users/users-model");

router.post("/register", validateRegistration, (req, res, next) => {
  const { username, password } = req.body;
  const { id } = req.params;
  const hash = bcrypt.hashSync(password, 8);
  Users.create({ username, password: hash, id })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

// router.post("/login", validateLogin, (req, res, next) => {
//   res.json({ message: "registration endpoint" });
//   next()
// });

module.exports = router;
