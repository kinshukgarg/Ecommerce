import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import { Request } from "express";
import { BaseQuery, NewProductRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { myCache } from "../app.js";
// import {faker} from '@faker-js/faker'

export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category, description } = req.body;
    const photo = req.file;

    // Validate all required fields
    if (!name || !price || !stock || !category || !description) {
      return next(new ErrorHandler("Please enter All Fields", 400));
    }
    if (!photo) {
      return next(new ErrorHandler("Please add Photo", 400));
    }

    // Create the new product
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
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);


  myCache.set("latest-product",JSON.stringify(products))

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
export const getSingleProduct = TryCatch(async (req, res, next) => {
  // let product;
  const id = req.params.id;
  const product = await Product.findById(id);
  // const key = `product-${id}`;

  // product = await redis.get(key);
  // if (product) product = JSON.parse(product);
  // else {
  //   product = await Product.findById(id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  //   await redis.setex(key, redisTTL, JSON.stringify(product));
  // }

  return res.status(200).json({
    success: true,
    product,
  });
});
export const getAllCategories = TryCatch(async (req, res, next) => {
  // let categories;
  const categories = await Product.distinct("category");

  // categories = await redis.get("categories");

  // if (categories) categories = JSON.parse(categories);
  // else {
  //   categories = await Product.distinct("category");
  //   await redis.setex("categories", redisTTL, JSON.stringify(categories));
  // }

  return res.status(200).json({
    success: true,
    categories,
  });
});

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category, description } = req.body;
  const photo = req.file;

  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Inavild Product Id", 404));

  if (photo) {
    rm(product.photo!, () => {
      console.log(" old photo deleted");
    });
    product.photo = photo.path;
  }

  // if (photo && photo.length > 0) {
  // const photosURL = await uploadToCloudinary(photos);

  // const ids = product.photos.map((photo) => photo.public_id);

  // await deleteFromCloudinary(ids);

  // product.photos = photosURL;
  // }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  // if (description) product.description = description;

  await product.save();

  // await invalidateCache({
  //   product: true, 
  //   productId: String(product._id),
  //   admin: true,
  // });

  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const productId = req.params.id;

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  // Delete the product's photo if it exists
  if (product.photo) {
    rm(product.photo, () => {
      console.log("Product photo deleted");
    });
  }

  // Delete the product from the database
  await Product.deleteOne({ _id: productId });

  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
  //  let products;
  const products = await Product.find({});

  // products = await redis.get("all-products");

  // if (products) products = JSON.parse(products);
  // else {
  //   products = await Product.find({});
  //   await redis.setex("all-products", redisTTL, JSON.stringify(products));
  // }

  return res.status(200).json({
    success: true,
    products,
  });
});

// export const getAllProducts = TryCatch(
//   async (req: Request<{}, {}, {}>, resp, next) => {
//     const { search, sort, category, price } = req.query;

//     const page = Number(req.query.page) || 1;

//     const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
//     const skip = (page - 1) * limit;

//     const baseQuery: BaseQuery = {};

//     if (search) {
//       baseQuery.name = {
//         $regex: search as string,
//         $options: "i",
//       };
//     }

//     if (price) {
//       baseQuery.price = {
//         $lte: Number(price),
//       };
//     }

//     if (category) {
//       baseQuery.category = category as string;
//     }
//     const productsPromise=Product.find(baseQuery)
//     .sort(sort && { price: sort === "asc" ? 1 : -1 })
//       .limit(limit)
//       .skip(skip)


//     const [products,filterdOnlyProduct]= await Promise.all([
//       Product.find(baseQuery)
//       .sort(sort && { price: sort === "asc" ? 1 : -1 })
//       .limit(limit)
//       .skip(skip),Product.find(baseQuery)

//     ])

   

     
//      const totalPage = Math.ceil(filterdOnlyProduct.length / limit);

//     return resp.status(200).json({
//       success: true,
//       products,
//       // totalPage,
//     });
//   }
// );

export const getAllProducts = TryCatch(async (req: Request<{}, {}, {}>, resp, next) => {
  const { search, sort, category, price } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
  const skip = (page - 1) * limit;

  const baseQuery: BaseQuery = {};

  if (search) {
    baseQuery.name = {
      $regex: search as string,
      $options: "i",
    };
  }

  if (price) {
    baseQuery.price = {
      $lte: Number(price),
    };
  }

  if (category) {
    baseQuery.category = category as string;
  }

  const [products, totalCount] = await Promise.all([
    Product.find(baseQuery)
      .sort(sort ? { price: sort === "asc" ? 1 : -1 } : {})
      .limit(limit)
      .skip(skip),
    Product.countDocuments(baseQuery),
  ]);

  const totalPage = Math.ceil(totalCount / limit);

  return resp.status(200).json({
    success: true,
    products,
    totalPage,
  });
});
