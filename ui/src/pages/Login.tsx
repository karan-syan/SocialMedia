import { Box, Button, styled, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginInit } from "../utils/init";
import { loginSchema } from "../utils/schema";

const Login = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: loginInit,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
        navigate("/");
      } catch (err) {}
    },
  });
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    formik;

  return (
    <Root>
      <Card>
        <CardLeft>
          <CardLeftTitle>Hello World.</CardLeftTitle>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            suscipit ut explicabo qui atque! Quis in voluptas, repudiandae illo
            non consectetur blanditiis nobis ut, quae magnam nam aliquid
            laboriosam quidem, quo architecto molestias veniam.
          </Typography>
          <Typography fontSize={"14px"}>Don't you have an account?</Typography>
          <RegisterButton
            variant="contained"
            onClick={() => navigate("/register")}
          >
            Register
          </RegisterButton>
        </CardLeft>
        <CardRight>
          <CardRightTitle variant="h3">Login</CardRightTitle>
          <LoginForm onSubmit={handleSubmit}>
            {touched.username && (
              <Typography color={"red"}>{errors.username}</Typography>
            )}
            <InputField
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {touched.password && (
              <Typography color={"red"}>{errors.password}</Typography>
            )}
            <InputField
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <LoginButton variant="contained" type="submit">
              Login
            </LoginButton>
          </LoginForm>
        </CardRight>
      </Card>
    </Root>
  );
};

export default Login;
const Root = styled(Box)(({ theme }) => ({
  height: "100vh",
  backgroundColor: "rgb(193,190,255)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const Card = styled(Box)(() => ({
  display: "flex",
  width: "50%",
  backgroundColor: "#fff",
  borderRadius: "10px",
  minHeight: "600px",
  overflow: "hidden",
}));
const CardLeft = styled(Box)(() => ({
  flex: 1,
  background:
    "linear-gradient(rgba(39,11,96,0.5),rgba(39,11,96,0.5)), url(https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600), center",
  backgroundSize: "cover",
  padding: "50px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  color: "#fff",
}));

const CardLeftTitle = styled(Typography)(() => ({
  fontSize: "100px",
  lineHeight: "100px",
}));
const CardRightTitle = styled(Typography)(() => ({
  color: "#555",
}));
const RegisterButton = styled(Button)(({ theme }) => ({
  background: "white",
  color: theme.palette.primary.main,
  border: "none",
  width: "50%",
  padding: "10px",
  fontWeight: "bold",
  borderRadius: "0px",
  ":hover": {
    background: "white",
    color: theme.palette.primary.main,
  },
}));
const CardRight = styled(Box)(() => ({
  flex: 1,
  padding: "50px",
  display: "flex",
  gap: "50px",
  flexDirection: "column",
  justifyContent: "center",
}));
const LoginForm = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
}));
const InputField = styled("input")(() => ({
  border: "none",
  borderBottom: "1px solid lightgray",
  padding: "20px 10px",
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: "white",
  background: theme.palette.secondary.main,
  border: "none",
  width: "50%",
  padding: "10px",
  fontWeight: "bold",
  borderRadius: "0px",
  ":hover": {
    background: theme.palette.secondary.main,
    color: "white",
  },
}));
