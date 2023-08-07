module.exports = `import React, { useState, useRef } from "react";
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
  AccText,
  ErrorMsg,
  Heading,
  LinkText,
  MainBox,
  MainGrid,
  SignUpBtn,
  LastTextBox,
  RecaptchaBox,
  RecaptchaErrorMsg,
  ParentBox,
  paragraph,
} from "./style";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { options } from "../../../auth-config";
import {API_URL} from '../../../shared/apiEndPointURL';

/* interface for the form field */
type UserData = {
  name?: string;
  email?: string | undefined;
  password?: string;
  confirmpassword?: string;
  showPassword?: boolean;
  showConfirmPassword?: boolean;
};

/* this is the starting point for the project */
const SignUp = () => {
  /* regex for password */
  let pswRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;


  /* regex for email address */
  let emailRegex = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/;

  /* regex for name */
  let nameRegex = /^[a-zA-Z.+'-]+(?:\\s[a-zA-Z.+'-]+)*\\s?$/;

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

  /* this state is for set the fields input value */
  const [input, setInput] = useState<UserData>();

  /* these states is for recaptcha */
  const [recaptchaToken, setRecaptchaToken] = useState<string>();
  const [verify, setVerify] = useState<boolean | string>(true);

  /* this is for recaptcha reference */
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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

  /* this is for routing */
  const history = useNavigate();

const recaptchaEncounter=async(data: UserData)=>{
  try {
    if (recaptchaToken === null || recaptchaToken === undefined) {
      setVerify(false);
      return;
    } else {
      setVerify(true);
      let res = await fetch(\`\${API_URL.signUp}\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          recaptchaToken: recaptchaToken,
          captcha: true
        }),
      });
      let resJson = await res.json();
      if (res.ok) {
        setInput(input);
        toast.success(resJson.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(resJson.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  } 
  catch (err) {
    console.log(err);
  }
}

const cognitoEncounter=async(data:UserData)=>{
  try {
    let res = await fetch(\`\${API_URL.signUp}\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });
    let resJson = await res.json();
    if (res.ok) {
      setInput(input);
      toast.success(resJson.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      history("/verify", { state: { email: data.email || "" } });
    } else {
      toast.error(resJson.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

/*  this function is for sign up api call */
const signUpHandler = async (data: UserData, e: any) => {
  e.target.reset();
  if(options.captcha) {
    recaptchaEncounter(data)
  }else if(options.cognito){
    cognitoEncounter(data)
  } 
  else{
    try {
  let res = await fetch(\`\${API_URL.signUp}\`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: data.name,
    email: data.email,
    password: data.password,
    captcha: false
  }),
});
let resJson = await res.json();
if (res.ok) {
  setInput(input);
  toast.success(resJson.message, {
    position: toast.POSITION.TOP_RIGHT,
  });
} else {
  toast.error(resJson.message, {
    position: toast.POSITION.TOP_RIGHT,
  });
}
    } catch (err) {
  console.log(err);
}
  }
};


/* this onchange is for recaptcha */
const onChange = (value: any) => {
  if (options.captcha) {
    setRecaptchaToken(value);
    setVerify(true);
  }
};

/* this function is for handle the recaptcha */
const recaptchaHandler = () => {
  if (options.captcha) {
    if (recaptchaToken === null || recaptchaToken === undefined) {
      setVerify(false);
    } else {
      setVerify(true);
    }
  };
}

return (
  <Box style={ParentBox}>
    <Box style={MainBox}>
      <form onSubmit={handleSubmit(signUpHandler, recaptchaHandler)}>
        <Box style={MainGrid}>
          <Typography variant="h5" style={Heading}>
            Sign Up
          </Typography>
          <TextField
            label="Full name"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": {
                background: "white",
              },
            }}
            {...register("name", { required: "true", minLength: 2, pattern: nameRegex })}
            error={Boolean(errors.name)}
            helperText={
              (errors.name && errors.name.type === "required" && (
                <span style={ErrorMsg}>Full name is required</span>
              )) ||
              (errors.name && errors.name.type === "minLength" && (
                <span style={ErrorMsg}>
                  Name should be more than 1 character
                </span>
              )) ||
              (errors.name && errors.name.type === "pattern" && (
                <span style={ErrorMsg}>
                  Name must be contain only uppercase and lowercase letter. Space is not allowed at the starting of the name.
                </span>
              ))
            }
          />
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
          <TextField
            label="Password"
            variant="outlined"
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
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {!(errors.password?.type === "pattern") ? (
            <Popover
              id="simple-popover"
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
          ) : null}

          <TextField
            label="Confirm password"
            variant="outlined"
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
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
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
          {options.captcha ? (
            <Box style={RecaptchaBox}>
              <ReCAPTCHA
                sitekey={API_URL.recaptchaSiteKey || ""}
                ref={recaptchaRef}
                onChange={onChange}
              />
              {!verify ? (
                <span style={RecaptchaErrorMsg}>Captcha is required</span>
              ) : null}
            </Box>
          ) : null}
          <Button variant="contained" type="submit" style={SignUpBtn}>
            <Typography variant="subtitle2">SIGN UP</Typography>
          </Button>
          <Box style={LastTextBox}>
            <Typography variant="subtitle1" style={AccText}>
              Already have an account?
              <Link to={"/sign-in"} style={LinkText}>
                {" "}
                Sign In
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  </Box>
);
};
export default SignUp;
`;
