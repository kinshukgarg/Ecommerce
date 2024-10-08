import mongoose from 'mongoose';

import { Product } from "../models/product.js";
import { InvalidateCacheProps } from '../types/types.js';
import { myCache } from '../app.js';

export const connectDb = () => {
    mongoose.connect('mongodb+srv://admin:iBOK5TKcKGg4j7Zz@cluster0.oqosrqo.mongodb.net/', {
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
 myCache.del(productkeys)
    }

}