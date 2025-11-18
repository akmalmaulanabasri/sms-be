process.env.TOKEN_KEY = process.env.TOKEN_KEY || "testkey";
const request = require("supertest");
const app = require("../servers/Index");
const db = require("../models/Index");

beforeAll(async () => {
  await db.sequelize.sync();
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Teachers API", () => {
  test("GET /api/teachers should return 200 and list", async () => {
    const res = await request(app)
      .get("/api/teachers")
      .set("Accept", "application/json")
      .expect(200);

    expect(res.body).toMatchObject({
      status: expect.any(String),
      results: expect.any(Array),
    });
  });
});
