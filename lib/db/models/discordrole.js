import mongoose from "mongoose";
const { Schema } = mongoose;

const discordRoleSchema = new Schema({
  //URL Endpoint Name, ie /lists/test
  name: {
    type: String,
    required: true,
  },
  discordID: {
    type: String,
    unique: true,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  s64Lim: {
    type: Number,
    required: true,
    default: 0,
  },
});

export default discordRoleSchema;
