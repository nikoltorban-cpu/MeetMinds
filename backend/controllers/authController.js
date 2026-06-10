import pool from "../config/db.js";
import bcrypt from "bcrypt"

export const signup = async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await pool.query(
        `SELECT * FROM users
         WHERE email = $1`,
        [email],
      );

      if (existingUser.rows.length > 0) {
        return res.json({
          message: "User already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await pool.query(
        `INSERT INTO users
                (username, email, password)
                VALUES ($1, $2, $3)
                RETURNING *`,
        [username, email, hashedPassword],
      );
      res.json({
        message: "Signup successful",

        user: newUser.rows[0],
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
}

export const login = async (req, res) => {
    try {
      const {
        email,

        password,
      } = req.body;

      const user = await pool.query(
        `SELECT * FROM users

           WHERE email = $1`,

        [email],
      );

      if (user.rows.length === 0) {
        return res.json({
          message: "User not found",
        });
      }

      const validPassword = await bcrypt.compare(
        password,

        user.rows[0].password,
      );

      if (!validPassword) {
        return res.json({
          message: "Wrong password",
        });
      }

      res.json({
        message: "Login successful",

        user: user.rows[0],
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }