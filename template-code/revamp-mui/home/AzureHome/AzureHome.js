module.exports = `import React, {useEffect, useState} from 'react';
import {useMsal} from '@azure/msal-react';
import {Box, Button, Typography} from '@mui/material';
import {style} from '../JwtHome/JwtHomeStyle.css';
import {loginRequest} from '../../AzureAD/azureConfig';
import {callMsGraph} from '../../AzureAD/graphAPI';

/**
@author      : Shivali Umbarkar
@date        : 17/04/2023
@description : Azure Home Component
@params      : Return Params
@return      : Return Output
*/

/* start point of azure home screen */
const AzureHome = () => {
  /* this is for routing */
  const {instance, accounts} = useMsal();

  const [graphData, setGraphData] = useState();

  /* function to handle click event on signout button */
  const onHandleLogoutUsingPopup = async (logoutType: string) => {
    if (logoutType === 'popup') {
      localStorage.removeItem('auth_token');
      await instance.logoutPopup({
        postLogoutRedirectUri: '/sign-in',
        mainWindowRedirectUri: '/sign-in',
      });
    }
  };

  const onHandleLogoutUsingRedirect = (logoutType: string) => {
    if (logoutType === 'redirect') {
      instance.logoutRedirect({
        postLogoutRedirectUri: '/sign-in',
      });
    }
  };

  const name = accounts[0] && accounts[0].name;

  /* this function is for call the microsoft graph api */
  const requestProfileData = () => {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response) => {
        callMsGraph(response.accessToken).then((res) => {
          setGraphData(res);
        });
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraph(response.accessToken).then((res) => {
            setGraphData(res);
          });
        });
      });
  };

  useEffect(() => {
    requestProfileData();
  }, []);

  return (
    <Box sx={style.ParentBox}>
      <Box style={style.ChidlBox}>
        <Typography variant="h4" style={style.Heading}>
          Welcome {name}
        </Typography>
        <Box style={style.ChidlBox2}>
          <Button
            variant="contained"
            type="submit"
            style={style.SignOutBtn}
            onClick={() => onHandleLogoutUsingPopup('popup')}
          >
            Sign Out using Microsoft using popup
          </Button>
          <Button
            variant="contained"
            type="submit"
            style={style.SignOutBtn}
            onClick={() => onHandleLogoutUsingRedirect('redirect')}
          >
            Sign Out using Microsoft using redirect
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AzureHome;
`;
