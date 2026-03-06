
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connection } = require("./Config/db");
const userRoutes = require("./routes/user.route");
const bookRoutes = require("./routes/book.route");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/book", bookRoutes);

app.get("/",(req,res)=>{
  res.send("LibSpace API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async()=>{
  try{
    await connection;
    console.log("Connected to MongoDB");
    console.log("Server running on port",PORT);
  }catch(err){
    console.log("DB connection error");
  }
});
