const express = require("express");
const router = new express.Router();
const db = require("../db");

router.post("/", async function (req, res, next) {
  try {
    const { comp_code, amt } = req.body;

    const q = await db.query(
      `insert into invoices (comp_code, amt) values ($1, $2) returning *;`,
      [comp_code, amt],
    );

    return res.json({ invoice: q.rows[0] });
  } catch (err) {
    err.status = 404
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  try {
    q = await db.query(`select * from invoices;`);

    return res.json({ invoices: [...q.rows] });
  } catch (err) {
    return next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    q = await db.query(`select * from invoices where id = $1;`, [id]);

    isValid(q, next);

    return res.json({ invoice: q.rows[0] });
  } catch (err) {
    err.status = 404
    return next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    const { amt, paid } = req.body;
    q = await db.query(`update invoices set amt=$2 where id=$1 returning *;`, [
      id,
      amt
    ]);
    
    if (paid) {
          q = await db.query(
            `update invoices set paid=true, paid_date=CURRENT_DATE where id=$1 returning *;`,
            [id],
          );
    }


    isValid(q, next);

    return res.json({ invoice: q.rows[0] });
  } catch (err) {
    err.status = 404
    return next(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    q = await db.query(`delete from invoices where id=$1;`, [id]);

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
