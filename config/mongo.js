// config/mongo.js

const mongoose = require("mongoose");
const {
  MSG_MONGODB_CONN_SUCCESS,
  MSG_MONGODB_CONN_FAIL,
} = require("../utils/constants");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(MSG_MONGODB_CONN_SUCCESS);
  } catch (error) {
    console.error(MSG_MONGODB_CONN_FAIL, error.message);
    process.exit(1); // Exit if DB fails to connect
  }
};

module.exports = connectDB;
