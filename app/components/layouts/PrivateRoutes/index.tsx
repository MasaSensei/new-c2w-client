// components/layouts/PrivateRoute.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/stores/useAuth";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  // const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { token, user } = useAuth.getState();
        if (!token || !user) {
          navigate("/login", { replace: true });
          return;
        }
      } catch (err) {
        console.error("Auth error:", err);
        navigate("/login", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  // if (checking) return <div>Loading...</div>; // atau spinner

  return <>{children}</>;
}
