"use strict";

/**
 * Update all pricing displays based on user location
 */
function updateAllPricing() {
  if (window.userLocation.isLoading) {
    return; // Wait for location to be detected
  }

  const pricingData = window.getCurrencyInfo();
  const symbol = pricingData.symbol;
  const currency = pricingData.currency;

  // Plan pricing map
  const plans = {
    student: pricingData.student,
    pro: pricingData.pro,
    family: pricingData.family
  };

  // Update prices in DOM
  document.querySelectorAll(".card").forEach((card, index) => {
    const priceElement = card.querySelector(".price");
    if (!priceElement) return;

    let planKey = null;
    const title = card.querySelector("h2");

    if (title) {
      const planName = title.textContent.toLowerCase().trim();
      planKey = Object.keys(plans).find(key => key === planName);
    }

    if (planKey && plans[planKey] !== undefined) {
      const price = plans[planKey];
      const amountSpan = priceElement.querySelector(".amount");
      const periodSpan = priceElement.querySelector(".period");

      if (amountSpan) {
        amountSpan.textContent = `${symbol}${price}/`;
      }

      if (periodSpan) {
        periodSpan.textContent = `month (${currency})`;
      }
    }
  });

  console.log(`✓ Pricing updated to ${currency} (${pricingData.country || "Default"})`);
}

/**
 * Listen for location detection and update pricing
 */
document.addEventListener("locationReady", () => {
  updateAllPricing();
});

/**
 * If location is already loaded when this script runs
 */
if (window.userLocation && !window.userLocation.isLoading) {
  // Use setTimeout to ensure DOM is ready
  setTimeout(updateAllPricing, 100);
}
