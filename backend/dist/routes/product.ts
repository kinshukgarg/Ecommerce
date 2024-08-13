import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import { newProduct } from "../controllers/product.js";
const app = express.Router();
// To Create New Product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct); // Ensure singleUpload middleware is first
export default app;
