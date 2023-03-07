import express from "express";
import list from "./list.js";
import role from "./role.js";
import authenticateKey from "./authenticateKey.js";
const router = express.Router();
router.use("/list", authenticateKey, list);
router.use("/role", authenticateKey, role);
export default router;
