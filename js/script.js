/* NepalCreates — script.js
   1. Mobile menu  2. Active nav link  3. Footer year  4. Contact form validation */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile menu toggle
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
      toggle.querySelector("i").className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });
  }

  // 2. Highlight the link of the current page
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // 3. Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // 4. Contact form validation
  const form = document.getElementById("contact-form");
  if (form) initContactForm(form);
});

function initContactForm(form) {
  const status = document.getElementById("form-status");

  // One rule per field: returns an error message, or "" if the value is valid
  const rules = {
    name: v => v.trim().length < 2 ? "Please enter your full name." : "",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address, like name@example.com.",
    phone: v => v.trim() === "" || /^\+?[0-9\s-]{7,15}$/.test(v.trim()) ? "" : "Use 7–15 digits. A leading + is allowed.",
    inquiry: v => v === "" ? "Choose the type of inquiry." : "",
    message: v => v.trim().length < 20 ? "Please write at least 20 characters so we understand your request." : ""
  };

  function validateField(input) {
    const message = rules[input.name](input.value);
    const field = input.closest(".field");
    field.classList.toggle("invalid", message !== "");
    field.querySelector(".error-msg").textContent = message;
    input.setAttribute("aria-invalid", message !== "");
    return message === "";
  }

  // Validate when the user leaves a field, and re-check while fixing an error
  form.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("invalid")) validateField(input);
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const inputs = [...form.querySelectorAll("input, select, textarea")];
    const allValid = inputs.map(validateField).every(Boolean);   // map first so every field shows its error

    if (!allValid) {
      status.className = "form-status error";
      status.textContent = "Please fix the highlighted fields and try again.";
      inputs.find(i => i.closest(".field").classList.contains("invalid")).focus();
      return;
    }
    // Frontend demo only: nothing is sent or stored.
    status.className = "form-status success";
    status.textContent = "Thanks! Your details passed validation. This form is a frontend demonstration, so your message was not sent or saved.";
    form.reset();
  });
}
