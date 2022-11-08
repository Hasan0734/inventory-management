const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
// schema deshign

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true, //remove space after and before
      unique: [true, "Name must be unique"],
      lowercase: true,
      minLength: [3, "Name must be at least 3 charcters."],
      maxLength: [100, "Name is  too large"],
    },
    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "Unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: [validator.isURL, "wrong url"],
      },
    ],
    // imageURLs: [
    //   {
    //     type: String,
    //     required: true,
    //     validate: {
    //       validator: (value) => {
    //         if (!Array.isArray(value)) {
    //           return false;
    //         }
    //         let isValid = true;
    //         value.forEach((url) => {
    //           if (!validator.isURL(url)) {
    //             isValid = false;
    //           }
    //         });
    //         return isValid;
    //       },
    //       message: "Please provide valid image urls",
    //     },
    //   },
    // ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
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

// productSchema.methods.logger = function () {
//   console.log(`Data saved for name ${this.name}`);
// };
// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// });

//SCHEMA => MODEL => QUERY

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
