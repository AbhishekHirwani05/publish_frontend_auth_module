module.exports = `import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import OtpInput from "react18-input-otp";
import {
  Btn,
  Div,
  Heading,
  MainBox,
  OtpError,
  OtpInputNumber,
  MainGrid,
  ParentBox,
  CodeText,
  ResendText,
  Errmsz,
} from "./style";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { options } from "../../../auth-config";
import {API_URL} from '../../../shared/apiEndPointURL';
import { useAtom } from "jotai";
import { redirectFrom } from "../Atom/store";

/* interface for the email and otp field */
type UserData = {
  email?: string;
  otp?: number;
};

/* this is the starting point for the project */
const VerifyOTP = () => {
  /* this state is for set otp */
  const [OTP, setOTP] = useState<string>("");

  /* this state is for show error */
  const [hasErrored, sethasErrored] = useState<boolean>(false);

  /* this state is for set the fields input value */
  const [input, setInput] = useState<UserData>();

  /* this state is for set the login options */
  const [redirectFromVal, setRedirectFrom] = useAtom(redirectFrom);


  /* this function is for fetch the input otp value */
  const handleChange = (otp: any) => {
    sethasErrored(false);
    setOTP(otp);
  };

  /* this is for routing */
  const history = useNavigate();

  /* this is for fetch the email id from another component */
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
    console.log(params);
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

  return (
    <Box style={ParentBox}>
      <Box style={MainBox}>
        <form onSubmit={otpHandler}>
          <Box style={MainGrid}>
            <Typography variant="h5" style={Heading}>
              Verify Account
            </Typography>
            <Typography>An OTP has been sent to your entered email</Typography>
            <Typography>Enter verification code</Typography>

            <Box style={Div}>
              <OtpInput
                containerStyle={"otpContainer"}
                isInputNum
                hasErrored={hasErrored} //Indicates there is an error in the inputs.
                errorStyle={OtpError} // style error validation
                shouldAutoFocus
                inputStyle={OtpInputNumber} //style the input box
                numInputs={6} // number of input boxes
                separator={<span>-</span>} //seperation betn boxes
                onChange={handleChange}
                value={OTP}
              />
              {hasErrored ? (
                <Typography sx={Errmsz}>OTP is required</Typography>
              ) : null}
              <Typography sx={CodeText}>Didn't receive the code?</Typography>
              <Typography>
                <Button style={ResendText} onClick={ResendHandler}>
                  Resend
                </Button>
              </Typography>
              <Button style={Btn} type="submit">
                SUBMIT
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default VerifyOTP;
`