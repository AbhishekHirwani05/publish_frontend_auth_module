module.exports = `import React, { useState, useEffect } from "react";
import {
  Title,
  Label,
  Input,
  Btn,
  Form,
  Flex,
  MainDiv,
  MainBox,
  ErrorMsg,
  PswIcon,
  Paragraph,
  ulist,
  mainDiv,
} from "./style";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import { usePopperTooltip } from "react-popper-tooltip";
import axios from "axios";
import { API_URL } from "../../../shared/apiEndPointURL";

/* interface for the form input fields */
type UserData = {
  password?: string;
  confirmpassword?: string;
  code?: string;
};

/* this is reset password  callback function for reset password form  */
const ResetPasswordCognito = () => {
  /* this is use for access the id */
  const location = useLocation();
  const params = useParams();

  /* regex for password */
  let pswRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?^])[A-Za-z\d#$@!%&*^?]{8,}$/;

  /* this state is for set the fields input value */
  const [input, setInput] = useState<UserData>();

  /* this is for form validation */
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  /* this state is for hide and show password */
  const [passwordShown, setPasswordShown] = useState(false);

  /* this state is for hide and show confirm password */
  const [conPasswordShown, setConPasswordShown] = useState(false);

  /* eye icon for hide and show password and confirm password */
  const eyeIcon = <FontAwesomeIcon icon={faEye} />;

  /* this function is for toggle the password */
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  /* this function is for toggle the confirm password */
  const toggleConPasswordVisiblity = () => {
    setConPasswordShown(conPasswordShown ? false : true);
  };

  /* this is for routing */
  const history = useNavigate();

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
    placement: "bottom-start",
  });

  /* function to handle onfocus on password   */
  const onfocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTriggerRef(event.currentTarget);
  };
  /*  this function is for reset password api call */
  const resetPasswordHandler = async (data: UserData) => {
    try {
      let res = await fetch(\`\${ API_URL.resetPassword }\`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: location.state.email,
          otp: data.code,
          password: data.password,
        }),
      });
      let resJson = await res.json();
      if (res.ok) {
        setInput(input);
        toast.success(resJson.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        history("/sign-in", { state: { password: data.password || "" } });
      } else {
        toast.error(resJson.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* reset Password  return back function*/
  return (
    <div style={MainBox}>
      <ToastContainer />
      <div style={Flex}>
        <h2 style={Title}>Reset Password</h2>
              <form style={Form} onSubmit={handleSubmit(resetPasswordHandler)}>
              <div style={MainDiv}>
            <label style={Label}>Code</label>
            <input
              style={Input}
              type={"text"}
              defaultValue=""
              placeholder="Enter the code"
              value={input?.password}
              {...register("code", { required: true })}
              onFocus={onfocus}
            />
            {(errors.code && errors.code.type === "required" && (
              <span style={ErrorMsg}>Code is required</span>
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
          <div style={MainDiv}>
            <button style={Btn}>Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResetPasswordCognito;
`;