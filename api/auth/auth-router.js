const router = require("express").Router();
const { validateRegistration} = require("./auth-middleware");
//const bcrypt = require("bcryptjs");
//const jwt = require('jsonwebtoken')
//const { JWT_SECRET } = require("../../secrets/index");

router.post("/register", validateRegistration, (req, res, next) => {
  res.json({message: "registration endpoint"})
next()
});

// router.post("/login", validateLogin, (req, res, next) => {
//   res.json({ message: "registration endpoint" });
//   next()
// });

module.exports = router;