import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
