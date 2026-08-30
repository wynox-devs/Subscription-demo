"use strict";
async function getUserLocation() {
  const locationElement = document.getElementById("user-location");
  if (!locationElement) return;
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error("Failed to fetch IP information");
    }
    const data = await response.json();
    if (data.city && data.country_name) {
      locationElement.textContent =
        `${data.city}, ${data.country_name}`;
    } else {
      locationElement.textContent = "Location unavailable";
    }
  } catch (error) {
    console.error("Location error:", error);
    locationElement.textContent = "Location unavailable";
  }
}
getUserLocation();
