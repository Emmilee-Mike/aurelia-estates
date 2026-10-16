/* ==========================
   AURELIA ESTATES
   Main JavaScript
========================== */

// 1. MOBILE NAVIGATION
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

// 2. PROPERTY FILTERS
const filterButtons = document.querySelectorAll(".filter-btn");
const propertyCards = document.querySelectorAll(".property-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedLocation = button.dataset.location;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;

      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    propertyCards.forEach((card) => {
      const matchesLocation =
        selectedLocation === "all" ||
        card.dataset.location === selectedLocation;

      card.hidden = !matchesLocation;
    });
  });
});

// 3. PROPERTY-SPECIFIC ENQUIRIES
const enquiryButtons = document.querySelectorAll(".property-link");
const propertyInput = document.querySelector("#enquiry-property");

enquiryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const propertyCard = button.closest(".property-card");
    const propertyHeading = propertyCard?.querySelector("h3");

    if (propertyInput && propertyHeading) {
      propertyInput.value = propertyHeading.textContent.trim();
    }
  });
});

// 4. DEMO CONTACT FORM
const enquiryForm = document.querySelector("#property-enquiry-form");
const formMessage = document.querySelector("#form-message");

if (enquiryForm && formMessage) {
  enquiryForm.addEventListener("submit", (event) => {
    // Stop the browser from reloading the page.
    event.preventDefault();

    const formData = new FormData(enquiryForm);

    const enquiry = {
      property: formData.get("property")?.toString().trim(),
      name: formData.get("name")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
    };

    // Extra validation for the demo.
    if (!enquiry.property || !enquiry.name || !enquiry.email) {
      formMessage.textContent = "Please complete all fields before submitting.";

      formMessage.className = "form-message error";
      return;
    }

    // Display demo details in the browser console.
    console.log("Aurelia Estates — Demo Enquiry:", enquiry);

    // Show a success message on the page.
    formMessage.textContent =
      `Thank you, ${enquiry.name}! Your demo enquiry for ` +
      `${enquiry.property} has been recorded for this test.`;

    formMessage.className = "form-message success";

    // Clear the form after the demo submission.
    enquiryForm.reset();
  });
}

/* ==========================
   SCROLL REVEAL ANIMATIONS
========================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for browsers without IntersectionObserver
  revealElements.forEach((element) => {
    element.classList.add("active");
  });
}

console.log("Aurelia Estates website loaded successfully.");
