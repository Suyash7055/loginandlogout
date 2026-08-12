// import express from "express";
// import mongoose from "mongoose";
// import config from "./config.mjs";
// import router from "./route.mjs";
// const app = express();
// app.use(express.json());
// mongoose.connect(config.mongoDB).then(() => {
//   console.log("Connected to MongoDB");
// }).catch((err) => {
//   console.error("Error connecting to MongoDB:", err);
// });
// app.use('/', router);
// app.listen(config.PORT, () => {
//   console.log(`Server is running on port ${config.PORT}`);
// }); 





import express from "express";
import mongoose from "mongoose";
import config from "./config.mjs";
import router from "./route.mjs";

const app = express();

app.use(express.json());

mongoose.connect(config.mongoDB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
mongoose.set('debug', true);
'debug', true

app.use("/", router);

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
