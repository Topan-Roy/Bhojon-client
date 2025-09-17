import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Contexts/Context";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/users/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data?.role === "admin");
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

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
