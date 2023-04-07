//Import required modules for testing
const request = require("supertest");
const User = require("../models/User");
const { connectDb, closeDB } = require("../config/db");
const { default: expect } = require("expect");
const { app, appServer } = require("../index");
require("dotenv").config();

describe("Auth Routes", () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    //Clear database
    await User.deleteMany().exec();
    await closeDB();
    await appServer.close();
  });

  //Test register route
  describe("POST /api/v1/auth/register", () => {
    it("should register a user", async () => {
      const res = await request(app).post("/api/v1/auth/register").send({
        firstName: "Jonathan",
        lastName: "Markin",
        email: "jonamarkin@gmail.com",
        password: "12345678",
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("responseData");
      expect(res.body.responseData).toHaveProperty("user");
    });
  });

  //Test login route
  describe("POST /api/v1/auth/login", () => {
    it("should login a user", async () => {
      const res = await request(app).post("/api/v1/auth/login").send({
        email: "jonamarkin@gmail.com",
        password: "12345678",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("responseData");
      expect(res.body.responseData).toHaveProperty("token");
      expect(res.body.responseData).toHaveProperty("user");
    });
  });
});
