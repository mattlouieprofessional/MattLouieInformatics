document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Reveal Elements on Scroll ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optionally stop observing once revealed
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.15, // Trigger when 15% of section enters viewport
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- 2. Interactive Accordion (Click-to-Open Details) ---
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isExpanded = header.getAttribute("aria-expanded") === "true";

      // Toggle aria state and active class
      header.setAttribute("aria-expanded", !isExpanded);
      header.classList.toggle("active");

      if (!isExpanded) {
        // Expand: scrollHeight sets height dynamically to match child content
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        // Collapse
        content.style.maxHeight = null;
      }
    });
  });
});
