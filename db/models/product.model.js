import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
  {
    product_code: {
      type: String,
      required: true,
      unique: true,
      default: Date.now
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    series: {
      type: String,
      required: true,
    },
    info: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    hit: {
      type: Boolean,
    },
    new: {
      type: Boolean,
    },
    sale: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Product", productSchema);
