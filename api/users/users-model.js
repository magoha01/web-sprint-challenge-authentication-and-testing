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

// const create = async (project) => {
//   const newProject = await db("projects")
//     .insert(project)
//     .then(([project_id]) => {
//       return db("projects").where("project_id", project_id).first();
//     });
//   return {
//     ...newProject,
//     project_completed: newProject.project_completed ? true : false,
//   };
// };

module.exports = {
  findByName,
  create,
};
