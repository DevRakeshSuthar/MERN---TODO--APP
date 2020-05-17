const express = require("express");
const cors = require("cors");
const app = express();

// required env
require("dotenv").config();

// PORT
const Port = process.env.Port || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
const uri = process.env.ATLAS_URI;
const mongoose = require("mongoose");
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("error", err);
  });

// My Routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/todos", todoRoutes);

// Starting a Server
app.listen(Port, () => {
  console.log(`server is running at ${Port}`);
});
