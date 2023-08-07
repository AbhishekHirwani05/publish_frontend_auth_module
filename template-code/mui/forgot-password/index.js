module.exports = `import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ErrorMsg, ForgotPswBtn, Heading, MainBox, MainGrid, ParentBox } from "./style";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { options } from "../../../auth-config";
import { useNavigate } from "react-router-dom";
import {API_URL} from '../../../shared/apiEndPointURL';

/* interface for email field */
type UserData = {
  email?: string;
};

/* this is the starting point for the project */
const ForgotPassword = () => {

  /* this is for routing */
  const history = useNavigate();

  /* this is for form validation */
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>();

  /* this state is for set the fields input value */
  const [input, setInput] = useState<UserData>();

  /* regex for email address */
  let emailRegex = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/;

  /*  this function is for forgot password api call */
  const ForgotPasswordHandler = async (data: UserData,e:any) => {
    e.target.reset()
    try {
      let res = await fetch(\`\${API_URL.forgotPassword}\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
        }),
      });
      let resJson = await res.json();
      if (res.ok) {
        setInput(input);
        toast.success(resJson.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (options.cognito) {
          history("/reset-password", { state: { email: data.email } });
        }
      } else {
        toast.error(resJson.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box style={ParentBox}>
    <Box style={MainBox}>
      <form onSubmit={handleSubmit(ForgotPasswordHandler)}>
        <Box style={MainGrid}>
          <Typography variant="h5" style={Heading}>
            Forgot Password
          </Typography>
          <TextField
            label="Enter your email"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                background: "white",
              },
            }}
            {...register("email", { required: true, pattern: emailRegex })}
            error={Boolean(errors.email)}
            helperText={
              (errors.email && errors.email.type === "required" && (
                <span style={ErrorMsg}>Email is required</span>
              )) ||
              (errors.email && errors.email.type === "pattern" && (
                <span style={ErrorMsg}>Enter valid email address</span>
              ))
            }
          />
          <Button variant="contained" type="submit" style={ForgotPswBtn}>
            <Typography variant="subtitle2">FORGOT PASSWORD</Typography>
          </Button>
        </Box>
      </form>
    </Box>
    </Box>
  );
};

export default ForgotPassword;            
`