import express from "express";
import db from "../../lib/db/db.js";
const router = express.Router();
router.get("/:list", async (req, res) => {
  try {
    const settings = await db.models.AdminList.findOne({
      name: req.params.list,
    });

    if (settings) {
      const list = await generateList(settings.groups);
      //Does squad except anything besides plain text?
      res.set("Content-Type", "text/plain");
      return res.send(list);
    }

    return res.sendStatus(404);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

async function getUsersWithRole(role, isAdmin) {
  try {
    if (isAdmin) {
      const users = await db.models.User.find({
        Enabled: true,
        Roles: { $in: [role] },
        admin64ID: { $exists: true, $not: { $size: 0 } },
      });
      return users;
    }
    const users = await db.models.User.find({
      Enabled: true,
      Roles: { $in: [role] },
      s64ID: { $exists: true, $not: { $size: 0 } },
    });
    return users;
  } catch (err) {
    console.log(err);
  }
}

async function generateList(settings) {
  // accumulate
  let users = [];
  for (const group of settings) {
    users.push(`Group=${group.squadGroupName}:${group.squadPermissions}`);
    try {
      for (const role of group.roles) {
        const result = await getUsersWithRole(role, group.isAdmin);
        if (group.isAdmin) {
          users.push(
            result
              .map(
                (user) =>
                  `Admin=${user.admin64ID}:${group.squadGroupName} //${user.DiscordName}`
              )
              .join("\r\n")
          );
        } else {
          users.push(
            result
              .map((user) =>
                user.s64ID
                  .map(
                    (id) =>
                      `Admin=${id}:${group.squadGroupName} //${user.DiscordName}`
                  )
                  .join("\r\n")
              )
              .join("\r\n")
          );
        }
      }
    } catch (err) {
      // if we error we return an empty list, safe value
      console.log(err);
    }
  }
  return users.join("\r\n");
}

export default router;
