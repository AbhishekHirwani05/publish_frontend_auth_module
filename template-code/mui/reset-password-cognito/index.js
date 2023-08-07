module.exports = `import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Popover,
} from "@mui/material";
import {
  ErrorMsg,
  Heading,
  MainBox,
  MainGrid,
  ParentBox,
  ResetPswBtn,
  paragraph,
} from "./style";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_URL } from "../../../shared/apiEndPointURL";

/* interface for the password and confirm password field */
type UserData = {
  password?: string;
  confirmpassword?: string;
  showPassword?: boolean;
  showConfirmPassword?: boolean;
  code?: string;
};

/* this is the starting point for the project */
const ResetPasswordCognito = () => {
  /* this is use for access the id */
  const location = useLocation();

  /* this is for routing */
  const history = useNavigate();

  /* regex for password */
  let pswRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  /* this state is for hide and show password */
  const [values, setValues] = useState<UserData>({ showPassword: false });

  /* this state is for hide and show confirm password */
  const [confirmPswValues, setConfirmPswValues] = useState<UserData>({
    showConfirmPassword: false,
  });

  /* this is for form validation */
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserData>();

  /* this function is for show and hide password */
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  /* this function is for show and hide confirm password */
  const handleClickShowConfirmPassword = () => {
    setConfirmPswValues({
      ...confirmPswValues,
      showConfirmPassword: !confirmPswValues.showConfirmPassword,
    });
  };

  /* this function is for show and hide password icon */
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  /* object anchor element of popover */
  const [anchorEl, setAnchorEl] = useState<
    HTMLInputElement | HTMLTextAreaElement | null
  >(null);

  /* object for opening popover */
  const open = Boolean(anchorEl);

  /* function for onfocus on password field  */
  const handleOnFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  /* function is to close the popover */
  const handlePopupClose = () => {
    setAnchorEl(null);
  };

  /*  this function is for reset password api call */
  const resetPasswordHandler = async (data: UserData) => {
    try {
      axios
        .put(\`\${API_URL.resetPassword}\`, {
          email: location.state.email,
          otp: data.code,
          password: data.password,
        })
        .then((response) => {
          if (response.status === 200) {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            history("/sign-in");
          }
        })
        .catch((resErr) => {
          toast.error(resErr.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box style={ParentBox}>
      <Box style={MainBox}>
        <form onSubmit={handleSubmit(resetPasswordHandler)}>
          <Box style={MainGrid}>
            <Typography variant='h5' style={Heading}>
              Reset Password
            </Typography>
            <TextField
              label='Code'
              variant='outlined'
              sx={{
                "& .MuiInputBase-root": {
                  background: "white",
                },
              }}
              {...register("code", { required: true })}
              error={Boolean(errors.code)}
              helperText={
                errors.code &&
                errors.code.type === "required" && (
                  <span style={ErrorMsg}>Code is required</span>
                )
              }
            />
            <TextField
              label='Password'
              variant='outlined'
              type={values.showPassword ? "text" : "password"}
              sx={{
                "& .MuiInputBase-root": {
                  background: "white",
                },
              }}
              {...register("password", { required: true, pattern: pswRegex })}
              error={Boolean(errors.password)}
              helperText={
                (errors.password && errors.password.type === "required" && (
                  <span style={ErrorMsg}>Password is required</span>
                )) ||
                (errors.password && errors.password.type === "pattern" && (
                  <span style={ErrorMsg}>
                    Password should contain at least one lowercase, uppercase,
                    number and special character
                  </span>
                ))
              }
              onFocus={handleOnFocus}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Popover
              id='simple-popover'
              open={open}
              onClose={handlePopupClose}
              anchorEl={anchorEl} // use to set the position
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              disableAutoFocus
              disableEnforceFocus
              disableRestoreFocus
            >
              <Typography sx={{ width: "15vw" }}>
                <p style={paragraph}>Password must include:</p>
                <ul>
                  <li>At least 8 characters</li>
                  <li>At least one number</li>
                  <li>At least one lowercase</li>
                  <li>At least one uppercase</li>
                  <li>At least one special character</li>
                  <li>No spaces allow</li>
                </ul>
              </Typography>
            </Popover>

            <TextField
              label='Confirm password'
              variant='outlined'
              type={confirmPswValues.showConfirmPassword ? "text" : "password"}
              sx={{
                "& .MuiInputBase-root": {
                  background: "white",
                },
              }}
              {...register("confirmpassword", {
                required: true,
                pattern: pswRegex,
                validate: (match) => {
                  const confirmpassword = getValues("confirmpassword");
                  const password = getValues("password");
                  return match && password !== confirmpassword ? false : true;
                },
              })}
              error={Boolean(errors.confirmpassword)}
              helperText={
                (errors.confirmpassword &&
                  errors.confirmpassword.type === "required" && (
                    <span style={ErrorMsg}>Confirm Password is required</span>
                  )) ||
                (errors.confirmpassword &&
                  errors.confirmpassword.type === "pattern" && (
                    <span style={ErrorMsg}>
                      Confirm Password should contain at least one lowercase,
                      uppercase, number and special character
                    </span>
                  )) ||
                (errors.confirmpassword && (
                  <span style={ErrorMsg}>
                    Confirm Password and password should be same
                  </span>
                ))
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {confirmPswValues.showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant='contained' type='submit' style={ResetPswBtn}>
              <Typography variant='subtitle2'>Reset Password</Typography>
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ResetPasswordCognito;`
