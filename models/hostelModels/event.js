const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imagepath: { type: String },
  path: { type: String, required: true },
  date: { type: Date, required: true },
  hostel: { type: String, required: true },
});

module.exports = mongoose.model("HostelEvent", EventSchema);
