import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import transactionRoute from "./routes/transaction.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { whitelist } from "./config/corsOption.js";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGOURI, (err) => {
  if (err) console.log("cannot connect to db");
  else {
    console.log("db connetion successfully established");
  }
});

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: { whitelist },
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.get("/", (req, res, next) => {
  res.status(200).send("Beginning of awesomness!");
});
app.use("/api/", authRoute);
app.use("/api/transactions", transactionRoute);

app.listen(process.env.PORT, () =>
  console.log(`app started on ${process.env.PORT}`)
);

// app.listen(8000, 'localhost'); // or app.listen(3001, '0.0.0.0'); for all interfaces
// app.on('listening', function() {
//     console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// });
