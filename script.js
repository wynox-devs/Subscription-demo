(function () {
  "use strict";

  const elements = document.querySelectorAll(".reveal");

  // Fallback for browsers without IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => {
      element.classList.add("visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
})();
