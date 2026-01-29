import mongoose from "mongoose";

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default mongoose.models["Product"] ||
  mongoose.model("Product", productSchema);
