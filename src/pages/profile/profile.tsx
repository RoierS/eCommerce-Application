import { Navigate } from "react-router-dom";

const Profile = () => {
  const hasToken = localStorage.getItem("tokenObject");

  if (!hasToken) {
    return <Navigate to="/login" />;
  }
  return <h1>Profile page</h1>;
};

export default Profile;
