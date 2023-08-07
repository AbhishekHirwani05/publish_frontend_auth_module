module.exports = `import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosApiInstance } from "../api";
import { Btn, ChidlBox, mainDiv } from "./style";
import { API_URL } from "../../../shared/apiEndPointURL";
import jwt_decode from "jwt-decode";

/* start point of home screen */
const Home = () => {
  /* this is for routing */
  const history = useNavigate();

  /* function to handle click event on signout button */
  const onhandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("refreshtoken");
      localStorage.removeItem("checkBoxStatus");
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
    <div style={mainDiv}>
      <div style={ChidlBox}>
      <h2 style={{ fontSize: "40px" }}> Welcome to Konverge</h2>
        <button style={Btn} onClick={onhandleClick} type="submit">
          Sign Out
        </button>
      </div>
      {userRole === "superAdmin" ? (
        <Link to="/admin/dashboard">Admin-Dashboard</Link>
      ) : null}
    </div>
  );
};

export default Home;
`;
