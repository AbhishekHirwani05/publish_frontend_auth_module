module.exports = `import {Box, Button, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AxiosResponse} from 'axios';
import {axiosApiInstance} from '../../api';
import {API_URL} from '../../../../shared/apiEndPointURL';
import {style} from '../JwtHome/JwtHomeStyle.css';

/**
 * @author : Shivali Umbarkar
 * @date : 23/03/2023
 * @description : Auth0 Home Component
 * @params : Return Params
 * @return : Return Output / / define the function type and the return type here */

/* start point of Jwthome screen */
const Auth0Home = () => {
  /* this is for routing */
  const history = useNavigate();

  /* function to handle click event on signout button */
  const onHandleClick = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refreshtoken');
    localStorage.removeItem('checkBoxStatus');
    localStorage.removeItem('id_token');
    history('/sign-in');
  };
  let userName = '';

  /* useEffect for checking valid user api calling */
  useEffect(() => {
    const idToken = localStorage.getItem('id_token');
    let isMounted = true; // Flag to track component mounting state
    const fetchUserData = async () => {
      await axiosApiInstance
        .get(\`\${API_URL.me}\`, {
          headers: {Authorization: \`Bearer \${idToken}\`},
        })
        .then((response: AxiosResponse) => {
          if (isMounted && response.status === 200) {
            userName = response.data.email;
          }
        });
    };
    if (isMounted) {
      fetchUserData();
    }

    return () => {
      isMounted = false; // Cleanup function to update component mounting state
    };
  }, []);

  return (
    <Box sx={style.ParentBox}>
      <Box style={style.ChidlBox}>
        <Typography variant="h4" style={style.Heading}>
          Welcome to Konverge {userName}
        </Typography>
        <Button variant="contained" type="submit" style={style.SignOutBtn} onClick={() => onHandleClick()}>
          Sign Out
        </Button>
      </Box>
    </Box>
  );
};

export default Auth0Home;
`;
