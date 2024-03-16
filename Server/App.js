require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const student = require("./routes/studentRoute");
const teacher = require("./routes/teacherRoute");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  app.listen(process.env.PORT, () => {
    console.log("MongoDB connected");
  });
})
.catch(err => console.error('MongoDB connection error:', err));

app.use("/api/student", student);
app.use("/api/teacher", teacher);
