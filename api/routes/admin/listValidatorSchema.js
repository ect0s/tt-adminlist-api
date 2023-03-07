import { body } from "express-validator";
import { isSnowflake } from "discord-snowflake";
export default [
  body("name")
    .exists()
    .isString()
    .isLength({ min: 3 })
    .withMessage(
      "name is required and must be a String with more than 3 characters"
    ),
  body("groups")
    .exists()
    .isArray({ min: 1 })
    .withMessage(
      "groups is required and must Be an array with at least one group"
    ),
  body("groups.*.squadGroupName")
    .exists()
    .isString()
    .isLength({ min: 3 })
    .withMessage(
      "Group is required to have squadGroupName of type string with more than 3 characters"
    ),
  body("groups.*.squadPermissions")
    .exists()
    .isString()
    .isLength({ min: 4 })
    .withMessage(
      "Group is required to have squadPermissions of type string with more than 4 characters"
    ),
  body("groups.*.isAdmin")
    .exists()
    .isBoolean({ loose: false })
    .withMessage("Group is required to have isAdmin of type boolean"),
  body("groups.*.roles")
    .exists()
    .isArray({ min: 1 })
    .withMessage(
      "Group is required to have roles of type array with one or more entries"
    ),
  body("groups.*.roles.*")
    .custom((value) => isSnowflake(value))
    .withMessage("discordID must be a valid discord snowflake"),
];
