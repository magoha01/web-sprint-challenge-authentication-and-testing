const db = require("../../data/dbConfig");

function findByName(username) {
  return db("users")
    .where("username", username).first()
}

const create = async (user) => {
  const newUser = await db("users")
    .insert(user)
    .then(([id]) => {
      return db("users").where("id", id).first();
    });
  return newUser;
};

module.exports = {
  findByName,
  create,
};
