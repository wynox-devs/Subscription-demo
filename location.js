"use strict";

async function getUserLocation() {
  const locationElement = document.getElementById("user-location");

  if (!locationElement) {
    return;
  }

  try {
    const response = await fetch("https://ipapi.co/json/");

    if (!response.ok) {
      throw new Error("Failed to get location");
    }

    const data = await response.json();

    const city = data.city || "";
    const region = data.region || "";
    const country = data.country_name || "";

    let location = "";

    if (city && country) {
      location = `${city}, ${country}`;
    } else if (region && country) {
      location = `${region}, ${country}`;
    } else if (country) {
      location = country;
    } else {
      location = "Location unavailable";
    }

    locationElement.textContent = location;

  } catch (error) {

    console.error("Location error:", error);

    locationElement.textContent = "Location unavailable";
  }
}

getUserLocation();
