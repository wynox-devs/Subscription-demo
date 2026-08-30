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

// Timezone to country code mapping
const TIMEZONE_TO_COUNTRY = {
  "Europe/London": "GB",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Madrid": "ES",
  "Europe/Rome": "IT",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Zurich": "CH",
  "Europe/Vienna": "AT",
  "Europe/Warsaw": "PL",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Athens": "GR",
  "Europe/Dublin": "IE",
  "Europe/Prague": "CZ",
  "Europe/Budapest": "HU",
  "Europe/Lisbon": "PT",
  "Europe/Copenhagen": "DK",
  "Asia/Tokyo": "JP",
  "Asia/Shanghai": "CN",
  "Asia/Hong_Kong": "CN",
  "Asia/Kolkata": "IN",
  "Asia/Singapore": "SG",
  "Asia/Seoul": "KR",
  "Asia/Bangkok": "TH",
  "Australia/Sydney": "AU",
  "Pacific/Auckland": "NZ",
  "America/Toronto": "CA",
  "America/Mexico_City": "MX",
  "America/Sao_Paulo": "BR",
  "America/New_York": "US",
  "America/Los_Angeles": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Anchorage": "US",
  "Pacific/Honolulu": "US",
  "Asia/Dubai": "AE",
  "Asia/Riyadh": "SA",
  "Africa/Johannesburg": "ZA"
};

// Global location object
window.userLocation = {
  country: null,
  countryCode: null,
  region: null,
  timezone: null,
  displayText: "Detecting location...",
  pricing: null,
  isLoading: true,
  error: null
};

/**
 * Detect user region from system settings (no IP collection)
 */
function getSystemRegion() {
  try {
    // Get timezone from system
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Get language/region from browser locale
    const locale = navigator.language || navigator.userLanguage || "en-US";
    
    // Extract country code from locale (e.g., "de-DE" -> "DE")
    let countryCode = locale.split("-")[1]?.toUpperCase() || null;
    
    // Try timezone-based country detection if locale doesn't have country code
    if (!countryCode && timezone) {
      countryCode = TIMEZONE_TO_COUNTRY[timezone] || null;
    }
    
    // Fallback to default if no country code found
    if (!countryCode) {
      countryCode = "US";
    }
    
    return {
      countryCode: countryCode,
      timezone: timezone,
      locale: locale
    };
  } catch (error) {
    console.error("✗ System region detection error:", error);
    return {
      countryCode: "US",
      timezone: null,
      locale: "en-US"
    };
  }
}

/**
 * Get country name from country code
 */
function getCountryName(countryCode) {
  try {
    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(countryCode) || null;
  } catch (error) {
    console.error("✗ Could not get country name:", error);
    return null;
  }
}

/**
 * Initialize user location from system settings
 */
function initializeUserLocation() {
  try {
    const regionInfo = getSystemRegion();
    const countryCode = regionInfo.countryCode;
    const countryName = getCountryName(countryCode) || "Unknown";
    
    // Get pricing for this country
    const pricing = COUNTRY_PRICING[countryCode] || COUNTRY_PRICING.default;
    
    // Update global location object
    window.userLocation = {
      country: countryName,
      countryCode: countryCode,
      region: regionInfo.locale,
      timezone: regionInfo.timezone,
      displayText: formatLocationDisplay(countryName, regionInfo.timezone),
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
    
    console.log("✓ Location detected from system:", window.userLocation);
    
  } catch (error) {
    console.error("✗ Location detection error:", error);
    
    window.userLocation = {
      countryCode: "US",
      country: "United States",
      region: null,
      timezone: null,
      displayText: "Location unavailable",
      pricing: COUNTRY_PRICING.default,
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
function formatLocationDisplay(country, timezone) {
  if (country && timezone) {
    return `${country} (${timezone})`;
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

// Initialize location detection from system settings
initializeUserLocation();
