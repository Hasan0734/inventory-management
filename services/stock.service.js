const Stock = require("../models/Stock");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getStockService = async (filters, queries) => {
  // const stocks = await Stock.find(filters)
  //   .skip(queries.skip)
  //   .limit(queries.limit)
  //   .select(queries.fields)
  //   .sort(queries.sortBy);

  const stocks = await Stock.aggregate([
    { $match: { "store.name": "chattogram" } },
    {
      $project: {
        store: 1,
        price: { $convert: { input: "$price", to: "int" } },
        quantity: 1,
      },
    },
    {
      $group: {
        _id: "$store.name",
        totalProductsPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
      },
    },
  ]);
  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);

  return { total, page, stocks };
};

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};

exports.getStockByIdService = async (stockId) => {
  // const stock = await Stock.findOne({ _id: stockId })
  //   .populate("store.id")
  //   .populate("suppliedBy.id")
  //   .populate("brand.id");

  const stock = await Stock.aggregate([
    // state 1
    { $match: { _id: ObjectId(stockId) } },
    {
      $project: {
        name: 1,
        category: 1,
        quantity: 1,
        productId: 1,
        price: 1,
        "brand.name": { $toLower: "$brand.name" },
      },
    },
    {
      $lookup: {
        from: "brands",
        localField: "brand.name",
        foreignField: "name",
        as: "brandDetails",
      },
    },
  ]);

  return stock;
};

exports.updateStockService = async (stockId, data) => {
  const result = await Stock.updateOne({ _id: stockId }, data, {
    runValidators: true,
  });
  return result;
};
