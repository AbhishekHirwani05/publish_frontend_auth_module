module.exports =  `import { Navigate, Outlet, Route } from "react-router-dom";

/* starting point of protected route */ 
const ProtectedRoutes = () => {
  const user_token = localStorage.getItem("auth_token");

  return user_token ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoutes;

`