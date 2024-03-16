"use strict";

const request = require("supertest");

const db = require("../db");
const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u4Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */

describe("POST /jobs", function () {
  const newJob = {
    company_handle: "c1",
    title: "New 1",
    salary: 10,
    equity: 0,
  };

  test("ok for users", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send(newJob)
      .set("authorization", `Bearer ${u4Token}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      job: {
        company_handle: "c1",
        title: "New 1",
        salary: 10,
        equity: "0",
      },
    });
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        company_handle: "c1",
        title: "New 1",
      })
      .set("authorization", `Bearer ${u4Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .post("/jobs")
      .send({
        company_handle: "c1",
        title: "New 1",
        salary: 10,
        equity: true,
      })
      .set("authorization", `Bearer ${u4Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get("/jobs");
    expect(resp.body).toEqual({
      jobs: [
        {
          id: 1,
          company_handle: "c1",
          title: "J1",
          salary: 1,
          equity: "0.1",
        },
        {
          id: 2,
          company_handle: "c2",
          title: "J2",
          salary: 2,
          equity: "0.1",
        },
        {
          id: 3,
          company_handle: "c3",
          title: "J3",
          salary: 3,
          equity: "0",
        },
      ],
    });
  });
});

/************************************** GET /jobs/:id */

describe("GET /jobs/:id", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/jobs/1`);
    expect(resp.body).toEqual({
      job: {
        id: 1,
        company_handle: "c1",
        title: "J1",
        salary: 1,
        equity: "0.1",
      },
    });
  });

  test("not found for no such job", async function () {
    const resp = await request(app).get(`/jobs/99`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /jobs/:handle */

describe("PATCH /jobs/:id", function () {
  test("works for users", async function () {
    const resp = await request(app)
      .patch(`/jobs/1`)
      .send({
        title: "New",
      })
      .set("authorization", `Bearer ${u4Token}`);
    expect(resp.body).toEqual({
      job: {
        id: 1,
        company_handle: "c1",
        title: "New",
        salary: 1,
        equity: "0.1",
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app).patch(`/jobs/1`).send({
      title: "New",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found on no such company", async function () {
    const resp = await request(app)
      .patch(`/jobs/99`)
      .send({
        title: "New",
      })
      .set("authorization", `Bearer ${u4Token}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request on handle change attempt", async function () {
    const resp = await request(app)
      .patch(`/jobs/1`)
      .send({
        company_handle: "c1-new",
      })
      .set("authorization", `Bearer ${u4Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request on invalid data", async function () {
    const resp = await request(app)
      .patch(`/jobs/1`)
      .send({
        equity: false,
      })
      .set("authorization", `Bearer ${u4Token}`);
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** DELETE /jobs/:id */

describe("DELETE /jobs/:id", function () {
  test("works for users", async function () {
    const resp = await request(app)
      .delete(`/jobs/1`)
      .set("authorization", `Bearer ${u4Token}`);
    expect(resp.body).toEqual({ deleted: "1" });
  });

  test("unauth for anon", async function () {
    const resp = await request(app).delete(`/jobs/1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such company", async function () {
    const resp = await request(app)
      .delete(`/jobs/99`)
      .set("authorization", `Bearer ${u4Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
