import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, // Đây là khóa ngoại liên kết đến Category
    ref: "Category", // Tên của model Category
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Products", productSchema);
