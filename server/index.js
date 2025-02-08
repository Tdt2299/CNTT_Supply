import path from "path";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import authRoutes from "./routes/authRoutes.js"
// import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Middleware
app.use(cors());
app.use(express.json());


// Đường dẫn đến thư mục build của frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "build")));

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Error connecting to DB:", error));

// Routes
app.use("/api", productRoutes, categoryRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(express.static('build'))
// Route để phục vụ frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
