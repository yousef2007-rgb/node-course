const express = require("express");
const app = express();
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");

require("dotenv").config();

mongoose.connect("mongodb://127.0.0.1:27017/playground")
    .then(() => console.log("connected to mongodb"))
    .catch(err => console.log(`couldn't connect to mongodb error: ${err}`))

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})