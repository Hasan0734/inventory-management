const {
  createStockService,
  getStockService,
  getStockByIdService,
  updateStockService,
} = require("../services/stock.service");

exports.getStocks = async (req, res, next) => {
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

    const stocks = await getStockService(filters, queries);

    res.status(200).json({
      status: "success",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "cant't get the data",
      error: error.message,
    });
  }
};

exports.createStock = async (req, res, next) => {
  try {
    const result = await createStockService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the stock",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the stock",
      error: error.message,
    });
  }
};



exports.getStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stock = await getStockByIdService(id);

    if (!stock) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a stock with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: stock,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the stock",
      error: error.message,
    });
  }
};

exports.updateStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStockService(id, req.body);
    if (!result.nModified) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the stock with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the stock",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the stock",
      error: error.message,
    });
  }
};
