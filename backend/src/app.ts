import express, { NextFunction,Response,Request } from "express";
import { connect } from "http2";
import { connectDb } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import {config} from "dotenv"
import

const app = express();


config({
  path: "./.env"
})

const port = process.env.PORT || 9000;
const mongoURI= process.env.MONGO_URI || "";

connectDb(mongoURI);



export const myCache= new NodeCache();
app.use(express.json());

//importing Routes

import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/orders.js";


app.get("/", (req, resp) => {
  resp.send("Api working");
});

//using Routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);







//middlewares
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
