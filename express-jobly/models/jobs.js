"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { company_handle, title, salary, equity }
   *
   * Returns { company_handle, title, salary, equity }
   * */

  static async create({ company_handle, title, salary, equity }) {
    const result = await db.query(
      `INSERT INTO jobs
           (company_handle, title, salary, equity)
           VALUES ($1, $2, $3, $4)
           RETURNING company_handle, title, salary, equity`,
      [company_handle, title, salary, equity],
    );
    const job = result.rows[0];

    return job;
  }

  /** Find all jobs.
   *
   * optional filters:
   * - title (case insensitive)
   * - minSalary
   * - hasEquity
   * - company_handle
   *
   * Returns [{ company_handle, title, salary, equity }, ...]
   * */

  static async findAll(filters = {}) {
    let q = `SELECT id,
                  company_handle,
                  title,
                  salary,
                  equity
            FROM jobs`;

    let where = [];
    let vals = [];
    const { title, minSalary, hasEquity, company_handle } = filters;

    if (title) {
      vals.push(`%${title}%`);
      where.push(`title ILIKE $${vals.length}`);
    }
    if (minSalary) {
      vals.push(minSalary);
      where.push(`salary >= $${vals.length}`);
    }
    if (company_handle) {
      vals.push(company_handle);
      where.push(`company_handle = $${vals.length}`);
    }
    if (hasEquity) {
      where.push(`equity > 0`);
    }
    if (where.length) {
      q += " where " + where.join(" and ");
    }
    q += ` order by title`;

    const jobsRes = await db.query(q, vals);
    return jobsRes.rows;
  }

  /** Given a job id, return data about job.
   *
   * Returns { company_handle, title, salary, equity }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const jobsRes = await db.query(
      `SELECT id,
                company_handle,
                title,
                salary,
                equity
            FROM jobs
            WHERE id = $1`,
      [id],
    );

    const job = jobsRes.rows[0];

    if (!job) throw new NotFoundError(`No company: ${id}`);

    return job;
  }

  /** Update job data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity}
   *
   * Returns {company_handle, title, salary, equity}
   *
   * Throws NotFoundError if not found.
   */

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE jobs
                      SET ${setCols}
                      WHERE id = ${idVarIdx}
                      RETURNING id,
                                company_handle,
                                title,
                                salary,
                                equity`;
    const result = await db.query(querySql, [...values, id]);
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No job: ${id}`);

    return company;
  }

  /** Delete given job from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
      [id],
    );
    const job = result.rows[0];

    if (!job) throw new NotFoundError(`No job: ${id}`);
  }
}

module.exports = Job;
