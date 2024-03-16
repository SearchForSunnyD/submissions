"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./jobs.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newJob = {
    company_handle: "c1",
    title: "New 1",
    salary: 10,
    equity: "0",
  };

  test("works", async function () {
    let job = await Job.create(newJob);
    expect(job).toEqual(newJob);

    const result = await db.query(
      `SELECT company_handle, title, salary, equity
            FROM jobs
            WHERE title = 'New 1'`,
    );
    expect(result.rows).toEqual([
      {
        company_handle: "c1",
        title: "New 1",
        salary: 10,
        equity: "0",
      },
    ]);
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: no filter", async function () {
    let jobs = await Job.findAll();
    expect(jobs).toEqual([
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
    ]);
  });
  test("works: min filter", async function () {
    let jobs = await Job.findAll({ minSalary: 2 });
    expect(jobs).toEqual([
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
    ]);
  });
  test("works: hasEquity filter", async function () {
    let jobs = await Job.findAll({ hasEquity: true });
    expect(jobs).toEqual([
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
    ]);
  });
  test("works: title filter", async function () {
    let jobs = await Job.findAll({ title: 2 });
    expect(jobs).toEqual([
      {
        id: 2,
        company_handle: "c2",
        title: "J2",
        salary: 2,
        equity: "0.1",
      },
    ]);
  });
  test("works: handle filter", async function () {
    let jobs = await Job.findAll({ company_handle: "c2" });
    expect(jobs).toEqual([
      {
        id: 2,
        company_handle: "c2",
        title: "J2",
        salary: 2,
        equity: "0.1",
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let job = await Job.get(1);
    expect(job).toEqual({
      id: 1,
      company_handle: "c1",
      title: "J1",
      salary: 1,
      equity: "0.1",
    });
  });

  test("not found if no such job", async function () {
    try {
      await Job.get(4);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** update */

describe("update", function () {
  const updateData = {
    title: "New",
    salary: 3,
    equity: "0",
  };

  test("works", async function () {
    let job = await Job.update(1, updateData);
    expect(job).toEqual({
      id: 1,
      company_handle: "c1",
      ...updateData,
    });

    const result = await db.query(
      `SELECT id, company_handle, title, salary, equity
           FROM jobs
           WHERE id = 1`,
    );
    expect(result.rows).toEqual([
      {
        id: 1,
        company_handle: "c1",
        title: "New",
        salary: 3,
        equity: "0",
      },
    ]);
  });

  test("works: null fields", async function () {
    const updateDataSetNulls = {
      title: "New",
      salary: null,
      equity: null,
    };

    let job = await Job.update(1, updateDataSetNulls);
    expect(job).toEqual({
      id: 1,
      company_handle: "c1",
      ...updateDataSetNulls,
    });

    const result = await db.query(
      `SELECT id, company_handle, title, salary, equity
           FROM jobs
           WHERE id = 1`,
    );
    expect(result.rows).toEqual([
      {
        id: 1,
        company_handle: "c1",
        title: "New",
        salary: null,
        equity: null,
      },
    ]);
  });

  test("not found if no such job", async function () {
    try {
      await Job.update(4, updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Job.update(1, {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

/************************************** remove */

describe("remove", function () {
  test("works", async function () {
    await Job.remove(1);
    const res = await db.query("SELECT id FROM jobs WHERE id=1");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such job", async function () {
    try {
      await Job.remove(4);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
