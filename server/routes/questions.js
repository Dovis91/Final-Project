import "dotenv/config";
import express from "express";
import con from "../sql_connection.js";
import isAuth from "../isAuth.js";

const questionRouter = express.Router();

questionRouter.get("/", async (req, res) => {
  try {
    const [data] = await con.query(`SELECT * from questions`);
    res.send(data);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

questionRouter.post("/", async (req, res) => {
  try {
    if (await isAuth(req)) {
      const rb = req.body;
      if (!rb.question) return res.send({ msg: "Need Question" });
      await con.query(
        `INSERT INTO questions (user_id, question, created_at)
        VALUES (?,?,?) `,
        [req.token.id, rb.question, new Date().toLocaleString("LT")]
      );
      res.status(200).send({ msg: "Question has been added" });
    } else {
      return res.send({ msg: "Not logged in, cant post" });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

export default questionRouter;
