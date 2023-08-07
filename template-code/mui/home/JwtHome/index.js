module.exports =`import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignOutBtn, Heading, ParentBox, ChidlBox } from "./style";
import { axiosApiInstance } from "../../api";
import {API_URL} from "../../../../shared/apiEndPointURL";
import jwt_decode from "jwt-decode";

/* start point of Jwthome screen */
const JwtHome = () => {
  /* this is for routing */
  const history = useNavigate();

  /* function to handle click event on signout button */
  const onHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("checkBoxStatus");
      localStorage.removeItem("accessToken");
      history("/sign-in"); 
    }
  };

  /* auth_token grab from localstorage  */  
  const auth_token: any = localStorage.getItem("auth_token");

  /* decoded the auth_token */
  const decoded: any = jwt_decode(auth_token);

  /* set the userRole in localstorage */
  localStorage.setItem("userRole", decoded.role as string);

  /* variable  to store the user role */
  const userRole = decoded.role;

  /* useEffect for checking valid user api calling */ 
useEffect(() => {
  // token grab
  const auth_token = localStorage.getItem("auth_token");
  try {
    axiosApiInstance
      .get(\`\${API_URL.me}\`, {
        headers: { Authorization: \`Bearer \${auth_token}\` },   
      })
      .then((response:any) => {
        const resJson = response.data;
        if (response.status === 200) {
          const userName: string = resJson.data.name;
        }
      });
  } catch (err) {
    console.log(err);
  }
},[]);

  return (
    <Box style={ParentBox}>
      <Box style={ChidlBox}>
        <Typography variant="h4" style={Heading}>
          Welcome to Konverge
        </Typography>
        <Button
          variant="contained"
          type="submit"
          style={SignOutBtn}
          onClick={(event) => onHandleClick(event)}
        >
          Sign Out
        </Button>
      </Box>
      {userRole === "superAdmin" ? (
        <Link to="/admin/dashboard">Admin-Dashboard</Link>
      ) : null}
    </Box>
  );
};

export default JwtHome;
`;