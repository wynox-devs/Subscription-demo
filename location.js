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

// Country list for dropdown menu
const COUNTRY_LIST = [
  { code: "US", name: "United States (USD)" },
  // Europe
  { code: "DE", name: "Germany (EUR)" },
  { code: "FR", name: "France (EUR)" },
  { code: "GB", name: "United Kingdom (GBP)" },
  { code: "IT", name: "Italy (EUR)" },
  { code: "ES", name: "Spain (EUR)" },
  { code: "NL", name: "Netherlands (EUR)" },
  { code: "BE", name: "Belgium (EUR)" },
  { code: "CH", name: "Switzerland (CHF)" },
  { code: "AT", name: "Austria (EUR)" },
  { code: "PL", name: "Poland (PLN)" },
  { code: "SE", name: "Sweden (SEK)" },
  { code: "NO", name: "Norway (NOK)" },
  // Asia-Pacific
  { code: "JP", name: "Japan (JPY)" },
  { code: "CN", name: "China (CNY)" },
  { code: "IN", name: "India (INR)" },
  { code: "AU", name: "Australia (AUD)" },
  { code: "SG", name: "Singapore (SGD)" },
  { code: "NZ", name: "New Zealand (NZD)" },
  { code: "KR", name: "South Korea (KRW)" },
  // Americas
  { code: "CA", name: "Canada (CAD)" },
  { code: "MX", name: "Mexico (MXN)" },
  { code: "BR", name: "Brazil (BRL)" },
  // Middle East & Africa
  { code: "AE", name: "United Arab Emirates (AED)" },
  { code: "SA", name: "Saudi Arabia (SAR)" },
  { code: "ZA", name: "South Africa (ZAR)" }
];

// Global location object
window.userLocation = {
  country: null,
  countryCode: null,
  timezone: null,
  displayText: "Please select your region",
  pricing: null,
  isLoading: false,
  error: null,
  manuallySelected: false
};

/**
 * Set user location from manual selection
 */
function setUserLocation(countryCode) {
  try {
    if (!COUNTRY_PRICING[countryCode]) {
      countryCode = "US";
    }

    const countryData = COUNTRY_LIST.find(c => c.code === countryCode);
    const countryName = countryData ? countryData.name.split(" (")[0] : "United States";
    const pricing = COUNTRY_PRICING[countryCode] || COUNTRY_PRICING.default;

    // Update global location object
    window.userLocation = {
      country: countryName,
      countryCode: countryCode,
      timezone: null,
      displayText: `${countryName} (${pricing.symbol})`,
      pricing: pricing,
      isLoading: false,
      error: null,
      manuallySelected: true
    };

    // Save to localStorage
    localStorage.setItem("selectedCountry", countryCode);

    // Update UI
    updateLocationDisplay();
    updateRegionSelector();

    // Dispatch event for pricing update
    document.dispatchEvent(
      new CustomEvent("locationReady", {
        detail: window.userLocation
      })
    );

    console.log("✓ Region selected:", window.userLocation);

  } catch (error) {
    console.error("✗ Location selection error:", error);
    window.userLocation.error = error.message;
  }
}

/**
 * Initialize user location from localStorage or default
 */
function initializeUserLocation() {
  try {
    let countryCode = localStorage.getItem("selectedCountry") || "US";
    setUserLocation(countryCode);
  } catch (error) {
    console.error("✗ Location initialization error:", error);
    setUserLocation("US");
  }
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
 * Create and update region selector menu
 */
function createRegionSelector() {
  let selectorContainer = document.getElementById("region-selector-container");
  
  if (!selectorContainer) {
    selectorContainer = document.createElement("div");
    selectorContainer.id = "region-selector-container";
    selectorContainer.style.cssText = `
      padding: 20px;
      margin: 20px 0;
      background-color: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #ddd;
    `;
    
    const label = document.createElement("label");
    label.htmlFor = "country-selector";
    label.style.cssText = `
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
      color: #333;
    `;
    label.textContent = "Select Your Region:";
    
    const select = document.createElement("select");
    select.id = "country-selector";
    select.style.cssText = `
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
    `;
    
    // Add options
    COUNTRY_LIST.forEach(country => {
      const option = document.createElement("option");
      option.value = country.code;
      option.textContent = country.name;
      select.appendChild(option);
    });
    
    // Add change event listener
    select.addEventListener("change", (e) => {
      setUserLocation(e.target.value);
    });
    
    selectorContainer.appendChild(label);
    selectorContainer.appendChild(select);
    
    // Find insertion point - after user-location element or at the beginning of body
    const locationElement = document.getElementById("user-location");
    if (locationElement) {
      locationElement.parentNode.insertBefore(selectorContainer, locationElement.nextSibling);
    } else {
      document.body.insertBefore(selectorContainer, document.body.firstChild);
    }
  }
  
  updateRegionSelector();
}

/**
 * Update region selector to reflect current selection
 */
function updateRegionSelector() {
  const selector = document.getElementById("country-selector");
  if (selector) {
    selector.value = window.userLocation.countryCode || "US";
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

/**
 * Get all countries for external use
 */
window.getCountryList = function() {
  return COUNTRY_LIST;
};

// Initialize location from localStorage
initializeUserLocation();

// Create region selector when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", createRegionSelector);
} else {
  createRegionSelector();
}
