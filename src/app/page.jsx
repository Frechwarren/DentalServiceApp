"use client";

import HomePage from "@/components/homepage/HomePage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authUser } from "@/lib/userAuthentication";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticatedUser = await authUser();
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

  return (
    <div className="w-screen bg-white flex items-center justify-center">
      <HomePage />
    </div>
  );
}
