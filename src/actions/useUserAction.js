import { getUserIdFromCookie } from "@/lib/userData";

export async function signup(formData) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message,
      };
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error signing up:", error);
    throw new Error("Failed to sign up. Please try again.");
  }
}

export async function userLogin(formData) {
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.success === "false") {
      return data;
    }

    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Failed to log in. Please try again.");
  }
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

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error booking service:", error);
    throw new Error(
      error.message || "Failed to book the service. Please try again."
    );
  }
}

export async function getUserId() {
  const userId = await getUserIdFromCookie();
  if (!userId) {
    window.location.href = "/login";
  }
  return userId;
}
