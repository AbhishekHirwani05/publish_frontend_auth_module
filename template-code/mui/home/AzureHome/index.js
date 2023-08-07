module.exports = 
`import React, { useEffect, useRef, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { Box, Button, Typography } from "@mui/material";
import { SignOutBtn, Heading, ParentBox, ChidlBox,ChidlBox2 } from "../JwtHome/style";
import { loginRequest } from "../../AzureAD/azureConfig";
import { callMsGraph } from "../../AzureAD/graphAPI";

/* start point of azure home screen */
const AzureHome = () => {
  /* this is for routing */
  const { instance, accounts } = useMsal();

  const [graphData, setGraphData] = useState();

  /* function to handle click event on signout button */
  const onHandleLogoutUsingPopup = async (logoutType: any) => {
    if (logoutType === "popup") {
      localStorage.removeItem("auth_token");
      await instance.logoutPopup({
        postLogoutRedirectUri: "/sign-in",
        mainWindowRedirectUri: "/sign-in",
      });
    }
  };

  const onHandleLogoutUsingRedirect = (logoutType:any) => {
    if (logoutType === "redirect") {
       instance.logoutRedirect({
        postLogoutRedirectUri: "/sign-in",
        });
    }
}

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
        callMsGraph(response.accessToken).then((response: any) => {
          setGraphData(response);
        });
      })
      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraph(response.accessToken).then((response: any) => {
            setGraphData(response);
          });
        });
      });
  };

  useEffect(() => {
    requestProfileData();
  }, []);

  return (
    <Box style={ParentBox}>
      <Box style={ChidlBox}>
        <Typography variant="h4" style={Heading}>
          Welcome {name}
        </Typography>
        <Box style={ChidlBox2}>
        <Button
          variant="contained"
          type="submit"
          style={SignOutBtn}
          onClick={() => onHandleLogoutUsingPopup("popup")}
        >
          Sign Out using Microsoft using popup
        </Button>
        <Button
          variant="contained"
          type="submit"
          style={SignOutBtn}
          onClick={() => onHandleLogoutUsingRedirect("redirect")}
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