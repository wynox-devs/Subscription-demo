"use strict";

(function () {

  const elements = document.querySelectorAll(".reveal");

  // Browser doesn't support IntersectionObserver
  if (!("IntersectionObserver" in window)) {

    elements.forEach(function (element) {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(

    function (entries) {

      entries.forEach(function (entry) {

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


  elements.forEach(function (element) {
    observer.observe(element);
  });

})();
