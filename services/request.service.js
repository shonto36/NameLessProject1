const Request = require("../models/request.model");
const PendingMessage = require("../models/pendingMessage.model");
const { publishToQueue, isConnected } = require("../config/rabbitmq");
const {
  QUEUE_MAIN,
  MSG_FALLBACK_MONGO,
  MSG_RABBITMQ_DOWN,
} = require("../utils/constants");

exports.createRequest = async ({ name, data }) => {
  const saved = await Request.create({ name, data });

  const msg = { requestId: saved._id, name, data };

  if (isConnected()) {
    try {
      await publishToQueue(QUEUE_MAIN, msg);
    } catch (err) {
      console.warn(MSG_FALLBACK_MONGO);
      await PendingMessage.create({ queue: QUEUE_MAIN, payload: msg });
    }
  } else {
    console.warn(MSG_RABBITMQ_DOWN);
    await PendingMessage.create({ queue: QUEUE_MAIN, payload: msg });
  }

  return saved;
};
