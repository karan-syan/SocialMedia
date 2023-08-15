import { Request, Response } from "express";
import { QueryError, RowDataPacket } from "mysql2";
import { db } from "../connect";
export const searchUser = (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    if (!username) res.status(500).json({ message: "username required" });
    const query = `select id, username, name, profilePic from users where username Like '${username}%'`;
    db.execute(query, (err: QueryError | null, data: RowDataPacket[]) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
