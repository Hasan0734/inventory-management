const {
  getStoreService,
  getStoreByIdService,
  createStoreService,
  updateStoreService,
} = require("../services/store.scervice");

exports.createStore = async (req, res, next) => {
  try {
    const result = await createStoreService(req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully created the store",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't create the store",
      error: error.message,
    });
  }
};

exports.getStore = async (req, res, next) => {
  try {
    const stores = await getStoreService();
    res.status(200).json({
      status: "success",
      data: stores,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the stores",
      error: error.message,
    });
  }
};

exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const store = await getStoreByIdService(id);

    if (!store) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a store with this id",
      });
    }
    res.status(200).json({
      status: "success",
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't get the store",
      error: error.message,
    });
  }
};

exports.updateStore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStoreService(id, req.body);
    if (!result.nModified) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the store with this id",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully updated the store",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't update the store",
      error: error.message,
    });
  }
};
