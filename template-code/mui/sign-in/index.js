module.exports = `import React, { useEffect,useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
Checkbox,
FormControlLabel,
Icon
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
  ParentBox,
  ForgotPasswordText,
  RememberMeCheckBox,
  DividerMainBox,
  Divider,
  OrText,
  MSButton,
  MSICon,
  MSText
} from "./style";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { options } from "../../../auth-config";
import {API_URL} from '../../../shared/apiEndPointURL';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../AzureAD/azureConfig";
import MicrosoftIcon from "../../../auth-assets/images/msicon.svg";
import { EventType, InteractionType } from "@azure/msal-browser";
import { useAtom } from "jotai";
import { redirectFrom } from "../Atom/store";

/* interface for the email and password field */
type UserData = {
  email?: string | undefined;
  password?: string;
  showPassword?: boolean;
  isChecked?: boolean;

};

/* this is the starting point for the project */
const SignIn = () => {

  /* regex for password */ 
  let pswRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;


  /* regex for email address */ 
  let emailRegex = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/;

  /* this state is for hide and show password */
  const [values, setValues] = useState<UserData>({ showPassword: false });

  /* this is for form validation */
  const { register, handleSubmit, formState: { errors }} = useForm<UserData>();

  /* this state is for set the fields input value */
  const [input, setInput] = useState<UserData>();

  /* this state is for set the login options */
  const [redirectFromVal, setRedirectFrom] = useAtom(redirectFrom);

  /* this function is for show and hide password */
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  /* this function is for show and hide password icon */
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };


/* this is function handle the checkbox event */ 
const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
if (event.target.checked) {
  // localStorage.setItem('toggle-switch-2',\`\${e.target.checked}\`);
localStorage.setItem("checkBoxStatus",\`\${event.target.checked}\` as string);
} else {
localStorage.removeItem("checkBoxStatus");
}
};

const twoFactorEncounter = async (data: UserData) => {
  try {
    let res = await fetch(
      \`\${API_URL.login}\`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );
    let resJson = await res.json();
    const tempToken = resJson.token;
    localStorage.setItem("token", tempToken);
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
};

const cognitoEncounter = async (data: UserData) => {
  try {
    let res = await fetch(
      \`\${API_URL.login}\`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      }
    );
    let resJson = await res.json();
    console.log(resJson)
    if (res.ok) {
      setInput(input);
      toast.success("login Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(res);
      if (resJson.accessToken && resJson.refreshToken) {
        localStorage.setItem("auth_token", resJson.accessToken as string);
        localStorage.setItem("refreshtoken", resJson.refreshToken as string);
      history("/");
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

/* this is for routing */
const history = useNavigate();

/*  this function is for sign in api call */
const signInHandler = async (data: UserData) => {
  if (options["2FA"] && options.cognito === false ) {
    twoFactorEncounter(data);
  } else if (options.cognito) {
    cognitoEncounter(data);
  } else {
    try {
      let res = await fetch(
        \`\${API_URL.login}\`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      );
      let resJson = await res.json();
      if (res.ok) {
        setInput(input);
        toast.success(resJson.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(res);
        if (resJson.token && resJson.refreshToken) {
          localStorage.setItem("auth_token", resJson.token as string);
          localStorage.setItem(
            "refreshtoken",
            resJson.refreshToken as string
          );
        }
        history("/", { state: { email: data.email || "" } });
        setRedirectFrom("jwtlogin");   
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

 /* this is for sign in using Azure AD using pop-ups */

  const { instance } = useMsal();

  const handleLoginUsingPopUP = async (loginType: any) => {
    if (loginType === "popup") {
      const res = await instance.loginPopup(loginRequest);
      localStorage.setItem("auth_token", res.accessToken);
      setRedirectFrom("microsoft");
      history("/");
    }
  };

  /* this is for microsoft icon */

  const svgIcon = (
    <Icon>
      <img alt="microsoftIcon" src={MicrosoftIcon} style={MSICon} />
    </Icon>
  );

  useEffect(() => {
    const callbackId = instance.addEventCallback((message: any) => {
      switch (message.eventType) {
        case EventType.LOGIN_SUCCESS:
        case EventType.ACQUIRE_TOKEN_SUCCESS:
          if (message.interactionType === InteractionType.Redirect) {
            handleRedirectResponse(message.payload);
          }
      }
    });
    return () => {
      instance.removeEventCallback(callbackId!);
    };
  }, []);
  const handleRedirectResponse = async (response: any) => {
    localStorage.setItem("auth_token", response.accessToken);
    setRedirectFrom("microsoft");
    history("/");
  };

  const handleLoginUsingRedirect = async (loginType: any) => {
    if (loginType === "redirect") {
       await instance.loginRedirect(loginRequest);
    }
  };

  return (
    <Box style={ParentBox}>
    <Box style={MainBox}>
      <form onSubmit={handleSubmit(signInHandler)}>
        <Box style={MainGrid}>
          <Typography variant="h5" style={Heading}>
            Sign In
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
          <FormControlLabel
          label="Remember Me"
          style={RememberMeCheckBox}
          control={
            <Checkbox
              checked={input?.isChecked}
              onChange={(event) => handleCheckbox(event)}
            />
          } 
        />
          <Button variant="contained" type="submit" style={SignUpBtn}>
            <Typography variant="subtitle2">SIGN IN</Typography>
          </Button>
          <Typography variant="subtitle1" style={AccText}>
            <Link to={"/forgot-password"} style={ForgotPasswordText}>
              {" "}
              Forgot Password?
            </Link>
          </Typography>
          <Box style={LastTextBox}>
            <Typography variant="subtitle1" style={AccText}>
              Don't have an account?
              <Link to={"/sign-up"} style={LinkText}>
                {" "}
                Sign Up
              </Link>
            </Typography>
          </Box>
          <Box style={DividerMainBox}>
              <Box style={Divider} />
                <Box>
                  <Typography variant="subtitle1" style={OrText}>OR</Typography>
                </Box>
              <Box style={Divider} />
            </Box>
            <Button
              variant="outlined"
              style={MSButton}
              onClick={() => handleLoginUsingPopUP("popup")}
              startIcon={svgIcon}
            >
              <Typography variant="subtitle2" style={MSText}>
                Sign in with Microsoft using pop up
              </Typography>
            </Button>
            <Button
              variant="outlined"
              style={MSButton}
              onClick={() => handleLoginUsingRedirect("redirect")}
              startIcon={svgIcon}
            >
              <Typography style={MSText} variant="subtitle2">
                Sign in with Microsoft using redirect
              </Typography>
            </Button>
        </Box>
      </form>
    </Box>
    </Box>
  );
};
export default SignIn;            
`;
