module.exports = `/* this is a functional component */
import {Box, Typography, Grid} from '@mui/material';
import React, {useState} from 'react';
import {options} from 'auth-config';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {API_URL} from 'shared/apiEndPointURL';
import axios from 'axios';
import {IForgotPasswordUserData} from 'interfaces/authForgotPassword.interface';
import InputTextField from '../Controls/Input.component';
import WelcomeBackWeb from '../../../auth-assets/images/welcomeBackWeb.png';
import WelcomeBackTab from '../../../auth-assets/images/welcomeBackTab.png';
import WelcomeBackMobile from '../../../auth-assets/images/welcomeBackMobile.png';
import ErrorIcon from '../../../auth-assets/images/errorIcon.png';
import {style} from './ForgotPassword.css';
import FormButton from '../Controls/PrimaryButton.component';
import LockIcon from '../../../auth-assets/images/lockIcon.png';

/**
 * @author : MB
 * @date : 23/03/2023
 * @description : ForgotPassword Component
 * @params : Return Params
 * @return : Return Output / / define the function type and the return type here */

const ForgotPassword: React.FC<Record<string, unknown>> = () => {
  /* regex for email address */
  const emailRegex = /\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*/;

  /* this state is for set the fields input value */
  const [input, setInput] = useState<IForgotPasswordUserData>();

  /* this is for routing */
  const history = useNavigate();

  /* this is for form validation */
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<IForgotPasswordUserData>();

  /*  this function is for forgot password api call */
  const forgotPasswordHandler = async (data: IForgotPasswordUserData) => {
    axios
      .post(\`\${API_URL.forgotPassword}\`, {email: data.email}, {headers: {'Content-Type': 'application/json'}})
      .then((res) => {
        if (res.statusText === 'OK') {
          setInput(input);
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          if (options.strategy === 'AWS Cognito') {
            history('/reset-password', {state: {email: data.email}});
          }
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    reset();
  };

  return (
    <Grid container component="main" sx={style.mainGrid}>
      <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
        <Box
          component="img"
          src={WelcomeBackWeb}
          alt="WelcomeBackWeb"
          style={style.welcomeImg}
          sx={{display: {xs: 'none', sm: 'none', md: 'block'}}}
        />
        <Box
          component="img"
          src={WelcomeBackTab}
          alt="WelcomeBackTab"
          sx={{display: {xs: 'none', sm: 'block', md: 'none'}}}
          style={style.welcomeMobileImg}
        />
        <Box
          component="img"
          src={WelcomeBackMobile}
          alt="WelcomeBackMobile"
          sx={{display: {xs: 'block', sm: 'none', md: 'none'}, height: '890px'}}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7} xl={7} sx={style.formGrid}>
        <Box sx={style.formBox}>
          <Box component="img" src={LockIcon} alt="LockIcon" style={style.lockIcon} />
          <Typography variant="h6" sx={style.forgotPswText}>
            Forgot Password
          </Typography>
          <Box component="form" data-testid="forgotpasswordform" onSubmit={handleSubmit(forgotPasswordHandler)}>
            <InputTextField
              sx={{mb: '16px'}}
              label="email *"
              type="email"
              autoComplete="off"
              variant="outlined"
              disabled={false}
              InputProps={undefined}
              onFocus={undefined}
              register={{...register('email', {required: true, pattern: emailRegex})}}
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
            <br />
            <br />
            <FormButton  disabled={false} variant="contained" type="submit" style={style.forgotBtn}>
              GET PASSWORD RECOVERY LINK{' '}
            </FormButton>
            <Typography variant="subtitle1" sx={style.testPsw}>
              Please check your inbox for reset your password
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
export default ForgotPassword;
`;
