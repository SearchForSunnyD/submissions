const { app, server } = require("../app");
const request = require("supertest");

const db = require("../db");

beforeAll(async function () {
  await db.query(
    `insert into companies (code, name, description) values ($1, $2, $3) returning *;`,
    ["1", "n", "d"],
  );
  await db.query(
    `insert into invoices (comp_code, amt) values ($1, $2) returning *;`,
    ["1", "200"],
  );
});

describe("GET /invoices", () => {
  test("Get all invoices", async () => {
    const res = await request(app).get("/invoices");
    expect(res.statusCode).toBe(200);
    expect(res.body.invoices.length).toBe(1);
  });
});

describe("POST /invoices", () => {
  test("Post a new invoice", async () => {
    const comp_code = "1";
    const amt = "100";
    const res = await request(app).post("/invoices").send({ comp_code, amt });
    expect(res.statusCode).toBe(200);
    expect(res.body.invoice.amt).toEqual(parseInt(amt));
    expect(res.body.invoice.comp_code).toEqual(comp_code);
  });
  test("Responds with 404 if missing id", async () => {
    const res = await request(app).post("/invoices");
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /invoices/:id", () => {
  test("Get an invoice", async () => {
    const res = await request(app).get("/invoices/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.invoice.amt).toBe(200);
    expect(res.body.invoice.comp_code).toBe("1");
  });
});

describe("PUT /invoices/:id", () => {
  test("Update an invoice", async () => {
    const amt = "100";
    const res = await request(app).put(`/invoices/1`).send({ amt: amt });
    expect(res.statusCode).toBe(200);
    expect(res.body.invoice.amt).toStrictEqual(parseInt(amt));
    expect(res.body.invoice.paid).toBe(false);
  });
  test("Update an invoice", async () => {
    const amt = "100";
    const res = await request(app)
      .put(`/invoices/1`)
      .send({ amt: amt, paid: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.invoice.amt).toStrictEqual(parseInt(amt));
    expect(res.body.invoice.paid).toBe(true);
  });
  test("Responds with 404 if missing code", async () => {
    const res = await request(app).post("/companies");
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /invoices/:id", () => {
  test("Delete a invoice", async () => {
    const res = await request(app).delete("/invoices/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("deleted");
  });
  test("Responds with 404 if missing code", async () => {
    const res = await request(app).post("/invoices");
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /companies/:code", () => {
  test("Get a company and its invoices", async () => {
    const res = await request(app).get("/companies/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.invoices.length).toBe(1);
  });
});

afterAll(async () => {
  await db.query(`
  truncate companies, invoices;
  ALTER SEQUENCE invoices_id_seq RESTART WITH 1
  `);
  await db.end();
  server.close();
});
