import mongoose from "mongoose";

const { Schema } = mongoose;

const groupSchema = new Schema({
  //Discord Roles Attached To this Group
  roles: {
    type: [String],
    required: true,
  },
  //Name of this server group, Group=Admins:
  squadGroupName: {
    required: true,
    type: String,
  },
  //Squad Admins.cfg Permissions String
  squadPermissions: {
    type: String,
    required: true,
  },
  //Only Use Admin64ID for this server group
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

export default groupSchema;
