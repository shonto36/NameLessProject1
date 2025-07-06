// middlewares/auditLogger.js
// Middleware for audit logging
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../logs/audit.log");

module.exports = (req, res, next) => {
  // You can enhance this to log more details as needed
  const user =
    req.kauth && req.kauth.grant && req.kauth.grant.access_token
      ? req.kauth.grant.access_token.content.preferred_username
      : "anonymous";
  const logEntry = {
    time: new Date().toISOString(),
    user,
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    ip: req.ip,
  };
  fs.appendFile(logFile, JSON.stringify(logEntry) + "\n", (err) => {
    if (err) console.error("Audit log write failed:", err);
  });
  next();
};
