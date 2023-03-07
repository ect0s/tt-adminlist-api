import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  //Users Discord ID
  DiscordID: {
    type: String,
    unique: true,
    required: true,
  },
  //Users Discord Name
  DiscordName: {
    type: String,
    unique: false,
    required: true,
  },
  //Users Discord Roles
  Roles: {
    type: [String],
    unique: false,
    required: true,
  },
  //Array of SteamIDs
  s64ID: {
    type: [String],
    unique: false,
    required: true,
  },
  //SteamID for Admin only groups
  admin64ID: {
    type: [String],
    unique: false,
    required: false,
  },
  //Are they in Discord?
  Enabled: {
    type: Boolean,
    required: true,
  },
  //Last Seen in Discord, useful for culling "dead" users
  LastUpdated: {
    type: Date,
    default: Date.now,
    required: true,
  },
  s64Lim: {
    type: Number,
    default: 0,
    required: true,
  },
  admin: {
    type: Number,
    default: 0,
    required: true,
  },
});

export default userSchema;
