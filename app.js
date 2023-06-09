require("dotenv").config();

const express = require("express");
const express_layout = require("express-ejs-layouts");
const connectDB = require("./server/config/db");

const app = express();

const PORT = 5000 || process.env.PORT;

// connect to mongo
connectDB();

app.use(express.static("public"));

// templating engine
app.use(express_layout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", require("./server/routes/main"));

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
