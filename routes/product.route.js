const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");
const authorization = require('../middleware/authrization');

// router.use(verifyToken)

router.post("/file-upload",uploader.single("image"), productController.fileUpload);

router
  .route("/")
  .get(productController.getProducts)
  .post(verifyToken, authorization('admin', 'store-manager'), productController.createProduct);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/:id")
  .patch(verifyToken, productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
