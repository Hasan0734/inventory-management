const Store = require("../models/Store");

exports.createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};

exports.getStoreService = async () => {
  const stores = await Store.find();
  return stores;
};

exports.getStoreByIdService = async (storeId) => {
  const result = await Store.findOne({ _id: storeId });
  return result;
};

exports.updateStoreService = async (storeId, data) => {
  const result = await Store.updateOne({ _id: storeId }, data, {
    runValidators: true,
  });
  return result;
};
