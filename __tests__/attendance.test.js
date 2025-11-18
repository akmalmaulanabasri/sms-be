process.env.TOKEN_KEY = process.env.TOKEN_KEY || "testkey";
const request = require("supertest");
const app = require("../servers/Index");
const db = require("../models/Index");

beforeAll(async () => {
  await db.sequelize.sync();
});

beforeAll(async () => {
  // Ensure a test user exists for login
  const bcrypt = require("bcryptjs");
  const hashed = bcrypt.hashSync("1234567890", 10);
  try {
    await db.User.create({
      username: "akmal",
      email: "akmal@me.com",
      password: hashed,
      role: "admin",
    });
  } catch (e) {
    // ignore if already exists
  }
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Attendance API", () => {
  test("POST /api/attendance requires auth and creates attendance", async () => {
    // login with seeded user (check seeder: email `akmal@me.com`, password `1234567890`)
    const loginRes = await request(app)
      .post("/api/login")
      .send({ email: "akmal@me.com", password: "1234567890" })
      .set("Accept", "application/json")
      .expect(200);

    const token = loginRes.body.results && loginRes.body.results.token;
    expect(token).toEqual(expect.any(String));

    const payload = {
      date: new Date().toISOString().slice(0, 10),
      type: "student",
    };

    const res = await request(app)
      .post("/api/attendance")
      .set("Authorization", `Bearer ${token}`)
      .send(payload)
      .expect(201);

    expect(res.body).toMatchObject({
      status: expect.any(String),
      results: expect.objectContaining({ date: expect.any(String) }),
    });
  });
});
