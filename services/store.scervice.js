const Store = require("../modells/Store");

exports.createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};

exports.getStoreService = async () => {
  const result = await Store.find({});
  return result;
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
