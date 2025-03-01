import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />; //  Redirect to Unauthorized
  }

  return children;
};

export default ProtectedRoute;
