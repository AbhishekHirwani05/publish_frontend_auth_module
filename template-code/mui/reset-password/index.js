module.exports = `/* this is a functional component */
import React, {useEffect, useState} from 'react';
import {API_URL} from 'shared/apiEndPointURL';
import {useNavigate, useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {toast} from 'react-toastify';
import {Box, Grid, IconButton, InputAdornment, Popover, Typography} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {IResetPasswordUserData} from 'interfaces/authResetPassword.interface';
import {style} from './ResetPassword.css';
import SuccessIcon from '../../../auth-assets/images/successIcon.png';
import InputTextField from '../Controls/Input.component';
import WelcomeBackWeb from '../../../auth-assets/images/welcomeBackWeb.png';
import WelcomeBackTab from '../../../auth-assets/images/welcomeBackTab.png';
import WelcomeBackMobile from '../../../auth-assets/images/welcomeBackMobile.png';
import FormButton from '../Controls/PrimaryButton.component';
import LockIcon from '../../../auth-assets/images/lockIcon.png';

/**
@author      : SU
@date        : 15/04/2023
@description : Resetpassword Component
@params      : Return Params
@return      : Return Output
*/

/* define the function type and the return type here */
const Resetpassword: React.FC<IResetPasswordUserData> = () => {
  /* this is use for access the id */
  const params = useParams();

  /* this is for routing */
  const history = useNavigate();

  /* regex for password */
  const pswRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  /* this state is for hide and show password */
  const [showPasswordValue, setShowPasswordValue] = useState<IResetPasswordUserData>({showPassword: false});

  /* this state is for hide and show confirm password */
  const [showConfirmPasswordValue, setShowConfirmPasswordValue] = useState<IResetPasswordUserData>({
    showConfirmPassword: false,
  });

  /* this is for form validation */
  const {
    register,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<IResetPasswordUserData>();

  /* this state is for set the fields input value */
  const [input, setInput] = useState<IResetPasswordUserData>();

  /* this state is for validate the reset password token as per css will appear */
  const [isvalid, setValid] = useState<boolean>(false);

  const [isResetPasswordSuccessfully, setIsResetPasswordSuccessfully] = useState<boolean>(false);

  /* this function is for show and hide password */
  const handleClickShowPassword = () => {
    setShowPasswordValue({
      ...showPasswordValue,
      showPassword: !showPasswordValue.showPassword,
    });
  };

  /* this function is for show and hide confirm password */
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPasswordValue({
      ...showConfirmPasswordValue,
      showConfirmPassword: !showConfirmPasswordValue.showConfirmPassword,
    });
  };

  /* this function is for show and hide password icon */
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  /* object anchor element of popover */
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | HTMLTextAreaElement | null>(null);

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

  /* useEffect for validate reset password link */
  useEffect(() => {
    const token = params.id;
    try {
      axios
        .post(\`\${API_URL.verifyPasswordToken}\`, {
          token,
        })
        .then((response) => {
          if (response.status === 200) {
            setValid(true);
          } else if (response.status === 403) {
            setValid(false);
          }
        });
    } catch (err) {
      toast.error('Internal Server Error', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);

  /*  this function is for reset password api call */
  const resetPasswordHandler = async (data: IResetPasswordUserData) => {
    try {
      await axios
        .put(
          \`\${API_URL.resetPassword}/\${params.id}\`,
          {
            password: data.password,
          },
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
            setIsResetPasswordSuccessfully(true);
          } else {
            toast.error(response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        });
    } catch (err) {
      toast.error('Internal Server Error', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const SignInHandler = () => {
    history('/sign-in');
  };

  return (
    <Grid container component="main" sx={style.mainGrid}>
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
        {!isvalid ? (
          <Box sx={style.linkExpiredFormBox}>
            <Typography sx={style.linkError}>
              {' '}
              <ErrorIcon /> &nbsp; The Password reset link is expired.
            </Typography>
          </Box>
        ) : (
          <>
            {' '}
            {!isResetPasswordSuccessfully ? (
              <Box sx={style.formBox}>
                <Box component="img" src={LockIcon} alt="LockIcon" style={style.lockIcon} />
                <Typography variant="h6" sx={style.heading}>
                  Reset Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit(resetPasswordHandler)}>
                  <InputTextField
                    sx={{marginBottom: '19px'}}
                    label="Password *"
                    variant="outlined"
                    type={showPasswordValue.showPassword ? 'text' : 'password'}
                    autoComplete="off"
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
                            data-testid="password-icon"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPasswordValue.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onFocus={handleOnFocus}
                  />
                  {!(errors.password?.type === 'pattern') ? (
                    <Popover
                      id="simple-popover"
                      open={open}
                      onClose={handlePopupClose}
                      anchorEl={anchorEl} // use to set the position
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
                        <p style={style.paragraph}>Password must include:</p>
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
                    sx={{marginBottom: '30px'}}
                    label="Confirm Password *"
                    variant="outlined"
                    type={showConfirmPasswordValue.showConfirmPassword ? 'text' : 'password'}
                    autoComplete="off"
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
                        <Typography sx={style.error}>
                          {' '}
                          <ErrorIcon /> &nbsp; Confirm Password is required
                        </Typography>
                      )) ||
                      (errors.confirmPassword && errors.confirmPassword.type === 'pattern' && (
                        <Typography sx={style.error}>
                          <ErrorIcon />
                          &nbsp; Password should contain at least one lowercase, uppercase, number and special character
                        </Typography>
                      )) ||
                      (errors.confirmPassword && (
                        <Typography sx={style.error}>
                          <ErrorIcon />
                          &nbsp; Confirm Password and password should be same
                        </Typography>
                      ))
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            data-testid="confirm-password-icon"
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPasswordValue.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onFocus={undefined}
                  />
                  <FormButton type="submit" style={{marginBottom: '94px'}} variant="contained">
                    RESET PASSWORD
                  </FormButton>
                </Box>
              </Box>
            ) : (
              <Box sx={style.successMszFormBox}>
                <Box component="img" src={SuccessIcon} alt="LockIcon" style={style.succesIcon} />
                <Typography variant="h6" sx={style.sucessHeading}>
                  Password Reset Successfully.
                </Typography>
                <Box component="form" onSubmit={handleSubmit(SignInHandler)}>
                  <Typography sx={style.signInMsz}>Please sign in to your account.</Typography>
                  <FormButton type="submit" style={{marginBottom: '71px'}} variant="contained">
                    SIGN IN
                  </FormButton>
                </Box>
              </Box>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};
export default Resetpassword;
`;
