import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import { db } from "./connect";
import mainRouter from "./mainRoutes";
import mongoose from "mongoose";
const app: Express = express();
const port = process.env.PORT || 8800;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost:27017/Social")
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((e) => {
    console.log("error in mongoose connection");
  });

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, __dirname + "/public/images/"); // './public/images/' directory name where save the file
  },
  filename: (req, file, callBack) => {
    callBack(null, Date.now() + file.fieldname + ".jpeg");
  },
});

const upload = multer({
  storage: storage,
});

db.initialize()
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/api", mainRouter);

app.use("/api/upload", upload.single("file"), (req: Request, res: Response) => {
  const file = req.file;
  res.status(200).json(file?.filename);
});

app.use("/api/image/:id", (req: Request, res: Response) => {
  return res.sendFile(__dirname + "/public/images/" + req.params.id);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
