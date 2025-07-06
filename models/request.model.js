const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  data: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", requestSchema);
