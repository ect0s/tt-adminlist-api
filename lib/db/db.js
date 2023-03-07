import mongoose from "mongoose";
import userSchema from "./models/user.js";
import listSchema from "./models/adminlist.js";
import discordRoleSchema from "./models/discordrole.js";

const mongoURL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/users";

const db = mongoose.createConnection(mongoURL, {
  keepAlive: true,
  keepAliveInitialDelay: 300000,
});

db.model("User", userSchema);
db.model("AdminList", listSchema);
db.model("discordRole", discordRoleSchema);

db.on("connected", () => console.log(`Database Connection UP`));
db.on("error", (err) => console.log(`Database error ${err}`));
// finish error/event handling
// https://mongoosejs.com/docs/connections.html#connection-events

export default db;
