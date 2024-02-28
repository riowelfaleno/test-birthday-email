require("dotenv").config();
import mongoose from "mongoose";

const MONGO_DB_URI = "mongodb://0.0.0.0:27017/local";

mongoose.connect(MONGO_DB_URI);
mongoose.set("debug", true);

const dbMongo = mongoose.connection;
dbMongo.on("error", console.error.bind(console, "Connection error "));
dbMongo.once("open", function () {
  console.log("MongoDB connection established");
});
