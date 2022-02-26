const bcrypt = require("bcryptjs");
const password = "1234";
const hash = bcrypt.hashSync(password, 8);

exports.seed = async function (knex) {
  await knex("users").truncate();
  await knex("users").insert([
    {
      username: "jack",
      password: hash,
    },
    {
      username: "jill",
      password: hash,
    },
  ]);
};
