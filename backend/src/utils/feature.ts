import mongoose from 'mongoose';

import { Product } from "../models/product.js";
import { InvalidateCacheProps } from '../types/types.js';
import { myCache } from '../app.js';

export const connectDb = (uri:string) => {
    mongoose.connect(uri, {
        dbName: 'Ecommerce'
    }).then(c => console.log(`DB connected to ${c.connection.host}`))
    .catch(e => console.log(e));
}

export const invalidateCache = async ({
    product,
    order,
    admin,
    review,
    userId,
    orderId,
    productId,
  }:InvalidateCacheProps)=>{
    if(product){
 const productkeys: string []=["latest-products","categories","all-products"];

 const products = await Product.find({}).select("_id");
 
 products.forEach(i=>{
    productkeys.push(`product-${i._id}`);
 })




 myCache.del(productkeys)
    }

}