export async function bookService(bookingData) {
  try {
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
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

export async function getBookedSchedule(userId) {
  try {
    const response = await fetch(`/api/booking/${userId}`, {
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
    console.error("Error booking service", error);
    throw new Error(
      error.message || "Failed to book the service. Please try again."
    );
  }
}
