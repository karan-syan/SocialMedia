import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../helper/joi";
import authService from "../services/auth.service";
class AuthController {
  async register(req: Request, res: Response) {
    const valid = registerSchema.validate(req.body);
    if (valid.error) return res.status(500).json({ message: "Invalid data" });
    try {
      await authService.register(req.body);
      return res.status(201).send({ message: "user has been created" });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async login(req: Request, res: Response) {
    const valid = loginSchema.validate(req.body);
    if (valid.error) return res.status(500).json({ message: "Invalid data" });
    try {
      const result = await authService.login(req.body);

      return res
        .cookie("accessToken", result?.accessToken, {
          httpOnly: true,
        })
        .status(200)
        .json(result?.userDetails);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  logout(req: Request, res: Response) {
    try {
      res
        .clearCookie("accessToken", {
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json("User has been logged out");
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }
}
const authController = new AuthController();
export default authController;
