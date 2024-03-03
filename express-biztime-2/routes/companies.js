const express = require("express");
const router = new express.Router();
const db = require("../db");

const slugify = require("slugify");

router.post("/", async function (req, res, next) {
  try {
    const { name, description } = req.body;

    const q = await db.query(
      `insert into companies (code, name, description) values ($1, $2, $3) returning *;`,
      [slugify(name), name, description],
    );
    return res.json({ company: q.rows[0] });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    q = await db.query(`select * from companies;`);

    return res.json({ companies: [...q.rows] });
  } catch (err) {
    return next(err);
  }
});

router.get("/:code", async function (req, res, next) {
  try {
    const { code } = req.params;
    q = await db.query(`select * from companies where code = $1;`, [code]);

    isValid(q, next);

    inv = await db.query(`select * from invoices where comp_code = $1;`, [code]);

    ind = await db.query(
      `select i.industry, c.name as company_name from industries i join comp_ind ci on i.code = ci.ind_code join companies c on ci.comp_code = c.code where c.code = $1;`,
      [code],
    );

    return res.json({
      company: q.rows[0],
      invoices: inv.rows ? [...inv.rows] : null,
      industries: ind.rows ? ind.rows.map((obj)=>{return obj.industry}) : null,
    });
  } catch (err) {
    return next(err);
  }
});

router.put("/:code", async function (req, res, next) {
  try {
    const { code } = req.params;

    const { name, description } = req.body;
    q = await db.query(
      `update companies set name=$2, description=$3 where code = $1 returning *;`,
      [code, name, description],
    );

    isValid(q, next);

    return res.json({ company: q.rows[0] });
  } catch (err) {
    err.status = 404;
    return next(err);
  }
});

router.delete("/:code", async function (req, res, next) {
  try {
    const { code } = req.params;

    q = await db.query(`delete from companies where code=$1;`, [code]);

    isValid(q, next);

    return res.json({ status: `deleted` });
  } catch (err) {
    return next(err);
  }
});

function isValid(query, next) {
  if (query.rowCount > 0) {
  } else {
    return next();
  }
}

module.exports = router;
