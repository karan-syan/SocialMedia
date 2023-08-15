import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short!!")
    .required("Please enter your username"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "Password must be 8 character long")
    .required("Please enter your password"),
  name: Yup.string().required("Please enter your name").min(2),
});
export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short!!")
    .required("Please enter your username"),
  password: Yup.string()
    .min(8, "Password must be 8 character long")
    .required("Please enter your password"),
});
