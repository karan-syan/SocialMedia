import bcrypt from "bcrypt";
import { createToken } from "../middleware/jwt_token";
import { Users } from "../models/users.model";
interface IUser {
  name: string;
  password: string;
  username: string;
  email: string;
}
class AuthService {
  register = async (params: IUser) => {
    const { email } = params;
    try {
      let user = await Users.find({ email });
      if (user.length > 0) {
        throw new Error("Invalid email");
      }
      await Users.create(params);
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  };
  login = async (params: { email: string; password: string }) => {
    const { email } = params;
    try {
      const userDetails = await Users.findOne({ email });
      if (!userDetails) throw new Error("Invalid email");

      if (!userDetails.matchPassword(params.password))
        throw new Error("Invalid password");
      const token = createToken(userDetails.id);
      const { password, ...other } = userDetails;
      return {
        accessToken: token,
        userDetails: other,
      };
    } catch (error) {
      throw new Error("Internal Server Error");
    }
  };
}
const authService = new AuthService();
export default authService;
