import express from "express";
import admin from "./admin/index.js";
import list from "./list.js";

const rootRouter = express.Router();

// Need Validate and Auth
// Post/Delete/Get Lists/etc
rootRouter.use("/admin", admin);

// Normal AdminList for Squad
rootRouter.use("/list", list);

export { rootRouter as router };
