// const dotenv = require("dotenv");
const db = require("../database/db");

module.exports = {
  registerUser: ({
    username,
    email,
    password,
    first_name,
    last_name,
    phone_number,
  }) => {
    const sql = `
      INSERT INTO Users (username, email, password, first_name, last_name, phone_number, email_is_verified)
      VALUES (?, ?, ?, ?, ?, ?, false)
    `;

    return db
      .promise()
      .query(sql, [
        username,
        email,
        password,
        first_name,
        last_name,
        phone_number,
      ])
      .then(([result]) => result)
      .catch((err) => {
        console.error("Error in INSERT INTO Users:", err);
        throw new Error(err.message);
      });
  },

  getUserByUsername: async (username) => {
    const sql = `
      SELECT user_id, username, email, password, email_is_verified
      FROM Users
      WHERE username = ?
    `;

    const res = await db
      .promise()
      .query(sql, [username])
      .then(([result]) => result[0])
      .catch((err) => {
        console.error("Error fetching user by username:", err);
        throw new Error(err.message);
      });
      console.log(res);
    return res;
  },
  verifyEmailInDatabase: (email) => {
    const sql = "UPDATE Users SET email_is_verified = true WHERE email = ?";

    return db
      .promise()
      .query(sql, [email])
      .then(([result]) => result)
      .catch((err) => {
        console.error("Error updating email verification:", err);
        throw new Error(err.message);
      });
  },
};
