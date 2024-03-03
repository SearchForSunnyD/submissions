const express = require("express");
const router = new express.Router();
const db = require("../db");

router.post("/", async function (req, res, next) {
  try {
    const { code, industry } = req.body;

    const q = await db.query(
      `insert into industries (code, industry) values ($1, $2) returning *;`,
      [code, industry],
    );
    return res.json({ company: q.rows[0] });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

router.post("/:code", async function (req, res, next) {
  try {
    const { code } = req.params;

    const { comp_code } = req.body;

    const q = await db.query(
      `insert into comp_ind (ind_code, comp_code) values ($1, $2) returning *;`,
      [code, comp_code],
    );
    return res.json({ company: q.rows[0] });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    q = await db.query(`select * from industries;`);

    c =
      await db.query(`select i.industry, c.name as company_name from industries i join comp_ind ci on i.code = ci.ind_code join companies c on ci.comp_code = c.code;
`);

    return res.json({ industries: [...q.rows], companies: [...c.rows] });
  } catch (err) {
    return next(err);
  }
});

router.get("/:code", async function (req, res, next) {
  try {
    const { code } = req.params;
    q = await db.query(
      `select i.industry, c.name as company_name from industries i join comp_ind ci on i.code = ci.ind_code join companies c on ci.comp_code = c.code where i.code = $1;`,
      [code],
    );

    return res.json({
      industry: [...q.rows],
    });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:code", async function (req, res, next) {
  try {
    const { code } = req.params;

    q = await db.query(`delete from industries where code=$1;`, [code]);

    return res.json({ status: `deleted` });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
