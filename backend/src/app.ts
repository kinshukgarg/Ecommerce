import express, { NextFunction,Response,Request } from "express";

const app = express();

const port = 9000;

connectDb();

app.use(express.json());

//importing Routes

import userRoute from "./routes/user.js";
import { connect } from "http2";
import { connectDb } from "./utils/feature.js";
import { errorMiddleware } from "./middlewares/error.js";

app.get("/", (req, resp) => {
  resp.send("Api working");
});

//using Routes

app.use("/api/v1/user", userRoute);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});
