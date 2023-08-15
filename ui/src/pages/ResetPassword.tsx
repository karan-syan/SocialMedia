import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const { token } = useParams();
  const navigate = useNavigate();
  const handleClick = async () => {
    if (password.length >= 8 && token) {
      const result = await axios.patch(
        `http://localhost:8800/api/users/resetPassword?token=${token}`,
        { newPassword: password }
      );
      if (result) {
        navigate("/login");
      }
    }
  };
  return (
    <Box>
      <Typography>ResetPassword</Typography>
      <TextField
        placeholder="new password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <Button onClick={handleClick}>Reset password</Button>
    </Box>
  );
};

export default ResetPassword;
