const mongoose = require('mongoose')

// schema deshign

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true, //remove space after and before
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 charcters."],
      maxLength: [100, "Name is  too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "Unit value can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer.",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discountinued"],
        message: "Status can't be {VALUE",
      },
    },
    // createdAt: {
    //   type: Date,
    //   defaultValuue: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   defaultValuue: Date.no,
    // },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

//mongoose middlewares for saving data: pre/post

productSchema.pre("save", function (next) {
  // this →
  console.log("Before saving data");
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

productSchema.methods.logger = function () {
  console.log(`Data saved for name ${this.name}`);
};
// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// });

//SCHEMA => MODEL => QUERY

const Product = mongoose.model("Product", productSchema);


module.exports = Product;