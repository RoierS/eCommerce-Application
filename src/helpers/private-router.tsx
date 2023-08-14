import { useEffect, useState } from "react";

import { Outlet, Navigate, useLocation } from "react-router-dom";

const checkAuthorization = () => {
  /**
   * TODO logic
   * const accessToken = localStorage.getItem('access_token');
   *   return !!accessToken;
   */
  return true;
};

const PrivateRoute = () => {
  const path = useLocation();

  const [isAuthorization, setIsAuthorization] = useState(true);

  useEffect(() => {
    setIsAuthorization(checkAuthorization());
  }, [path]);

  return isAuthorization ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
