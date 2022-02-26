const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");
const bcrypt = require("bcryptjs");
const jwtDecode = require("jwt-decode");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

test("[0]testing environment is correct", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("[POST] /api/auth/register", () => {
  it("[1] Password saves as bcrypted password and not plain text", async () => {
    await request(server)
      .post("/api/auth/register")
      .send({ username: "jack", password: "1234" });
    const jack = await db("users").where("username", "jack").first();
    expect(bcrypt.compareSync("1234", jack.password)).toBeTruthy();
  }, 750);
});

describe("[POST] /api/auth//login", () => {
  it("[3] responds with the correct message on valid credentials", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "jack", password: "1234" });
    expect(res.body.message).toMatch(/welcome, jack/i);
  }, 750);
});

describe("[GET] /api/jokes", () => {
  it("[17] requests without a token given invalid token message with 401", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.body.message).toMatch(/token required/i);
  }, 750);
});
