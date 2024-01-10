import request from "supertest";
import { app, server } from "../app";

describe("POST /summary", () => {
  it("should be reachable", async () => {
    const res = await request(app).post("/summary");
    expect(res.status).not.toBe(404);
  });

  it("should respond with 200 for valid URL", async () => {
    const res = await request(app)
      .post("/summary")
      .send({ url: "https://contact-list-two-drab.vercel.app/" });
    expect(res.status).toBe(200);
  }, 10000);

  it("should respond with 500 for invalid URL", async () => {
    const res = await request(app)
      .post("/summary")
      .send({ url: "invalid-url" });
    expect(res.status).toBe(500);
  });

  it("should respond with correct error message for invalid URL", async () => {
    const res = await request(app)
      .post("/summary")
      .send({ url: "invalid-url" });
    expect(res.body.error).toBe(
      "An error occurred while summarizing the webpage"
    );
  });

  it("should respond with correct summary and URL for valid URL", async () => {
    const res = await request(app)
      .post("/summary")
      .send({ url: "https://contact-list-two-drab.vercel.app/" });
    expect(res.body.summary).toBeDefined();
    expect(res.body.url).toBe("https://contact-list-two-drab.vercel.app/");
  });
});

afterAll(done => {
  server.close(done);
});