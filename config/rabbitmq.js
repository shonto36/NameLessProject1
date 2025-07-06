const amqp = require("amqplib");
const {
  MSG_RABBITMQ_CONN_SUCCESS,
  MSG_RABBITMQ_CONN_FAIL,
  MSG_RABBITMQ_NOT_CONNECTED,
} = require("../utils/constants");

let channel = null;
let isConnected = false;

const connectRabbitMQ = async () => {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URI);
    channel = await conn.createChannel();
    isConnected = true;
    console.log(MSG_RABBITMQ_CONN_SUCCESS);
  } catch (error) {
    console.error(MSG_RABBITMQ_CONN_FAIL);
    isConnected = false;
  }
};

const publishToQueue = async (queue, message) => {
  if (!isConnected || !channel) throw new Error(MSG_RABBITMQ_NOT_CONNECTED);

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};

module.exports = {
  connectRabbitMQ,
  publishToQueue,
  isConnected: () => isConnected,
};
