const Supplier = require("../models/Supplier");

exports.createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};

exports.getSupplierService = async () => {
  const suppliers = await Supplier.find({}).populate("products");
  return suppliers;
};

exports.getSupplierByIdService = async (supplierId) => {
  const supplier = await Supplier.findOne({ _id: supplierId });
  return supplier;
};
exports.updateSupplierService = async (supplierId, data) => {
  const result = await Supplier.updateOne({ _id: supplierId }, data, {
    runValidators: true,
  });
  return result;
};
