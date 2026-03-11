import { createContext, useContext } from "react";
import type { Dispatch, SetStateAction } from "react";

interface AuthContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const authContext = createContext<AuthContext | undefined>(undefined);

authContext.displayName = "AuthContext";

export function useAuthContext(): AuthContext {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

export { authContext };
