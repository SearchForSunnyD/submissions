const { app, server } = require("../app");
const request = require("supertest");

const db = require("../db");

beforeAll(async function () {
  await db.query(
    `insert into companies (code, name, description) values ($1, $2, $3) returning *;`,
    ["1", "n", "d"],
  );
});

describe("GET /companies", () => {
  test("Get all companies", async () => {
    const res = await request(app).get("/companies");
    expect(res.statusCode).toBe(200);
    expect(res.body.companies.length).toBe(1);
  });
});

describe("POST /companies", () => {
  test("Post a new company", async () => {
    const company = { name: "m", description: "f" };
    const res = await request(app).post("/companies").send(company);
    expect(res.statusCode).toBe(200);
    expect(res.body.company.name).toEqual(company.name);
    expect(res.body.company.description).toEqual(company.description);
  });
  test("Responds with 404 if missing name", async () => {
    const res = await request(app).post("/companies");
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /companies/:code", () => {
  test("Get a company", async () => {
    const res = await request(app).get("/companies/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.company.code).toBe("1");
    expect(res.body.company.name).toBe("n");
    expect(res.body.company.description).toBe("d");
  });
});

describe("PUT /companies/:code", () => {
  test("Update a company", async () => {
    const company = { code: "1", name: "b", description: "g" };
    const res = await request(app)
      .put(`/companies/${company.code}`)
      .send(company);
    expect(res.statusCode).toBe(200);
    expect(res.body.company).toStrictEqual(company);
  });
  test("Responds with 404 if missing code", async () => {
    const res = await request(app).post("/companies");
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /companies/:code", () => {
  test("Delete a company", async () => {
    const res = await request(app).delete("/companies/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("deleted");
  });
  test("Responds with 404 if missing code", async () => {
    const res = await request(app).post("/companies");
    expect(res.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await db.query(`truncate companies, invoices`);
  await db.end();
  server.close();
});
