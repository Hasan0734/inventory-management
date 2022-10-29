const {
  createStockService,
  getStockService,
  getStockByIdService,
  updateStockService,
} = require("../services/stock.service");

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

exports.getStock = async (req, res, next) => {
  try {
    const stocks = await getStockService();
    res.status(200).json({
      status: "success",
      data: stocks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the stock",
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
        error: "Couldn't update the stock with this id"
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
