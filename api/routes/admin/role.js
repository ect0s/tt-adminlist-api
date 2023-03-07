import express from "express";
import db from "../../../lib/db/db.js";
import validateRequestSchema from "./validateSchema.js";
import schema from "./roleValidatorSchema.js";

const router = express.Router();

router
  .post("/", schema, validateRequestSchema, async (req, res) => {
    try {
      const list = await db.models.discordRole.findOneAndUpdate(
        { discordID: req.body.discordID },
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
      const list = await db.models.discordRole.find();
      if (list) {
        return res.send(list);
      }
      return res.sendStatus(404);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  })
  .get("/:role", async (req, res) => {
    try {
      const list = await db.models.discordRole.findOne({
        discordID: req.params.discordID,
      });
      if (list) {
        return res.send(list);
      }
      return res.sendStatus(404);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  })
  .delete("/:discordID", async (req, res) => {
    try {
      const list = await db.models.discordRole.deleteOne({
        discordID: req.params.discordID,
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
