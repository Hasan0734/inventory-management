const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock.controller");



// router.route("/bulk-update").patch(productController.bulkUpdateProduct);
// router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/")
  .post(stockController.createStock)
  .get(stockController.getStocks);
router
  .route("/:id")
  .get(stockController.getStockById)
  .patch(stockController.updateStock);

module.exports = router;
