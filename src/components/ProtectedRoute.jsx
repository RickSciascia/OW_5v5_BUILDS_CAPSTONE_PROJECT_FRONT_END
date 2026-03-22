import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { userLogged, token } = useSelector((state) => state.auth);

  console.log("CHECK PROTECTED ROUTE: ", { userLogged, token, roleRequired });

  if (!token) {
    return <Navigate to="/login" />;
  }

  const hasAccess =
    userLogged?.role === "ADMIN" || userLogged?.role === roleRequired;

  if (userLogged && !hasAccess) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
