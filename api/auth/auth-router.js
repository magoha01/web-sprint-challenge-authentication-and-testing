const router = require("express").Router();
const { validateRegistration, validateLogin } = require("./auth-middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secrets/index");
const Users = require("../users/users-model");

const buildToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.user_name,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

router.post("/register", validateRegistration, (req, res, next) => {
  const { username, password } = req.body;
  const { id } = req.params;
  const hash = bcrypt.hashSync(password, 8);
  Users.create({ id, username, password: hash })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.post("/login", validateLogin, (req, res, next) => {
  const { username, password } = req.body;
  Users.findByName(username)
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = buildToken(user);
        res.status(200).json({
          message: `welcome, ${username}`,
          token,
        });
      } else {
        res.status(401).json({
          message: "invalid credentials",
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
