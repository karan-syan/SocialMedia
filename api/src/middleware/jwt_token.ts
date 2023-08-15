import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { Users } from "../models/users.model";
import { ObjectId } from "mongoose";
interface TokenPayloadType {
  _id: ObjectId;
}
export const createToken = (_id: ObjectId) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET || "");
};
export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken || req.query.token;
    if (!token) return res.status(401).send({ message: "Not logged in!" });
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET || "");
    if (!decoded) return res.status(403).send({ message: "Token not valid" });
    // const user = await Users.findById((decoded as TokenPayloadType)._id);
    req.body["token"] = (decoded as TokenPayloadType)._id;
    next();
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
