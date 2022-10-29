const express = require("express");
const app = express();
const cors = require("cors");

// middlewares
app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routes/product.route");
const brandRoute = require('./routes/brand.route');
const categoryRoute = require('./routes/category.route');
const stockRoute = require('./routes/stock.route');

app.get('/', (req, res) => {
    res.send('Route is working! YaY!')
})

app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use('/api/v1/category', categoryRoute);
app.use("/api/v1/stock", stockRoute);

module.exports = app;
