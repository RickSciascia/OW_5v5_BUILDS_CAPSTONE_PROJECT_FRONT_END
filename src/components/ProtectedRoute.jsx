import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { userLogged, token } = useSelector((state) => state.auth);

  console.log("CHECK PROTECTED ROUTE: ", { userLogged, token, roleRequired });

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (userLogged && roleRequired && userLogged.role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
