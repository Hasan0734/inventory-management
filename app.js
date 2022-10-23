const express = require("express");
const app = express();
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routes/product.route");

app.use("/api/v1/product", productRoute);

module.exports = app;
