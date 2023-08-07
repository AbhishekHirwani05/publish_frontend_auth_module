module.exports = `/* this is a functional component */
import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {useAtom} from 'jotai';
import {useLocation, useNavigate} from 'react-router-dom';
import {API_URL} from 'shared/apiEndPointURL';
import {options} from 'auth-config';
import {VerifyUserData} from 'interfaces/authVerify.interface';
import {Box, Button, Grid, Typography} from '@mui/material';
import OtpInput from 'react18-input-otp';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import {style} from './Verify.css';
import WelcomeBackWeb from '../../../auth-assets/images/welcomeBackWeb.png';
import WelcomeBackTab from '../../../auth-assets/images/welcomeBackTab.png';
import WelcomeBackMobile from '../../../auth-assets/images/welcomeBackMobile.png';
import FormButton from '../Controls/PrimaryButton.component';
import LockIcon from '../../../auth-assets/images/lockIcon.png';
import {redirectFrom} from '../Atom/store';

/**
@author      : Shivali Uumbarkar
@date        : 17/04/2023
@description : Verify Component
@params      : Return Params
@return      : Return Output
*/

/* define the function type and the return type here */
const Verify: React.FC<VerifyUserData> = () => {
  /* this state is for set otp */
  const [OTP, setOTP] = useState<string>('');

  /* this state is for show error */
  const [hasErrored, sethasErrored] = useState<boolean>(false);

  /* this state is for set the fields input value */
  const [input, setInput] = useState<VerifyUserData>();

  /* this state is for set the login options */
  const [redirectFromVal, setRedirectFrom] = useAtom(redirectFrom);

  /* this function is for fetch the input otp value */
  const handleChange = (otp: string) => {
    sethasErrored(false);
    setOTP(otp);
  };

  /* this is for routing */
  const history = useNavigate();

  /* this is for fetch the email id from another component */
  const params = useLocation();

  /* async function for OTP inputs handler  */
  const otpHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    const email = params.state?.email || '';
    event.preventDefault();
    if (OTP.length < 6) {
      sethasErrored(true);
    }
    await axios
      .post(
        \`\${API_URL.verifyOtp}\`,
        {email, otp: parseInt(OTP, 10)},
        {
          headers: {'Content-Type': 'application/json'},
        },
      )
      .then((response) => {
        if (response.statusText === 'OK') {
          setInput(input);
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          if (response.data.token && response.data.refreshToken) {
            localStorage.setItem('auth_token', response.data.token as string);
            localStorage.setItem('refreshtoken', response.data.refreshToken as string);
          }
          if (options.strategy === 'AWS Cognito') {
            history('/sign-in');
          } else {
            history('/');
            setRedirectFrom('jwtlogin');
          }
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  /* this function is for resend api call */
  const ResendHandler = async () => {
    const resendToken = localStorage.getItem('token');
    await axios
      .get(API_URL.resendOtp, {
        headers: {Authorization: \`Bearer \${resendToken}\`},
      })
      .then((response) => {
        if (response.statusText === 'OK') {
          setInput(input);
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  return (
    <Grid data-testid="verifyform" container component="main" sx={style.mainGrid}>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
        <Box
          component="img"
          src={WelcomeBackWeb}
          alt="WelcomeWeb"
          style={style.welcomeBackImg}
          sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}
        />
        <Box
          component="img"
          src={WelcomeBackTab}
          alt="WelcomeTab"
          sx={{display: {xs: 'none', sm: 'block', md: 'none'}}}
          style={style.welcomeBackMobileImg}
        />
        <Box
          component="img"
          src={WelcomeBackMobile}
          alt="WelcomeMobile"
          sx={{display: {xs: 'block', sm: 'none', md: 'none'}, height: '890px'}}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7} xl={7} sx={style.formGrid}>
        <Box sx={style.formBox}>
          <Box component="img" src={LockIcon} alt="LockIcon" style={style.lockIcon} />
          <Typography variant="h6" sx={style.heading}>
            Verify Account
          </Typography>
          <Box component="form" onSubmit={otpHandler}>
            <Typography sx={style.subTitle}>An OTP has been sent to your entered email.</Typography>
            <Typography sx={style.subTitle}>Enter verification code</Typography>
            <OtpInput
              data-testid="otpInputBox"
              containerStyle={style.otpBox}
              isInputNum
              hasErrored={hasErrored}
              errorStyle={style.OtpError}
              shouldAutoFocus
              inputStyle={style.OtpInputNumber}
              numInputs={6}
              separator={<span>-</span>}
              onChange={handleChange}
              value={OTP}
            />
            {hasErrored ? (
              <Typography data-testid="ErrorMsz" sx={style.error}>
                {' '}
                <ErrorIcon data-testid="ErrorIcon" /> &nbsp; OTP is required
              </Typography>
            ) : null}
            <Typography sx={style.subTitle}>Didn't receive the code</Typography>
            <Button sx={style.linkResend} onClick={ResendHandler}>
              Resend
            </Button>
            <FormButton disabled={false} style={{marginBottom: '57px'}} type="submit" variant="contained">
              Submit
            </FormButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Verify;
`;
