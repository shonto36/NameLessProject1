// app.js

require("dotenv").config(); // Load .env config
const express = require("express");
const connectDB = require("./config/mongo");
const requestRoutes = require("./routes/request.routes");
const { MSG_API_RUNNING } = require("./utils/constants");
const session = require("express-session");
const { keycloak, memoryStore } = require("./middlewares/keycloak");
const auditLogger = require("./middlewares/auditLogger");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use("/api", requestRoutes);

// Session and Keycloak middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);
app.use(keycloak.middleware());

// Audit logging middleware (after Keycloak)
app.use(auditLogger);

// Routes (to be added soon)
app.get("/", (req, res) => {
  res.send(MSG_API_RUNNING);
});

module.exports = app;
