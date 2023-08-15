import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { OkPacket, QueryError, RowDataPacket } from "mysql2";
import { resetPasswordSchema, updateUserSchema } from "../helper/joi";
import { createToken } from "../middleware/jwt_token";
export const getUser = (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) res.status(500).json({ message: "userId required" });

    const query = "select * from users where id = ?";
    db.execute(
      query,
      [userId],
      (err: QueryError | null, data: RowDataPacket[]) => {
        if (err) return res.status(500).json(err);
        const { password, ...info } = data[0];
        return res.status(200).json(info);
      }
    );
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
export const updateUser = (req: Request, res: Response) => {
  const valid = updateUserSchema.validate(req.body);
  if (valid.error) return res.status(500).json({ message: "Invalid data" });
  try {
    const { name, city, website, profilePic, coverPic, token } = req.body;
    const query =
      "update users set `name`=?,`city`=?,`website`=?,`profilePic`=?,`coverPic`=? where id = ?";
    db.execute(
      query,
      [name, city, website, profilePic, coverPic, token],
      (err: QueryError | null, data: OkPacket) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.status(200).json("user updated");
        return res.status(403).json("you can update only your profile");
      }
    );
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const sendResetPasswordMail = async (req: Request, res: Response) => {
  try {
    const { email, name, token } = req.body;
    const newToken = createToken(token);
    await sendResetMail(email, newToken, name);
    return res.status(200).send({ message: "mail is sent for password reset" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
export const resetPassword = async (req: Request, res: Response) => {
  const valid = resetPasswordSchema.validate(req.body);
  if (valid.error) return res.status(500).json({ message: "Invalid data" });
  try {
    const { token, newPassword } = req.body;
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    const query = "update users set password = ? where id = ?";
    db.execute(
      query,
      [hashedPassword, token],
      (err: QueryError | null, data: OkPacket) => {
        if (err)
          return res.status(500).send({ message: "failed to reset password" });
        return res.status(200).send({ message: "password has been reset" });
      }
    );
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};
