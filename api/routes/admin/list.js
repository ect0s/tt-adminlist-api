import express from "express";
import db from "../../../lib/db/db.js";
import validateRequestSchema from "./validateSchema.js";
import schema from "./listValidatorSchema.js";
const router = express.Router();
router
  .post("/", schema, validateRequestSchema, async (req, res) => {
    try {
      const list = await db.models.AdminList.findOneAndUpdate(
        { name: req.body.name },
        { ...req.body },
        { upsert: true }
      );
      return res.send(list);
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  })
  .get("/", async (req, res) => {
    try {
      const list = await db.models.AdminList.find();
      if (list) {
        return res.send(list);
      }
      return res.sendStatus(404);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  })
  .get("/:list", async (req, res) => {
    try {
      const list = await db.models.AdminList.findOne({ name: req.params.list });
      if (list) {
        return res.send(list);
      }
      return res.sendStatus(404);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  })
  .delete("/:list", async (req, res) => {
    try {
      const list = await db.models.AdminList.deleteOne({
        name: req.params.list,
      });
      if (list) {
        return res.send(list);
      }
      return res.sendStatus(404);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  });
export default router;
