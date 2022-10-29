const {
  createCategoryService,
  getCategoryService,
  getCategoryByIdService,
  updateCategoryService,
} = require("../services/category.service");

exports.createCategory = async (req, res, next) => {
  try {
    const result = await createCategoryService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the category",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the category",
      error: error.message,
    });
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const result = await getCategoryService();
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the categories",
      error: error.message,
    });
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await getCategoryByIdService(id);

    if (!category) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a category with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the category",
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateCategoryService(id, req.body);
    if (!result.nModified) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the category with this id",
        updateCategory,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the category",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the category",
      error: error.message,
    });
  }
};
