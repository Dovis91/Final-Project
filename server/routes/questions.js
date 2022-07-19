import "dotenv/config";
import express from "express";
import con from "../sql_connection.js";
import isAuth from "../isAuth.js";

const questionRouter = express.Router();

questionRouter.get("/", async (req, res) => {
  try {
    const [data] = await con.query(
      `SELECT * from questions ${req.query.q ? "WHERE question LIKE ?" : ""}
    `,
      [`%${req.query.q}%`]
    );
    res.send(data);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

questionRouter.get("/:id", async (req, res) => {
  try {
    const [data] = await con.query(`SELECT * FROM questions WHERE id = ?`, [
      req.params.id,
    ]);
    res.send(data[0]);
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

questionRouter.post("/:id/answer", async (req, res) => {
  try {
    if (await isAuth(req)) {
      const rb = req.body;
      if (!rb.answer) return res.send({ msg: "Need Answer" });
      await con.query(
        `INSERT INTO answers (question_id, user_id, answer)
        VALUES (?,?,?) `,
        [req.params.id, req.token.id, rb.answer]
      );
      res.status(200).send({ msg: "Question has been added" });
    } else {
      return res.send({ msg: "Not logged in, cant post" });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

questionRouter.get("/:id/answers", async (req, res) => {
  try {
    const [data] = await con.query(
      `SELECT * FROM answers WHERE question_id = ?`,
      [req.params.id]
    );
    res.send(data);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

export default questionRouter;
