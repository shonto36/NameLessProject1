// utils/constants.js
// Centralized constants for queue names, statuses, and messages

module.exports = {
  QUEUE_MAIN: "mainQueue",
  STATUS_PENDING: "pending",
  STATUS_SENT: "sent",
  MSG_RABBITMQ_NOT_CONNECTED: "RabbitMQ not connected",
  MSG_RABBITMQ_CONN_SUCCESS: "✅ Connected to RabbitMQ",
  MSG_RABBITMQ_CONN_FAIL: "❌ RabbitMQ connection failed",
  MSG_MONGODB_CONN_SUCCESS: "✅ MongoDB connected",
  MSG_MONGODB_CONN_FAIL: "❌ MongoDB connection failed:",
  MSG_API_RUNNING: "🟢 API is running",
  MSG_API_START: "🚀 API running on http://localhost:",
  MSG_NAME_REQUIRED: "Name is required",
  MSG_REQUEST_SAVED: "✅ Request saved successfully",
  MSG_FALLBACK_MONGO: "⚠️ Failed to publish, fallback to MongoDB",
  MSG_RABBITMQ_DOWN: "🟡 RabbitMQ is down, saving message for retry",
  MSG_RETRY_SKIP: "🔌 RabbitMQ is still disconnected. Skipping retries...",
  MSG_FOUND_PENDING: "🧹 Found ",
  MSG_DELIVERED: "✅ Message ",
  MSG_MARKED_SENT: " delivered & marked sent",
  MSG_FAILED_RETRY: "⚠️ Failed retry for ",
  ROLE_USER: "user",
  ROLE_ADMIN: "admin",
  MSG_AUDIT_SUBMIT:
    "[AUDIT] User '{user}' submitted a request with name: '{name}'",
};
