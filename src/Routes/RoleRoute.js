import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Contexts/Context";

const RoleRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://bhojon-server.vercel.app/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setUserRole(data.role);
          setChecking(false);
        })
        .catch(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, [user]);

  if (loading || checking) {
    return <p className="text-center mt-10">Checking Permission...</p>;
  }

  if (user && allowedRoles.includes(userRole)) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default RoleRoute;
