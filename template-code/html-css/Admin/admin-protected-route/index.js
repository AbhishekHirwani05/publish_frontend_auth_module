module.exports = `import { Navigate, Outlet } from "react-router-dom";

/* starting point of protected route */
const AdminProtectedRoutes = () => {
  /* get localstorage user token */
  const auth_token = localStorage.getItem("auth_token");
  /* get localstorage user role */
  const role = localStorage.getItem("userRole");
  if (auth_token && role && (role === "admin" || role === "superAdmin")) {
    return <Outlet />;
  } else {
    return <Navigate to="/sign-in" />;
  }
};

export default AdminProtectedRoutes;
`