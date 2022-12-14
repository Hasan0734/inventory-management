const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};

exports.getBrandService = async () => {
  const brands = await Brand.find({}).populate('products');
  return brands;
};

exports.getBrandByIdService = async (brandId) => {
  const brand = await Brand.findOne({ _id: brandId });
  return brand;
};
exports.updateBrandService = async (brandId, data) => {
    const result = await Brand.updateOne({ _id: brandId }, data, {
      runValidators: true
  });
  return result;
};
