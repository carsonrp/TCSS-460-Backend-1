import request from "supertest";
import { app } from "../../src/app";


describe("Math Routes (v1)", () => {
  describe("GET /v1/math/:num", () => {
    it("returns the double of a number (happy path)", async () => {
      const res = await request(app).get("/v1/math/7");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        input: 7,
        double: 14,
      });
    });
  });

  describe("GET /v1/math/add", () => {
    it("adds two numbers (happy path)", async () => {
      const res = await request(app).get("/v1/math/add?a=5&b=9");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        a: 5,
        b: 9,
        sum: 14,
      });
    });

    it("returns 400 when query params are missing (sad path)", async () => {
      const res = await request(app).get("/v1/math/add?a=5"); // missing b

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe("POST /v1/math/multiply", () => {
    it("multiplies two numbers (happy path)", async () => {
      const res = await request(app)
        .post("/v1/math/multiply")
        .send({ x: 3, y: 4 });

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        x: 3,
        y: 4,
        product: 12,
      });
    });
  });
});
