import React, { useState, useMemo, useEffect } from "react";
import { authContext } from "@/contexts/auth-context";

interface Props {
  children: React.ReactElement;
}

export default function AuthProvider(props: Props): React.ReactElement {
  const { children } = props;

  const [isAuth, setIsAuth] = useState<boolean>(Boolean(localStorage.getItem("access")));

  // Sync `isAuth` with `localStorage`
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("access");
      setIsAuth(Boolean(token));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const value = useMemo(() => ({ isAuth, setIsAuth }), [isAuth]);

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}
