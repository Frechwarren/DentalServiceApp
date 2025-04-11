"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authUser } from "@/lib/userAuthentication";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({
  role: "",
  userId: "",
});

export default function AuthProvider({ children }) {
  const router = useRouter();
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticatedUser = await authUser();
      setUserToken(authenticatedUser);
      if (authenticatedUser) {
        if (authenticatedUser.role === "Admin") {
          router.push(`/admin`);
        } else {
          router.push("/dashboard");
        }
      } else {
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  const value = {
    role: userToken?.role,
    userId: userToken?.userId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserAuthContext = () => useContext(AuthContext);
