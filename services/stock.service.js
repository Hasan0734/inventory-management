const Stock = require('../modells/Stock');

exports.createStockService = async (data) => {
    const result = await Stock.create(data);
    return result;
};

exports.getStockService = async () => {
    const result = await Stock.find({});
    return result;
};

exports.getStockByIdService = async (categoryId) => {
  const stock = await Stock.findOne({ _id: categoryId });
  return stock;
};

exports.updateStockService = async (stockId, data) => {
  const result = await Stock.updateOne({ _id: stockId }, data, {
    runValidators: true,
  });
  return result;
};
