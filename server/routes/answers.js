import express from "express";
import con from "../sql_connection.js";
import isAuth from "../isAuth.js";

const router = express.Router();

// display all logged user questions.

router.get("/", async (req, res) => {
  await isAuth(req);

  const [data] = await con.query(
    `
      SELECT * FROM questions WHERE user_id = ${req.token.id}
           `
  );
  res.send(data);
});

router.delete("/:id", async (req, res) => {
  try {
    if (await isAuth(req)) {
      await con.query(`DELETE FROM answers WHERE ID = ?`, [req.params.id]);
      res.send({ msg: "Answer deleted" });
    } else {
      res.send({ err: "Error 404" });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.put("/:id", async (req, res) => {
  await isAuth(req);

  const [data] = await con.query(
    `
      UPDATE answers SET answer = ?, edited = ? WHERE user_id = ? AND id = ?
           `,
    [req.body.answer, 1, req.token.id, req.params.id]
  );
  res.send(data);
});

export default router;
