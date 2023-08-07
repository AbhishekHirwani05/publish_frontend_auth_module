module.exports = `/* this is a functional component */

import React, {useEffect, useState} from 'react';
import {options} from 'auth-config';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {API_URL} from 'shared/apiEndPointURL';
import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from '@mui/material';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';
import {ISignInUserData} from 'interfaces/authSignIn.interface';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
import {useMsal} from '@azure/msal-react';
import {useAtom} from 'jotai';
import {AuthenticationResult, EventMessage, EventType, InteractionType} from '@azure/msal-browser';
import {style} from './SignIn.css';
import InputTextField from '../Controls/Input.component';
import WelcomeBackWeb from '../../../auth-assets/images/welcomeBackWeb.png';
import WelcomeBackTab from '../../../auth-assets/images/welcomeBackTab.png';
import WelcomeBackMobile from '../../../auth-assets/images/welcomeBackMobile.png';
import MicrosoftIcon from '../../../auth-assets/images/msIcon.png';
import GoogleIcon from '../../../auth-assets/images/google.png';
import FormButton from '../Controls/PrimaryButton.component';
import SocialServiceBtn from '../Controls/SocialServiceBtn.component';
import LockIcon from '../../../auth-assets/images/lockIcon.png';
import {loginRequest} from '../AzureAD/azureConfig';
import {redirectFrom} from '../Atom/store';
import Auth0Icon from '../../../auth-assets/images/auth0-icon.png';

type IRedirectResponse = {
  accessToken: string;
};

/**
@author      : shivali umbarkar
@date        : 15/04/2023
@description : Signin Component
@params      : Return Params
@return      : Return Output
*/

/* define the function type and the return type here */
const Signin: React.FC<ISignInUserData> = () => {
  /* this is for form validation */
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignInUserData>();

  /* regex for password */
  const pswRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  /* regex for email address */
  const emailRegex = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/;

  /* this state is for set the fields input value */
  const [inputValue, setInputValue] = useState<ISignInUserData>();

  /* this state is for hide and show password */
  const [passVisible, setpassVisible] = useState<ISignInUserData>({showPassword: false});

  /* this state is for set the login options */
  const [redirectFromVal, setRedirectFrom] = useAtom(redirectFrom);

  /* this function is for show and hide password */
  const handleClickShowPassword = () => {
    setpassVisible({
      ...passVisible,
      showPassword: !passVisible.showPassword,
    });
  };

  /* this function is for show and hide password icon */
  const handleClickHidePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const microsoftIcon = (
    <Icon>
      <img
        alt="microsoftIcon"
        src={MicrosoftIcon}
        style={{width: '20px', height: '20px', position: 'absolute', left: '24px'}}
      />
    </Icon>
  );
  const googleIcon = (
    <Icon>
      <img
        alt="microsoftIcon"
        src={GoogleIcon}
        style={{width: '20px', height: '20px', position: 'absolute', left: '24px'}}
      />
    </Icon>
  );
  /* this is function handle the checkbox event */
  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      localStorage.setItem('checkBoxStatus', \`\${event.target.checked}\` as string);
    } else {
      localStorage.removeItem('checkBoxStatus');
    }
  };

  /* this is for routing */
  const history = useNavigate();
  /**
  @author      : Author Name
  @date        : 2023-06-29
  @description : calling the googleLogin function and passing the parameter to googlea auth end point
  */
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

  /* SignIn handler for submit button */
  const signInHandler = async (data: ISignInUserData) => {
    await axios
      .post(
        \`\${API_URL.login}\`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      )
      .then((response) => {
        if (response.status === 200) {
          setInputValue(inputValue);
          toast.success(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          if (response.data.token && response.data.refreshToken) {
            localStorage.setItem('auth_token', response.data.token as string);
            localStorage.setItem('refreshtoken', response.data.refreshToken as string);
          }
          if (options['2FA'] === true && options.strategy === 'JWT Strategy') {
            const tempToken = response.data.token;
            localStorage.setItem('token', tempToken);
            history('/verify', {state: {email: data.email || ''}});
          } else if (options.strategy === 'AWS Cognito') {
            history('/');
          } else if (options.strategy === 'JWT Strategy' && options['2FA'] === false) {
            history('/', {state: {email: data.email || ''}});
            setRedirectFrom('jwtlogin');
          } else if (options.strategy === 'Auth0') {
            if (response.data.id_token && response.data.access_token && response.data.refresh_token) {
              localStorage.setItem('id_token', response.data.id_token as string);
              localStorage.setItem('auth_token', response.data.access_token as string);
              localStorage.setItem('refreshtoken', response.data.refresh_token as string);
              history('/', {state: {email: data.email || ''}});
              setRedirectFrom('auth0');
              toast.success('Login Successfully', {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          }
        }
      })
      .catch((err) => {
        if (options.strategy === 'Auth0') {
          const errMsz = JSON.parse(err.response.data.message);
          toast.error(errMsz.error_description, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
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

  // const handleRedirectResponse = async (response: IRedirectResponse) => {
  //   localStorage.setItem('auth_token', response.accessToken);
  //   setRedirectFrom('microsoft');
  //   history('/');
  // };

  // const handleLoginUsingRedirect = async (loginType: string) => {
  //   if (loginType === 'redirect') {
  //     await instance.loginRedirect(loginRequest);
  //   }
  // };
  // useEffect(() => {
  //   let isMounted = true;
  //   const callbackId = instance.addEventCallback((event: EventMessage) => {
  //     switch (event.eventType) {
  //       case EventType.LOGIN_SUCCESS: {
  //         console.log('slogin uccess');

  //         if (isMounted) {
  //           setRedirectFrom('microsoft');
  //           history('/');
  //         }
  //         return false;
  //       }
  //       case EventType.ACQUIRE_TOKEN_SUCCESS: {
  //         console.log('token succes');
  //         if (event.interactionType === InteractionType.Redirect) {
  //           const payload = event.payload as AuthenticationResult;
  //           localStorage.setItem('auth_token', payload.accessToken);
  //           setRedirectFrom('microsoft');
  //           history('/');
  //           return false;
  //         }
  //         break;
  //       }
  //       default:
  //         break;
  //     }
  //   });
  //   return () => {
  //     instance.removeEventCallback(callbackId!);
  //   };
  // }, []);

  // Conditionally assign the href value based on isLoggedIn
  const forgotPasswordHref = options.strategy === 'Auth0' ? '/authzero-forgot-password' : '/forgot-password';
  const logo = options.strategy === 'Auth0'? Auth0Icon : options.strategy === 'Google' ? GoogleIcon :LockIcon
  options.strategy === 'Auth0' ? Auth0Icon : LockIcon;
  const googleButtonVisible = options.strategy === 'Google' ? true : false;
  const disabledState = options.strategy === 'Google' ? true : false;

  return (
    <Grid data-testid="signInform" container component="main" sx={style.mainGrid}>
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
          <Box component="img" src={logo} alt="LockIcon" style={style.lockIcon} />
          <Typography variant="h6" sx={style.heading}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit(signInHandler)}>
            <InputTextField
              sx={{mb: '16px'}}
              label="Email *"
              type="email"
              autoComplete="off"
              variant="outlined"
              InputProps={undefined}
              onFocus={undefined}
              disabled={disabledState}
              register={{...register('email', {required: true, pattern: emailRegex})}}
              error={Boolean(errors.email)}
              helperText={
                (errors.email && errors.email.type === 'required' && (
                  <Typography sx={style.error}>
                    <ErrorIcon />
                    &nbsp; Email is required
                  </Typography>
                )) ||
                (errors.email && errors.email.type === 'pattern' && (
                  <Typography sx={style.error}>
                    <ErrorIcon />
                    &nbsp; Enter valid email address
                  </Typography>
                ))
              }
            />
            <InputTextField
              sx={{mb: '1px'}}
              label="Password *"
              variant="outlined"
              type={passVisible.showPassword ? 'text' : 'password'}
              autoComplete="off"
              disabled={disabledState}
              register={{
                ...register('password', {
                  required: true,
                  pattern: pswRegex,
                }),
              }}
              error={Boolean(errors.password)}
              helperText={
                (errors.password && errors.password.type === 'required' && (
                  <Typography sx={style.error}>
                    {' '}
                    <ErrorIcon /> &nbsp; Password is required
                  </Typography>
                )) ||
                (errors.password && errors.password.type === 'pattern' && (
                  <Typography sx={style.error}>
                    <ErrorIcon />
                    &nbsp; Password should contain at least one lowercase, uppercase, number and special character
                  </Typography>
                ))
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      data-testid="eyeIcon"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleClickHidePassword}
                      edge="end"
                    >
                      {passVisible.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onFocus={undefined}
            />
            <FormControlLabel
              label="Remember Me"
              style={style.RememberMeCheckBox}
              control={<Checkbox checked={inputValue?.isChecked} onChange={(event) => handleCheckbox(event)} />}
            />

            <FormButton type="submit" style={{marginBottom: '8px'}} disabled={disabledState} variant="contained" data-testid="signinButton">
              SIGN IN
            </FormButton>
            <Link sx={style.linkForgot} href={forgotPasswordHref}>
              Forgot password?
            </Link>
            <Divider sx={style.divider}>OR</Divider>
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
            {/* <br />
            <br />
            <SocialServiceBtn
              variant="outlined"
              startIcon={microsoftIcon}
              onClick={() => handleLoginUsingRedirect('redirect')}
            >
              Continue with Microsoft using redirect
            </SocialServiceBtn> */}
            <br />
            <br />
            <Typography sx={style.LinkBox} variant="subtitle1">
              Don't have an account?&nbsp;
              <Link href="/sign-up">SignUp</Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default Signin;
`;
