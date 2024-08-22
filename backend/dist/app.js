import express from "express";
import { connectDb } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
const app = express();
const port = 9000;
connectDb();
export const myCache = new NodeCache();
app.use(express.json());
//importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
app.get("/", (req, resp) => {
    resp.send("Api working");
});
//using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
//middlewares
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
});
