"use strict";

// Global country object to store location data
window.userLocation = {
  country: null,
  countryCode: null,
  region: null,
  city: null,
  displayText: "Detecting location...",
  isLoading: true
};

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

    // Store location data globally
    window.userLocation = {
      country: data.country_name || null,
      countryCode: data.country_code || null,
      region: data.region || null,
      city: data.city || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      timezone: data.timezone || null,
      displayText: "",
      isLoading: false
    };

    // Build display text
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

    window.userLocation.displayText = location;
    locationElement.textContent = location;

    // Dispatch custom event so other scripts can react to location data
    document.dispatchEvent(
      new CustomEvent("locationDetected", {
        detail: window.userLocation
      })
    );

    console.log("Location detected:", window.userLocation);

  } catch (error) {
    console.error("Location error:", error);

    window.userLocation.displayText = "Location unavailable";
    window.userLocation.isLoading = false;
    locationElement.textContent = "Location unavailable";

    // Dispatch error event
    document.dispatchEvent(
      new CustomEvent("locationError", {
        detail: { error: error.message }
      })
    );
  }
}

getUserLocation();
