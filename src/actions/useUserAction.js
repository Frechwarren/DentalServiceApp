import { getUserIdFromCookie } from "@/lib/userData";
import { useEffect, useState } from "react";

export async function signup(formData) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
}

export async function userLogin(formData) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
}

export async function getUser(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      switch (response.status) {
        case 400:
          throw new Error(
            errorData.message || "Validation error. Please check your input."
          );
        case 401:
          throw new Error("Unauthorized. Please log in to book a service.");
        case 500:
          throw new Error("Internal server error. Please try again later.");
        default:
          throw new Error("An unexpected error occurred. Please try again.");
      }
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error booking service:", error);
    throw new Error(
      error.message || "Failed to book the service. Please try again."
    );
  }
}

export default function getUserId() {
  const [userId, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await getUserIdFromCookie();
      if (!userId) {
        window.location.href = "/login";
      }
      setUser(userId);
    };
    fetchUserData();
  }, []);

  return { userId };
}
