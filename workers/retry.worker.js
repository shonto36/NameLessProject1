const PendingMessage = require("../models/pendingMessage.model");
const { publishToQueue, isConnected } = require("../config/rabbitmq");
const {
  STATUS_PENDING,
  STATUS_SENT,
  MSG_RETRY_SKIP,
  MSG_FOUND_PENDING,
  MSG_DELIVERED,
  MSG_MARKED_SENT,
  MSG_FAILED_RETRY,
} = require("../utils/constants");

const retryPendingMessages = async () => {
  if (!isConnected()) {
    console.log(MSG_RETRY_SKIP);
    return;
  }

  const messages = await PendingMessage.find({ status: STATUS_PENDING });
  console.log(`${MSG_FOUND_PENDING}${messages.length} pending message(s)`);

  for (const msg of messages) {
    try {
      await publishToQueue(msg.queue, msg.payload);

      msg.status = STATUS_SENT; // 🟢 Mark as delivered
      await msg.save();

      console.log(`${MSG_DELIVERED}${msg._id}${MSG_MARKED_SENT}`);
    } catch (err) {
      msg.retryCount += 1;
      await msg.save();
      console.warn(`${MSG_FAILED_RETRY}${msg._id}:`, err.message);
    }
  }
};

module.exports = retryPendingMessages;
