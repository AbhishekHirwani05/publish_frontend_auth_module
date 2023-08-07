module.exports = `import {Box, Button, Typography} from '@mui/material';
import axios from 'axios';
import {axiosApiInstance} from 'components/Auth/api';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {API_URL} from 'shared/apiEndPointURL';
import {style} from '../JwtHome/JwtHomeStyle.css';
import {toast} from 'react-toastify';

/* start point of azure home screen */
const GoogleHome = () => {
  /* this is for routing */
  const history = useNavigate();
  /**
  @author      : Abhishek Hirwani
  @date        : 2023-06-29
  @description : function to handle click event on signout button
  */
  const onHandleClick = () => {
    localStorage.removeItem('id_token');
    localStorage.removeItem('auth_token');
    history('/sign-in');
  };

  /**
  @author      : Abhishek Hirwani
  @date        : 2023-06-29
  @description : Calling the me api and verify google login successfuly and checking the id_token expiry
  */
  const getCheckEmailVerify = (id_token: string) => {
    let name = '';
    axiosApiInstance
      .get(\`\${API_URL.me}\`, {
        headers: {Authorization: \`Bearer \${id_token}\`},
      })
      .then((response) => {
        if (response.statusText === 'OK' && response.data.email_verified === true) {
          name = response.data;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /**
  @author      : Abhishek Hirwani
  @date        : 2023-06-29
  @description : Calling the getAuthorization api and storing the access token in the localstorage
  */

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const authorizcodeationCode = urlSearchParams.get('code');
    let isMounted = true;
    const getAuthorization = async () => {
      await axiosApiInstance
        .post(\`\${API_URL.googleAuthorization}\`, {
          code: authorizcodeationCode,
        })
        .then((response) => {
          if (isMounted && response.statusText === 'OK') {
            if (response.data.id_token && response.data.refresh_token) {
              localStorage.setItem('id_token', response.data.id_token as string);
              localStorage.setItem('refreshtoken', response.data.refresh_token as string);
            } else if (response.data.id_token && !response.data.refresh_token) {
              localStorage.setItem('id_token', response.data.id_token as string);
            }
            getCheckEmailVerify(response.data.id_token as string);
          }
        })
        .catch((err) => {
          toast.error(err.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    };

    if (isMounted) {
      getAuthorization();
    }

    return () => {
      isMounted = false; // Cleanup function to update component mounting state
    };
  }, []);

  return (
    <Box sx={style.ParentBox}>
      <Box style={style.ChidlBox}>
        <Typography variant="h4" style={style.Heading}>
          Welcome to Konverge
        </Typography>
        <Button variant="contained" type="submit" style={style.SignOutBtn} onClick={() => onHandleClick()}>
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default GoogleHome;
`;
