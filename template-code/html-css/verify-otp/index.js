module.exports = `import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OtpInput from "react18-input-otp";
import {
  Btn,
  MainBox,
  otpError,
  otpInput,
  Title,
  MiddleText,
  Errmsz,
  ParentBox,
  MainGrid,
  BtnMainDiv,
} from "./style";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { options } from "../../../auth-config";
import {API_URL} from '../../../shared/apiEndPointURL';

/*  interface for the form input fields */
type UserData = {
  email?: string;
  otp?: number;
};

/* this is verifyOTP  callback function for verifyOTP  form  */
const VerifyOTP = () => {
  /* this state is  to set the OTP inputs  */
  const [OTP, setOTP] = useState("");

  /* this state is  to set the  error msz */
  const [hasErrored, sethasErrored] = useState(false);

  /* this state is  to set the form inputs */
  const [input, setInput] = useState<UserData>();

  /* this function is for handel changes in verfiyOTP form */
  function handleChange(otp: any) {
    sethasErrored(false);
    setOTP(otp);
  }

  /* object for use navigate */
  const history = useNavigate();

  /* object for use location */
  const params = useLocation();

  const cognitoEncounter = async () => {
    try {
      let res = await fetch(
        \`\${API_URL.verifyOtp}\`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: params.state.email,
            otp: OTP,
          }),
        }
      );
      let resJson = await res.json();
      if (res.ok) {
        setInput(input);
        toast.success(resJson.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        if (resJson.token && resJson.refreshToken) {
          localStorage.setItem("auth_token", resJson.token as string);
          localStorage.setItem("refreshtoken", resJson.refreshToken as string);
        }
        history("/sign-in");
      } else {
        toast.error(resJson.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  /*async function for OTP inputs handler  */
  const otpHandler = async (e: any) => {
    e.preventDefault();
    if (OTP.length < 6) {
      console.log("OTP.length", OTP.length);
      sethasErrored(true);
      return false;
    }
    if (options.cognito) {
      cognitoEncounter();
    } else {
      try {
        let res = await fetch(
          \`\${API_URL.verifyOtp}\`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: params.state.email,
              otp: parseInt(OTP),
            }),
          }
        );
        let resJson = await res.json();
        if (res.ok) {
          setInput(input);
          toast.success(resJson.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          if (resJson.token && resJson.refreshToken) {
            localStorage.setItem("auth_token", resJson.token as string);
            localStorage.setItem(
              "refreshtoken",
              resJson.refreshToken as string
            );
          }
          history("/");
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

  /* this function is for resend api call */
  const ResendHandler = async () => {
    const resendToken = localStorage.getItem("token");
    try {
      let res = await fetch(\`\${API_URL.resendOtp}\`, {
        method: "GET",
        headers: { "Authorization":  \`Bearer \${resendToken}\` },
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
  };

  /* verifyOTP return back function*/
  return (
    <div style={ParentBox}>
      <div style={MainBox}>
      <form onSubmit={otpHandler} >
        <div style={MainGrid}>
          <h2 style={Title}>Verify Account</h2>
          <p style={MiddleText}>An OTP has been sent to your entered email</p>
          <p>Enter verification code</p>
          <div style={{justifySelf:"center"}}>
          <OtpInput
              containerStyle={"otpContainer"}
              isInputNum
              hasErrored={hasErrored} //Indicates there is an error in the inputs.
              errorStyle={otpError} // style error validation
              shouldAutoFocus
              inputStyle={otpInput} //style the input box
              numInputs={6} // number of input boxes
              separator={<span>-</span>} //seperation betn boxes
              onChange={handleChange}
              value={OTP}
            />
            {hasErrored ? <p style={Errmsz}>OTP is required</p> : ""}

          </div>
       
            <p style={MiddleText}>Didn't receive the code?</p>
            <p style={MiddleText}>
              <button style={{ color: "#707070" }} type="button" onClick={ResendHandler}>
                Resend
              </button>
            </p>
            <div style={BtnMainDiv}>
                    <button type="submit" style={Btn}>Submit</button>
                  </div>
        
        </div>
        </form>
      </div>
    </div>


  );
};

export default VerifyOTP;`