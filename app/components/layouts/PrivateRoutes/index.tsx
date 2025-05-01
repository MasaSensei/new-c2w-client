// components/layouts/PrivateRoute.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthService } from "~/services/auth.service";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await AuthService.checkAuth();
        if (!response) {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        console.error("Auth error:", err);
        navigate("/login", { replace: true });
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (checking) return <div>Loading...</div>; // atau spinner

  return <>{children}</>;
}
