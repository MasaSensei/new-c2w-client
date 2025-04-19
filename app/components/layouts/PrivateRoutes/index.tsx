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
        const res = await AuthService.checkAuth();
        console.log(res);
        // if (!res.ok) {
        //   navigate("/login", { replace: true });
        // }
      } catch (err) {
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
