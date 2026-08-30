"use strict";

// Country-based pricing configuration
const COUNTRY_PRICING = {
  // Default pricing (USD)
  default: {
    currency: "USD",
    symbol: "$",
    free: 0,
    student: 1,
    pro: 19,
    family: 25
  },
  // Europe - EUR
  DE: { currency: "EUR", symbol: "€", free: 0, student: 1, pro: 18, family: 24 },
  FR: { currency: "EUR", symbol: "€", free: 0, student: 1, pro: 18, family: 24 },
  GB: { currency: "GBP", symbol: "£", free: 0, student: 1, pro: 15, family: 20 },
  IT: { currency: "EUR", symbol: "€", free: 0, student: 1, pro: 18, family: 24 },
  ES: { currency: "EUR", symbol: "€", free: 0, student: 1, pro: 18, family: 24 },
  NL: { currency: "EUR", symbol: "€", free: 0, student: 1, pro: 18, family: 24 },
  BE: { currency: "EUR", symbol: "€", free: 0, student: 1, pro: 18, family: 24 },
  CH: { currency: "CHF", symbol: "CHF", free: 0, student: 2, pro: 22, family: 28 },
  AT: { currency: "EUR", symbol: "€", free: 0, student: 1, pro: 18, family: 24 },
  PL: { currency: "PLN", symbol: "zł", free: 0, student: 1, pro: 15, family: 20 },
  SE: { currency: "SEK", symbol: "kr", free: 0, student: 1, pro: 16, family: 22 },
  NO: { currency: "NOK", symbol: "kr", free: 0, student: 1, pro: 17, family: 23 },
  
  // Asia-Pacific
  JP: { currency: "JPY", symbol: "¥", free: 0, student: 100, pro: 1900, family: 2500 },
  CN: { currency: "CNY", symbol: "¥", free: 0, student: 7, pro: 128, family: 165 },
  IN: { currency: "INR", symbol: "₹", free: 0, student: 80, pro: 1500, family: 1900 },
  AU: { currency: "AUD", symbol: "$", free: 0, student: 2, pro: 28, family: 37 },
  SG: { currency: "SGD", symbol: "$", free: 0, student: 2, pro: 26, family: 35 },
  NZ: { currency: "NZD", symbol: "$", free: 0, student: 2, pro: 30, family: 39 },
  KR: { currency: "KRW", symbol: "₩", free: 0, student: 1200, pro: 22000, family: 29000 },
  
  // Americas
  CA: { currency: "CAD", symbol: "$", free: 0, student: 1.5, pro: 22, family: 29 },
  MX: { currency: "MXN", symbol: "$", free: 0, student: 20, pro: 350, family: 450 },
  BR: { currency: "BRL", symbol: "R$", free: 0, student: 5, pro: 95, family: 125 },
  
  // Middle East & Africa
  AE: { currency: "AED", symbol: "د.إ", free: 0, student: 4, pro: 70, family: 90 },
  SA: { currency: "SAR", symbol: "﷼", free: 0, student: 4, pro: 70, family: 90 },
  ZA: { currency: "ZAR", symbol: "R", free: 0, student: 15, pro: 280, family: 360 }
};

// Global location object
window.userLocation = {
  country: null,
  countryCode: null,
  region: null,
  city: null,
  latitude: null,
  longitude: null,
  timezone: null,
  displayText: "Detecting location...",
  pricing: null,
  isLoading: true,
  error: null
};

/**
 * Fetch user location from IP
 */
async function getUserLocation() {
  try {
    const response = await fetch("https://ipapi.co/json/");

    if (!response.ok) {
      throw new Error("Failed to fetch location data");
    }

    const data = await response.json();

    // Extract country code
    const countryCode = data.country_code || null;

    // Get pricing for this country
    const pricing = COUNTRY_PRICING[countryCode] || COUNTRY_PRICING.default;

    // Update global location object
    window.userLocation = {
      country: data.country_name || null,
      countryCode: countryCode,
      region: data.region || null,
      city: data.city || null,
      latitude: data.latitude || null,
      longitude: data.longitude || null,
      timezone: data.timezone || null,
      displayText: formatLocationDisplay(data),
      pricing: pricing,
      isLoading: false,
      error: null
    };

    // Update UI
    updateLocationDisplay();
    
    // Dispatch event for pricing update
    document.dispatchEvent(
      new CustomEvent("locationReady", {
        detail: window.userLocation
      })
    );

    console.log("✓ Location detected:", window.userLocation);

  } catch (error) {
    console.error("✗ Location error:", error);

    window.userLocation = {
      ...window.userLocation,
      pricing: COUNTRY_PRICING.default,
      displayText: "Location unavailable",
      isLoading: false,
      error: error.message
    };

    updateLocationDisplay();

    document.dispatchEvent(
      new CustomEvent("locationError", {
        detail: { error: error.message }
      })
    );
  }
}

/**
 * Format location display text
 */
function formatLocationDisplay(data) {
  const city = data.city || "";
  const region = data.region || "";
  const country = data.country_name || "";

  if (city && country) {
    return `${city}, ${country}`;
  } else if (region && country) {
    return `${region}, ${country}`;
  } else if (country) {
    return country;
  }
  return "Location unavailable";
}

/**
 * Update location display in DOM
 */
function updateLocationDisplay() {
  const locationElement = document.getElementById("user-location");
  if (locationElement) {
    locationElement.textContent = window.userLocation.displayText;
  }
}

/**
 * Get pricing for a specific plan
 */
window.getPricing = function(plan) {
  if (!window.userLocation.pricing) {
    return COUNTRY_PRICING.default[plan] || 0;
  }
  return window.userLocation.pricing[plan] || 0;
};

/**
 * Get current currency symbol
 */
window.getCurrency = function() {
  if (!window.userLocation.pricing) {
    return COUNTRY_PRICING.default.symbol;
  }
  return window.userLocation.pricing.symbol;
};

/**
 * Get full currency info
 */
window.getCurrencyInfo = function() {
  return window.userLocation.pricing || COUNTRY_PRICING.default;
};

// Initialize location detection
getUserLocation();
