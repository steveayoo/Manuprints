const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    delivery: { type: Number, default: 0 },
    description: { type: String, default: "" },
    fabric: { type: String, default: "" },
    sizes: [{ type: String }],
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);