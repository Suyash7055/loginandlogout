import express from "express";
import mongoose from "mongoose";
import config from "../config.js";
const app = express();
app.use(express.json());
mongoose.connect(config.mongoURI).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
app.use('/', router);
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
}); 
