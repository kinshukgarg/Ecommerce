import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import { Request } from "express";
import { NewProductRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category, description } = req.body;
    const photo = req.file; 



    if (!name || !price || !stock || !category || !description)
      return next(new ErrorHandler("Please enter All Fields", 400));
    if (!photo) return next(new ErrorHandler("Please add Photo", 400));
    
    if (!name || !price || !stock || !category || !description){
       rm(photo.path,() =>{
        console.log("deleted")
      })
    }
   
    await Product.create({
      name,
      price,
      description,
      stock,
      category,
      photo: photo.path,
    });

    return res.status(201).json({
      success: true,
      message: "Product created",
    });
  }
);

export const getlatestProducts = TryCatch(async (req, res, next) => {
  // let products;
  const products=await Product.find({}).sort

  // products = await redis.get("latest-products");

  // if (products) products = JSON.parse(products);
  // else {
  //   products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
  //   await redis.setex("latest-products", redisTTL, JSON.stringify(products));
  // }

  return res.status(200).json({
    success: true,
    products,
  });
});
