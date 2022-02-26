const Users = require("../users/users-model");

const validateRegistration = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const name = await Users.findByName(username);
    if (!username || !username.trim() || !password || !password.trim()) {
      next({ status: 401, message: "username and password required" });
    } else if (name) {
      next({ status: 401, message: "username taken" });
    } else {
      req.username = username;
      req.password = password;
      next();
    }
  } catch (err) {
    next({ message: err.message });
  }
};

const validateLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const name = await Users.findByName(username);
    if (!username || !username.trim() || !password || !password.trim()) {
      next({ status: 400, message: "username and password required" });
    } else if (!name) {
      next({ status: 401, message: "invalid credentials" });
    } else {
      req.username = username;
      req.password = password;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateRegistration,
  validateLogin,
};
