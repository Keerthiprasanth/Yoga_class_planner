require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const user = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("MongoDB connected");
    });
  })
  .catch((error) => {
    console.log(error);
  });
  app.listen(3001,()=>{
    console.log("server is runing")
  })

app.use("/api/user", user);
