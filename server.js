const app = require("./app");
const retryWorker = require("./workers/retry.worker");
const { connectRabbitMQ } = require("./config/rabbitmq");
const { MSG_API_START } = require("./utils/constants");

const PORT = process.env.PORT || 3000;

const start = async () => {
  await connectRabbitMQ();

  app.listen(PORT, () => {
    console.log(`${MSG_API_START}${PORT}`);
  });

  // Retry every 15s
  setInterval(retryWorker, 15000);
};

start();
