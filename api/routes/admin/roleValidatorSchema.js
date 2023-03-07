import { body } from "express-validator";
import { isSnowflake } from "discord-snowflake";
export default [
  body("discordID")
    .exists()
    .withMessage("discordID must be sent with request")
    .custom((value) => isSnowflake(value))
    .withMessage("discordID must be a valid discord snowflake"),
  body("isAdmin")
    .exists()
    .isBoolean({ loose: false })
    .withMessage("isAdmin must be a boolean"),
  body("s64Lim").isInt().withMessage("s64lim must be a number"),
];
//todo, maybe use DB here for validating discordID?
