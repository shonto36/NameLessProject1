const mongoose = require("mongoose");
const { STATUS_PENDING } = require("../utils/constants");

const schema = new mongoose.Schema({
  queue: String,
  payload: mongoose.Schema.Types.Mixed,
  retryCount: { type: Number, default: 0 },
  status: { type: String, default: STATUS_PENDING },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PendingMessage", schema);
