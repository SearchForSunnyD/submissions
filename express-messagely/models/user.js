/** User class for message.ly */

const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

/** User of the site. */

class User {
  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({ username, password, first_name, last_name, phone }) {
    const hashed_pw = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const result = await db.query(
      `insert into users (
              username,
              password,
              first_name,
              last_name,
              phone,
              join_at,
              last_login_at
              )
            values ($1, $2, $3, $4, $5, current_timestamp, current_timestamp)
            returning username, password, first_name, last_name, phone`,
      [username, hashed_pw, first_name, last_name, phone],
    );

    return result.rows[0];
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const result = await db.query(
      `select username, password
      from users
      where username = $1`,
      [username],
    );
    const user = result.rows[0];
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return true;
      }
    }
    return false;
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    await db.query(
      `update users
      set last_login_at=current_timestamp
      where username = $1`,
      [username],
    );
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    const results = await db.query(
      `select username,
         first_name,
         last_name,
         phone
       from users
       order by first_name`,
    );
    return results.rows;
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    const results = await db.query(
      `select username,
         first_name,
         last_name,
         phone,
         last_login_at,
         join_at
       from users
       where username = $1`,
      [username],
    );
    return results.rows[0];
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    const results = await db.query(
      `select m.id,
                m.to_username,
                u.first_name as first_name,
                u.last_name as last_name,
                u.phone as phone,
                m.body,
                m.sent_at,
                m.read_at
          from messages as m
            join users as u on m.to_username = u.username
          where m.from_username = $1`,
      [username],
    );
    return results.rows.map((u) => {
      return {
        body: u.body,
        id: u.id,
        read_at: u.read_at,
        sent_at: u.sent_at,
        to_user: {
          first_name: u.first_name,
          last_name: u.last_name,
          phone: u.phone,
          username: u.to_username,
        },
      };
    });
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    const results = await db.query(
      `select m.id,
                m.from_username,
                u.first_name as first_name,
                u.last_name as last_name,
                u.phone as phone,
                m.body,
                m.sent_at,
                m.read_at
          from messages as m
            join users as u on m.from_username = u.username
          where m.to_username = $1`,
      [username],
    );
    return results.rows.map((u) => {
      return {
        body: u.body,
        id: u.id,
        read_at: u.read_at,
        sent_at: u.sent_at,
        from_user: {
          first_name: u.first_name,
          last_name: u.last_name,
          phone: u.phone,
          username: u.from_username,
        },
      };
    });
  }
}

module.exports = User;
