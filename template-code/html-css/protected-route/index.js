module.exports = `import { Navigate, Outlet, } from "react-router-dom";

/* starting point of protected route */ 
const ProtectedRoutes = () => {
  const user_token = localStorage.getItem("auth_token");
  const refresh_token = localStorage.getItem("refreshtoken");
  if (user_token && refresh_token) {
    return(
      <Outlet />
    )
  }
  else{ 
   return  <Navigate to="/sign-in" />
  }
};

export default ProtectedRoutes;`