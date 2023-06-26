import { useNavigate, Outlet } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";

function ProtectedRoutes() {
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null || user === undefined) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      {user ? (
        <Outlet />
      ) : null}
    </>
  );
}

export default ProtectedRoutes;
