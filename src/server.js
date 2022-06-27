require("./db/connection");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5001;
const userRouter = require("./user/routes");

//After the bellow line the app will be able to use JSON data, therefore it must be runned first
app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});