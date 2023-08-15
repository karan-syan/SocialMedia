import { Box, Button, styled, Typography } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../utils/schema";
import { registerInit } from "../utils/init";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  // const [resError, setResError] = useState<string>("");
  const registerUser = async (inputs: typeof registerInit) => {
    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      navigate("/login");
    } catch (error) {}
  };
  const formik = useFormik({
    initialValues: registerInit,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      registerUser(values);
    },
  });
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    formik;

  return (
    <Root>
      <Card>
        <CardLeft>
          <CardLeftTitle variant="h3">Register</CardLeftTitle>
          <LoginForm onSubmit={handleSubmit}>
            {touched.username && (
              <Typography color={"red"}>{errors.username}</Typography>
            )}
            <InputField
              type="text"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              name="username"
              onBlur={handleBlur}
            />
            {touched.email && (
              <Typography color={"red"}>{errors.email}</Typography>
            )}
            <InputField
              type="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
            />
            {touched.password && (
              <Typography color={"red"}>{errors.password}</Typography>
            )}
            <InputField
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
            />
            {touched.name && (
              <Typography color={"red"}>{errors.name}</Typography>
            )}
            <InputField
              type="text"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
              name="name"
              onBlur={handleBlur}
            />
            <LoginButton variant="contained" type="submit">
              Register
            </LoginButton>
          </LoginForm>
        </CardLeft>
        <CardRight>
          <CardRightTitle>Kame Social.</CardRightTitle>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            suscipit ut explicabo qui atque! Quis in voluptas, repudiandae illo
            non consectetur blanditiis nobis ut, quae magnam nam aliquid
            laboriosam quidem, quo architecto molestias veniam.
          </Typography>
          <Typography fontSize={"14px"}>Do you have an account?</Typography>
          <RegisterButton
            variant="contained"
            onClick={() => navigate("/login")}
          >
            Login
          </RegisterButton>
        </CardRight>
      </Card>
    </Root>
  );
};

export default Register;
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
const CardRight = styled(Box)(() => ({
  flex: 1,
  background:
    "linear-gradient(rgba(39,11,96,0.5),rgba(39,11,96,0.5)), url(https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600), center",
  backgroundSize: "cover",
  padding: "50px",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  color: "#fff",
}));

const CardRightTitle = styled(Typography)(() => ({
  fontSize: "100px",
  lineHeight: "100px",
}));
const CardLeftTitle = styled(Typography)(() => ({
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
const CardLeft = styled(Box)(() => ({
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
