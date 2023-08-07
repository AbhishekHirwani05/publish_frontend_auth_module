module.exports = `import {Box, Button, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import jwt_decode, {JwtPayload} from 'jwt-decode';
import {AxiosError, AxiosResponse} from 'axios';
import {toast} from 'react-toastify';
import {style} from './JwtHomeStyle.css';
import {axiosApiInstance} from '../../api';
import {API_URL} from '../../../../shared/apiEndPointURL';

/**
 * @author : Shivali Umbarkar
 * @date : 23/03/2023
 * @description : JWT Home Component
 * @params : Return Params
 * @return : Return Output / / define the function type and the return type here */

type IToken = {
  role: string;
  decoded: JwtPayload;
};

/* start point of Jwthome screen */
const JwtHome = () => {
  /* this is for routing */
  const history = useNavigate();

  /* function to handle click event on signout button */
  const onHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refreshtoken');
      localStorage.removeItem('checkBoxStatus');
      localStorage.removeItem('accessToken');
      history('/sign-in');
    }
  };

  /* auth_token grab from localstorage  */
  const authToken: string = localStorage.getItem('auth_token') || '';

  /* decoded the auth_token */
  const decoded = jwt_decode<IToken>(authToken);

  /* set the userRole in localstorage */
  localStorage.setItem('userRole', decoded.role.roleName);

  /* variable  to store the user role */
  const userRole: string = decoded.role.roleName;

  /* useEffect for checking valid user api calling */
  useEffect(() => {
    let isMounted = true; // Flag to track component mounting state
    const fetchUserData = async () => {
      await axiosApiInstance
        .get(\`\${API_URL.me}\`, {
          headers: {Authorization: \`Bearer \${authToken}\`},
        })
        .then((response: AxiosResponse) => {
          const resJson = response.data;
          if (isMounted && response.status === 200) {
            const userName: string = resJson.data.name;
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
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
    { /*  <Box style={style.ChidlBox}>
    <Typography variant="h4" style={style.Heading}>
      Welcome to Konverge
    </Typography>
    <Button variant="contained" type="submit" style={style.SignOutBtn} onClick={(event) => onHandleClick(event)}>
      Sign Out
    </Button>
  </Box> */}
      {userRole === 'superAdmin' ? <Link to="/admin/dashboard">Admin-Dashboard</Link> : null} <br />
      {userRole === 'superAdmin' ? <Link to="/admin/rolemanagement">Role-Management</Link> : null}
    </Box>
  );
};

export default JwtHome;
`;
