// components/layouts/PrivateRoute.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = document.cookie.includes("token=");
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <>{children}</>;
}
