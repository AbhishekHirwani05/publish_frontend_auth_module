module.exports = `import React, { useState } from "react";
import {
  Title,
  Label,
  Input,
  Btn,
  Form,
  Flex,
  MainDiv,
  SignInText,
  ErrorMsg,
  div,
  PswIcon,
  checkbox,
  forgotPasswordText,
  rememberMeText,
  AccText,
} from "./style";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { options } from "../../../auth-config";
import {API_URL} from '../../../shared/apiEndPointURL';

/* this is interface for SignIn form inputs */
type UserData = {
  email?: string;
  password?: string;
  isChecked?: false;
};
/* this is signIn callback function for SignIn form  */
const SignIn = () => {
  /* regex for password  validation */
  let pswRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?^])[A-Za-z\\d#$@!%&*^?]{8,}$/;

  /* regex for email validation */
  let emailRegex = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/;

  /* useState for set the form input fields */
  const [input, setInput] = useState<UserData>();

  /* form state for form validation n form submission  */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  /* usestate for shown n hide password  */
  const [passwordShown, setPasswordShown] = useState(false);

  /* object for eye icon */
  const eyeIcon = <FontAwesomeIcon icon={faEye} />;

  /* toggle object for password visiblity */
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
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
        console.log(res);
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
          history("/", { state: { email: data.email || "" } });
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

  /* this is function handle the checkbox event */ 
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // localStorage.setItem('toggle-switch-2',\`\${e.target.checked}\`);
    localStorage.setItem("checkBoxStatus",\`\${event.target.checked}\` as string);
    } else {
    localStorage.removeItem("checkBoxStatus");
    }
    };

  /* signIn return back function*/
  return (
      <div style={Flex}>
        <h2 style={Title}>Sign In</h2>
        <form style={Form} onSubmit={handleSubmit(signInHandler)}>
          <div style={MainDiv}>
            <label style={Label}>Email</label>
            <input
              style={Input}
              type="email"
              defaultValue=""
              placeholder="Enter your email"
              value={input?.email}
              {...register("email", { required: true, pattern: emailRegex })}
            />
            {(errors.email && errors.email.type === "required" && (
              <span style={ErrorMsg}>Email is required</span>
            )) ||
              (errors.email && errors.email.type === "pattern" && (
                <span style={ErrorMsg}>Enter valid email address</span>
              ))}
          </div>
          <div style={MainDiv}>
            <label style={Label}>Password</label>
            <input
              style={Input}
              type={passwordShown ? "text" : "password"}
              defaultValue=""
              placeholder="Choose a password"
              value={input?.password}
              {...register("password", { required: true, pattern: pswRegex })}
            />
            <i onClick={togglePasswordVisiblity} style={PswIcon}>
              {eyeIcon}
            </i>
            {(errors.password && errors.password.type === "required" && (
              <span style={ErrorMsg}>Password is required</span>
            )) ||
              (errors.password && errors.password.type === "pattern" && (
                <span style={ErrorMsg}>
                  Password should contain at least one lowercase, uppercase,
                  number and special character
                </span>
              ))}
          </div>

          <div style={div}>
            <input
              style={checkbox}
              type="checkbox"
              name="checkbox"
              checked={input?.isChecked}
              onChange={(event) => handleCheckbox(event)}
            />
              <div style={rememberMeText}>Remember me</div>
          </div>
          <button style={Btn}>Sign In</button>
          <div>
            <div style={forgotPasswordText}>
              <Link to={"/forgot-password"}>Forgot Password?</Link>
            </div>
          </div>
          <div style={AccText}>
              Don't have an account?
              <Link to={"/sign-up"} style={SignInText}>
                {" "}
                Sign Up
              </Link>
          </div>
        </form>
      </div>
  );
};

export default SignIn;

`