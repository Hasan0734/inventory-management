const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the brand",
      error: error.message,
    });
  }
};
exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandService();

    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the brands",
      error: error.message,
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);

    if (!brand) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a brand with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the brands",
      error: error.message,
    });
  }
};
exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateBrandService(id, req.body);
    if (!result.nModified) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the brand with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the brand",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the brands",
      error: error.message,
    });
  }
};
