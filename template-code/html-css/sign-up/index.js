module.exports = `import React, { useState, useRef } from "react";
import {
  Title,
  Label,
  Input,
  Btn,
  Form,
  Flex,
  MainDiv,
  AccText,
  SignInText,
  ErrorMsg,
  PswIcon,
  BtnMainDiv,
  ReErrorMsg,
  Paragraph,
  ulist
} from "./style";
import { Link ,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { usePopperTooltip } from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";
import { options } from "../../../auth-config";
import {API_URL} from '../../../shared/apiEndPointURL';

/* interface for SignUp form input */
type UserData = {
  name?: string;
  email?: string;
  password?: string;
  confirmpassword?: string;
};

/* this is signUp callback function for SignUP form  */
const SignUp = () => {
  /* regex for password  validation */
  let pswRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?^])[A-Za-z\\d#$@!%&*^?]{8,}$/;

  /* regex for email validation */
  let emailRegex = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/;

    /* regex for name address */
    let nameRegex = /^[a-zA-Z.+'-]+(?:\\s[a-zA-Z.+'-]+)*\\s?$/;

  /* useState for set the form input fields */
  const [input, setInput] = useState<UserData>();

  /* form state for form validation n form submission  */
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  /* usestate for shown n hide password  */
  const [passwordShown, setPasswordShown] = useState(false);

  /* usestate for shown n hide Confirm password  */
  const [conPasswordShown, setConPasswordShown] = useState(false);

  /* this is for recaptcha reference */
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  /* these states is for recaptcha */
  const [recaptchaToken, setRecaptchaToken] = useState<string>();
  const [verify, setVerify] = useState<boolean | string>(true);

  /* object for eye icon */
  const eyeIcon = <FontAwesomeIcon icon={faEye} />;

  /* toggle object for password visiblity */
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  /* toggle object for Confirm password visiblity */
  const toggleConPasswordVisiblity = () => {
    setConPasswordShown(conPasswordShown ? false : true);
  };

  /* this onchange is for recaptcha */
  const onChange = (value: any) => {
    if(options.captcha){
      setRecaptchaToken(value);
      setVerify(true);
    }
  };

  /* this function is for handle the recaptcha */
  const recaptchaHandler = () => {
    if(options.captcha){
      if (recaptchaToken === null || recaptchaToken === undefined) {
        setVerify(false);
      } else {
        setVerify(true);
      }
    }
  };

  /* password tooltip handling objects */ 
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    trigger: "click",
    closeOnOutsideClick: true,
    placement: "bottom",
  });

  /* function to handle onfocus on password   */ 
  const onfocus= (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTriggerRef(event.currentTarget);
  };

  /* this is for routing */
  const history = useNavigate();

  const recaptchaEncounter = async (data: UserData) => {
    try {
      if (recaptchaToken === null || recaptchaToken === undefined) {
        setVerify(false);
        return;
      } else {
        setVerify(true);
        let res = await fetch(
          \`\${API_URL.signUp}\`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              password: data.password,
              recaptchaToken: recaptchaToken,
              captcha: true,
            }),
          }
        );
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
    } catch (err) {
      console.log(err);
    }
  };

  const cognitoEncounter = async (data: UserData) => {
    try {
      let res = await fetch(
        \`\${API_URL.signUp}\`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
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

  /*  this function is for sign up api call */
  const signUpHandler = async (data: UserData, e: any) => {
    e.target.reset();
    if (options.captcha) {
      recaptchaEncounter(data);
    } else if (options.cognito) {
      cognitoEncounter(data);
    } else {
      try {
        let res = await fetch(
          \`\${API_URL.signUp}\`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.name,
              email: data.email,
              password: data.password,
              captcha: false,
            }),
          }
        );
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

  /* signUp return back function*/
  return (
    <div style={Flex}>
      <h2 style={Title}>Sign Up</h2>
      <form
        style={Form}
        onSubmit={handleSubmit(signUpHandler, recaptchaHandler)}
      >
        <div style={MainDiv}>
          <label style={Label}>Full Name</label>
          <input
            style={Input}
            id="name"
            type="text"
            defaultValue=""
            placeholder="Enter your full name"
            value={input?.name}
            {...register("name", {
              required: true,
              minLength: 2,
              pattern: nameRegex,
            })}
          />
          {(errors.name && errors.name.type === "required" && (
            <span style={ErrorMsg}>Full name is required</span>
          )) ||
            (errors.name && errors.name.type === "minLength" && (
              <span style={ErrorMsg}>Name should be more than 1 character</span>
            )) ||
            (errors.name && errors.name.type === "pattern" && (
              <span style={ErrorMsg}>
                Name must be contain only uppercase and lowercase letter. Space
                is not allowed at the starting of the name.
              </span>
            ))}
        </div>
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
            onFocus={onfocus}
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

        {visible && !(errors.password?.type === "pattern") ? (
          <div
            ref={setTooltipRef}
            {...getTooltipProps({ className: "tooltip-container" })}
          >
            <p style={Paragraph}>Password must include:</p>
            <ul style={ulist}>
              <li>At least 8 characters</li>
              <li>At least one number</li>
              <li>At least one lowercase</li>
              <li>At least one uppercase</li>
              <li>At least one special character</li>
              <li>No spaces allow</li>
            </ul>
            <div {...getArrowProps({ className: "tooltip-arrow" })} />
          </div>
        ) : null}
        
        <div style={MainDiv}>
          <label style={Label}>Confirm Password</label>
          <input
            style={Input}
            type={conPasswordShown ? "text" : "password"}
            defaultValue=""
            placeholder="Choose confirm a password"
            value={input?.confirmpassword}
            {...register("confirmpassword", {
              required: true,
              pattern: pswRegex,
              validate: (match) => {
                const confirmpassword = getValues("confirmpassword");
                const password = getValues("password");
                return match && password !== confirmpassword ? false : true;
              },
            })}
          />
          <i onClick={toggleConPasswordVisiblity} style={PswIcon}>
            {eyeIcon}
          </i>
          {(errors.confirmpassword &&
            errors.confirmpassword.type === "required" && (
              <span style={ErrorMsg}>Confirm Password is required</span>
            )) ||
            (errors.confirmpassword &&
              errors.confirmpassword.type === "pattern" && (
                <span style={ErrorMsg}>
                  Confirm Password should contain at least one
                  lowercase,uppercase, number and special character
                </span>
              )) ||
            (errors.confirmpassword && (
              <span style={ErrorMsg}>
                Confirm Password and password should be same
              </span>
            ))}
        </div>
        {options.captcha ? (
          <div style={{ margin: "auto", paddingTop: "20px" }}>
            <ReCAPTCHA
              sitekey={API_URL.recaptchaSiteKey || ""}
              ref={recaptchaRef}
              onChange={onChange}
            />
            {!verify ? (
              <span style={ReErrorMsg}>Captcha is required</span>
            ) : null}
          </div>
        ) : null}
        <div style={BtnMainDiv}>
          <button style={Btn}>Sign Up</button>
        </div>
        <div style={AccText}>
          Don't have an account?
          <Link to={"/sign-in"} style={SignInText}>
            {" "}
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;                                                          
`;
