import express from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import con from "../sql_connection.js";

const regRouter = express.Router();
const jwtSecret = process.env.JWT_SECRET;

const userSchema = Joi.object({
  username: Joi.string().trim().lowercase().required(),
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().required(),
});

regRouter.post("/", async (req, res) => {
  let rb = req.body;
  try {
    rb = await userSchema.validateAsync(rb);
  } catch (err) {
    return res.status(400).send({ err: `Incorrect data provided` });
  }
  try {
    const hashedPassword = bcrypt.hashSync(rb.password);
    const newUser = await con.query(
      `
                  INSERT INTO users (username, email, password)
                  VALUES (?,?,?)
                  `,
      [rb.username, rb.email, hashedPassword]
    );
    console.log(req.body);
    const token = jwt.sign(
      { id: newUser[0].insertId, username: rb.username, email: rb.email },
      jwtSecret
    );
    return res.json({ token: token });
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default regRouter;
