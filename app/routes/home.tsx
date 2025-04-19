// routes/index.tsx (untuk "/")
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = document.cookie.includes("token=");
    navigate(hasToken ? "/material-inventory" : "/login", { replace: true });
  }, [navigate]);

  return null;
}
