import mongoose from "mongoose";
import groupSchema from "./admingroup.js";
const { Schema } = mongoose;

const listSchema = new Schema({
  //URL Endpoint Name, ie /lists/test
  name: {
    type: String,
    unique: true,
    required: true,
  },
  //Array of groups/info for this endpoint.
  groups: {
    type: [groupSchema],
    required: true,
    min: 1,
  },
});

export default listSchema;
