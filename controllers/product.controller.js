const {
  getProductsService,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");
// const fs = require("fs");

module.exports.getProducts = async (req, res) => {
  try {
    // const products = await Product.where("name")
    //   .equals(/\w/)
    //   .where("quantity")
    //   .gt(100)
    //   .lt(600)
    //   .limit(2)
    //   .sort({ quantity: -1 });

    // {price:{$gt:50}}

    let filters = { ...req.query };
    // sort, page, litmit → exclude

    const excludeFields = ["sort", "page", "limit", "fields"];
    excludeFields.forEach((field) => delete filters[field]);

    // gt, lt, gte, lte

    if (req.query.price) {
      let filtersString = JSON.stringify(filters);
      filtersString = filtersString.replace(
        /\b(gt|gte|lt|lte)\b/g,
        (match) => `$${match}`
      );
      filters = JSON.parse(filtersString);
    }

    const queries = {};

    if (req.query.sort) {
      // price,quantity → 'price quantity
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
    }
    if (req.query.fields) {
      // name, price → 'name price
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query; //string
      // 50 products
      // each page 10 product
      // page 1 → 1-10
      // page 2 → 11-20
      // page 3 → 21-30   → page 3 → skip 1-20 → 3-1 → skip 2*10 (limit)
      // page 4 → 31-40   → page 4 → skip 1-30 → 4-1 → skip 3*10 (limit)
      // page 5 → 41-50

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductsService(filters, queries);

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "cant't get the data",
      error: error.message,
    });
  }
};

module.exports.createProduct = async (req, res, next) => {
  // save or created
  try {
    // const data =  fs.readFileSync('./data/MOCK_DATA.json');
    // const parsedData = JSON.parse(data)
    const result = await createProductService(req.body);
    result.logger();

    res.status(200).json({
      status: "success",
      message: "Data inserted successfull",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "Data is not inserted",
      error: err.message,
    });
  }
};

// const product = new Product(req.body);

// instance ccreation => Do something => save()
// if (product.quantity === 0) {
//   product.status = "out-of-stock";
// }
// const result = await product.save();

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);
    if (!result) {
      res.status(400).json({
        status: "failed",
        message: "Couldn't update the product",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated  the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);
    if (!result) {
      res.status(400).json({
        status: "failed",
        message: "Couldn't update the product",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated  the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't update the product",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteProductByIdService(id);
    if (!result.deletedCount) {
      res.status(400).json({
        status: "fail",
        error: "Couldn't delete the product",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully deleted  the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);
    if (!result) {
      res.status(400).json({
        status: "failed",
        message: "Couldn't delete the products",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully deleted the given products",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Couldn't delete given products",
      error: error.message,
    });
  }
};
