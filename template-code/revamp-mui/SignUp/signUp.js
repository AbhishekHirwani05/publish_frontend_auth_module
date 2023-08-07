module.exports = `/* this is a functional component */
import {Box, Typography, InputAdornment, IconButton, Popover, Icon, Grid, Link} from '@mui/material';
import React, {useRef, useState} from 'react';
import {options} from 'auth-config';
import {useForm} from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {API_URL} from 'shared/apiEndPointURL';
import axios from 'axios';
import {ISignUpUserData} from 'interfaces/authSignUp.interface';
import {useAtom} from 'jotai';
import {useMsal} from '@azure/msal-react';
import InputTextField from '../Controls/Input.component';
import WelcomeWeb from '../../../auth-assets/images/welcomeWeb.png';
import WelcomeTab from '../../../auth-assets/images/welcomeTab.png';
import WelcomeMobile from '../../../auth-assets/images/welcomeMobile.png';
import MicrosoftIcon from '../../../auth-assets/images/msIcon.png';
import GoogleIcon from '../../../auth-assets/images/google.png';
import ErrorIcon from '../../../auth-assets/images/errorIcon.png';
import Google from '../../../auth-assets/images/google.png';
import SuccessIcon from '../../../auth-assets/images/successIcon.png';
import {style} from './SignUp.css';
import FormButton from '../Controls/PrimaryButton.component';
import SocialServiceBtn from '../Controls/SocialServiceBtn.component';
import LockIcon from '../../../auth-assets/images/lockIcon.png';
import {redirectFrom} from '../Atom/store';
import {loginRequest} from '../AzureAD/azureConfig';
import Auth0Icon from '../../../auth-assets/images/auth0-icon.png';

/**
 *  @author : MB
 * @date : 23/03/2023
 * @description : Signup Component
 * @params : Return Params
 * @return : Return Output / / define the function type and the return type here */

const SignUp: React.FC<Record<string, unknown>> = () => {
  /* regex for password */
  const pswRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  /* regex for email address */
  const emailRegex = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/;

  /* regex for name */
  const nameRegex = /^(?!\\s)[a-zA-Z\\s.'-]+$/;

  /* this state is for set the login options */
  const [redirectFromVal, setRedirectFrom] = useAtom(redirectFrom);

  /* this is for form validation */
  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors},
    reset,
  } = useForm<ISignUpUserData>();

  /* this is for routing */
  const history = useNavigate();

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  /* these states is for recaptcha */
  const [recaptchaToken, setRecaptchaToken] = useState<string>();
  const [verify, setVerify] = useState<boolean | string>(true);

  /* this state is for set the fields input value */
  const [input, setInput] = useState<ISignUpUserData>();

  /* this state is for hide and show password */
  const [values, setValues] = useState<ISignUpUserData>({showPassword: false});

  /* this state is for hide and show confirm password */
  const [confirmPswValues, setConfirmPswValues] = useState<ISignUpUserData>({
    showConfirmPassword: false,
  });

  /* object anchor element of popover */
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const [openDialog, setOpenDialog] = useState<boolean>(true);

  /* object for opening popover */
  const open = Boolean(anchorEl);

  /* function for onfocus on password field  */
  const handleOnFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /* function is to close the popover */
  const handlePopupClose = () => {
    setAnchorEl(null);
  };

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
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const googleLogIn = () => {
    const tokenEndpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    const clientId: string | undefined = process.env.GOOGLE_CLIENT_ID!;
    const scope = 'https://www.googleapis.com/auth/drive.metadata.readonly';
    const accessType = 'offline';
    const includeGrantedScopes = 'true';
    const responseType = 'code';
    const state = 'state_parameter_passthrough_value';
    const redirectUri: string | undefined = process.env.GOOGLE_REDIRECT_URL!;
    const paramData = new URLSearchParams({
      scope,
      access_type: accessType,
      include_granted_scopes: includeGrantedScopes,
      response_type: responseType,
      state,
      redirect_uri: redirectUri,
      client_id: clientId,
    });
    const newUrl = \`\${tokenEndpoint}?\${paramData.toString()}\`;
    window.location.href = newUrl;
    localStorage.setItem('auth_token', 'demo_auth_token');
    setRedirectFrom('google');
  };

  const newSignUpHandler = async (data: ISignUpUserData) => {
    axios
      .post(
        \`\${API_URL.signUp}\`,
        {name: data.name, email: data.email, password: data.password, recaptchaToken: ' '},
        {headers: {'Content-Type': 'application/json'}},
      )
      .then((res) => {
        if (res.status === 201) {
          setInput(input);
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setOpenDialog(false);
          if (options.captcha) {
            if (recaptchaToken === null || recaptchaToken === undefined) {
              setVerify(false);
              setOpenDialog(true);
            } else {
              setVerify(true);
              setOpenDialog(false);
            }
          } else if (options.strategy === 'AWS Cognito') {
            history('/verify', {state: {email: data.email || ''}});
          } else if (options.strategy === 'JWT Strategy') {
            setOpenDialog(false);
            setRedirectFrom('jwtlogin');
          } else if (options.strategy === 'Auth0') {
            setOpenDialog(false);
            toast.success('Please Verify Your Email', {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      })
      .catch((err) => {
        if (options.strategy === 'Auth0') {
          const errMsz = JSON.parse(err.response.data.message);
          toast.error(errMsz.description, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    reset();
  };

  /* this onchange is for recaptcha */
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (options.captcha) {
      setRecaptchaToken(e);
      setVerify(true);
    }
  };

  const signInHandler = () => {
    history('/sign-in');
  };

  /* this is for sign in using Azure AD using pop-ups */

  const {instance} = useMsal();

  const handleLoginUsingPopUP = async (loginType: string) => {
    if (loginType === 'popup') {
      const res = await instance.loginPopup(loginRequest);
      localStorage.setItem('auth_token', res.accessToken);
      setRedirectFrom('microsoft');
      history('/');
    }
  };

  const microsoftIcon = (
    <Icon>
      <Box component="img" src={MicrosoftIcon} alt="microsoftIcon" sx={style.socialServiceBtn} />
    </Icon>
  );

  const googleIcon = (
    <Icon>
      <Box component="img" src={Google} alt="google" sx={style.socialServiceBtn} />
    </Icon>
  );
  const logo = options.strategy === 'Auth0'? Auth0Icon : options.strategy === 'Google' ? GoogleIcon :LockIcon
  const googleButtonVisible = options.strategy === 'Google' ? true : false;
  const disabledState = options.strategy === 'Google' ? true : false;

  return (
    <Grid container component="main" sx={style.mainGrid}>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
        <Box
          component="img"
          src={WelcomeWeb}
          alt="WelcomeWeb"
          style={style.welcomeImg}
          sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}
        />
        <Box
          component="img"
          src={WelcomeTab}
          alt="WelcomeTab"
          sx={{display: {xs: 'none', sm: 'block', md: 'none'}}}
          style={style.welcomeMobileImg}
        />
        <Box
          component="img"
          src={WelcomeMobile}
          alt="WelcomeMobile"
          sx={{
            display: {xs: 'block', sm: 'none', md: 'none'},
            height: '890px',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7} xl={7} sx={style.formGrid}>
        {openDialog ? (
          <Box sx={style.formBox}>
            <Box component="img" src={logo} alt="LockIcon" style={style.lockIcon} />
            <Typography variant="h6" sx={style.signUpText}>
              Sign Up
            </Typography>
            <Box data-testid="signUpform" component="form" onSubmit={handleSubmit(newSignUpHandler)}>
              <InputTextField
                sx={{mb: '16px'}}
                label="Name *"
                type="text"
                disabled={disabledState}
                autoComplete="off"
                variant="outlined"
                InputProps={undefined}
                onFocus={undefined}
                register={{
                  ...register('name', {
                    required: 'true',
                    minLength: 2,
                    pattern: nameRegex,
                  }),
                }}
                error={Boolean(errors.name)}
                helperText={
                  (errors.name && errors.name.type === 'required' && (
                    <Box sx={style.errBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.errorMsg}>
                        Full name is required
                      </Typography>
                    </Box>
                  )) ||
                  (errors.name && errors.name.type === 'minLength' && (
                    <Box sx={style.errBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.errorMsg}>
                        Name should be more than 1 character
                      </Typography>
                    </Box>
                  )) ||
                  (errors.name && errors.name.type === 'pattern' && (
                    <Box sx={style.errBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.errorMsg}>
                        Name must be contain only uppercase and lowercase letter. Space is not allowed at the starting
                        of the name.
                      </Typography>
                    </Box>
                  ))
                }
              />
              <InputTextField
                sx={{mb: '16px'}}
                label="email *"
                type="email"
                autoComplete="off"
                variant="outlined"
                InputProps={undefined}
                onFocus={undefined}
                disabled={disabledState}
                register={{
                  ...register('email', {required: true, pattern: emailRegex}),
                }}
                error={Boolean(errors.email)}
                helperText={
                  (errors.email && errors.email.type === 'required' && (
                    <Box sx={style.errBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.errorMsg}>
                        Email is required
                      </Typography>
                    </Box>
                  )) ||
                  (errors.email && errors.email.type === 'pattern' && (
                    <Box sx={style.errBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.errorMsg}>
                        Enter valid email address
                      </Typography>
                    </Box>
                  ))
                }
              />
              <InputTextField
                sx={{mb: '16px'}}
                label="Password *"
                type={values.showPassword ? 'text' : 'password'}
                autoComplete="off"
                variant="outlined"
                register={{
                  ...register('password', {
                    required: true,
                    pattern: pswRegex,
                  }),
                }}
                disabled={disabledState}
                error={Boolean(errors.password)}
                helperText={
                  (errors.password && errors.password.type === 'required' && (
                    <Box sx={style.errBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.errorMsg}>
                        Password is required
                      </Typography>
                    </Box>
                  )) ||
                  (errors.password && errors.password.type === 'pattern' && (
                    <Box sx={style.errBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.errorMsg}>
                        Password should contain at least one lowercase, uppercase, number and special character
                      </Typography>
                    </Box>
                  ))
                }
                onFocus={handleOnFocus}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        data-testid="eyeIcon"
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
              {!(errors.password?.type === 'pattern') ? (
                <Popover
                  id="simple-popover"
                  data-testid="simple-popover"
                  open={open}
                  onClose={handlePopupClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  disableAutoFocus
                  disableEnforceFocus
                  disableRestoreFocus
                >
                  <Typography sx={{width: '15vw'}}>
                    <Typography sx={style.paragraph}>Password must include:</Typography>
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
              <InputTextField
                sx={{mb: '16px'}}
                label="Confirm Password *"
                type={confirmPswValues.showConfirmPassword ? 'text' : 'password'}
                autoComplete="off"
                variant="outlined"
                onFocus={undefined}
                disabled={disabledState}
                register={{
                  ...register('confirmPassword', {
                    required: true,
                    pattern: pswRegex,
                    validate: (match) => {
                      const confirmpassword = getValues('confirmPassword');
                      const password = getValues('password');
                      return !(match && password !== confirmpassword);
                    },
                  }),
                }}
                error={Boolean(errors.confirmPassword)}
                helperText={
                  (errors.confirmPassword && errors.confirmPassword.type === 'required' && (
                    <Box sx={style.errBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.errorMsg}>
                        Confirm Password is required
                      </Typography>
                    </Box>
                  )) ||
                  (errors.confirmPassword && errors.confirmPassword.type === 'pattern' && (
                    <Box sx={style.errBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.errorMsg}>
                        Confirm Password should contain at least one lowercase,uppercase, number and special character
                      </Typography>
                    </Box>
                  )) ||
                  (errors.confirmPassword && (
                    <Box sx={style.errBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.errorMsg}>
                        Confirm Password and password should be same
                      </Typography>
                    </Box>
                  ))
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        data-testid="eyeIcontwo"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {confirmPswValues.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {options.captcha ? (
                <Box data-testid="recaptchaform" sx={{mt: 2, mb: 3}}>
                  <ReCAPTCHA sitekey={API_URL.recaptchaSiteKey || ''} ref={recaptchaRef} onChange={onChange} />
                  {!verify ? (
                    <Box sx={style.recaptchaErrBox}>
                      <Box component="img" src={ErrorIcon} sx={style.errorIcon} />
                      <Typography variant="caption" sx={style.recaptchaErrorMsg}>
                        Captcha is required
                      </Typography>
                    </Box>
                  ) : null}
                </Box>
              ) : null}
              <FormButton variant="contained" disabled={disabledState} type="submit" style={{margin: '0'}}>
                Sign Up
              </FormButton>
              <Box sx={style.dividerMainBox}>
                <Box sx={style.divider} />
                <Typography variant="subtitle1" sx={style.orText}>
                  OR
                </Typography>
                <Box sx={style.divider} />
              </Box>
              {googleButtonVisible ? (
                <>
                  <SocialServiceBtn variant="outlined" startIcon={googleIcon} onClick={() => googleLogIn()}>
                    Continue with Google
                  </SocialServiceBtn>
                  <br />
                  <br />
                </>
              ) : (
                ''
              )}
              <SocialServiceBtn
                variant="outlined"
                startIcon={microsoftIcon}
                onClick={() => handleLoginUsingPopUP('popup')}
              >
                Continue with Microsoft
              </SocialServiceBtn>
              <br />
              <br />
              <Typography variant="subtitle1" sx={style.alreadyAccText}>
                Already have an account?&nbsp;
                <Link href="/sign-in">Sign In</Link>
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box component="form" onSubmit={signInHandler} sx={style.successBox}>
            <Box component="img" src={SuccessIcon} sx={style.successIcon} />
            <Typography variant="h6" sx={style.successText}>
              Registration Successful
            </Typography>
            <Typography variant="subtitle1" sx={style.successSignInText}>
              Please sign in to your account.
            </Typography>
            <FormButton variant="contained" disabled={false} type="submit" style={style.successSignInBtn}>
              SIGN IN
            </FormButton>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
export default SignUp;
`;
