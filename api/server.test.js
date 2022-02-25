// Write your tests here
test("sanity", () => {
  expect(process.env.DB_ENV).not.toBe(false);
});
