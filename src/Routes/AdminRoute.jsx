import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Contexts/Context";

const AdminRoute = ({ children, allowedRoles = ["admin"] }) => {
  const { user, loading } = useContext(AuthContext);
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://bhojon-server.vercel.app/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setHasAccess(allowedRoles.includes(data.role));
          setChecking(false);
        })
        .catch(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, [user, allowedRoles]);

  if (loading || checking) {
    return <p className="text-center mt-10">Checking Permission...</p>;
  }

  if (user && hasAccess) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
