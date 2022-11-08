const { createSupplierService, getSupplierService, getSupplierByIdService, updateSupplierService } = require("../services/supplier.service");

exports.createSupplier = async (req, res, next) => {
  try {
    const result = await createSupplierService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the supplier",
      error: error.message,
    });
  }
};
exports.getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await getSupplierService();

    res.status(200).json({
      status: "success",
      data: suppliers,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the suppliers",
      error: error.message,
    });
  }
};

exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await getSupplierByIdService(id);

    if (!brand) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a supplier with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the supplier",
      error: error.message,
    });
  }
};


exports.updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierService(id, req.body);
    if (!result.nModified) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the supplier with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the supplier",
      error: error.message,
    });
  }
};
