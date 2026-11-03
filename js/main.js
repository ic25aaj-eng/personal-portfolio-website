"use strict";
document.documentElement.classList.add("js");
const toggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const closeMenu = () => { toggle.setAttribute("aria-expanded", "false"); navigation.classList.remove("is-open"); };
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { closeMenu(); toggle.focus(); }
});
navigation.addEventListener("click", event => { if (event.target.closest("a")) closeMenu(); });
window.matchMedia("(min-width: 701px)").addEventListener("change", closeMenu);
const form = document.querySelector("#contact-form");
if (form) {
  form.noValidate = true;
  const fields = [...form.querySelectorAll("input, textarea")];
  const status = document.querySelector("#form-status");
  const validate = field => {
    let message = "";
    if (!field.value.trim()) message = `Please enter ${field.id === "name" ? "your name" : field.id === "email" ? "your email address" : "a message"}.`;
    else if (field.validity.typeMismatch) message = "Enter an email address such as name@example.com.";
    else if (!field.validity.valid) message = field.validationMessage;
    field.setAttribute("aria-invalid", String(Boolean(message)));
    document.querySelector(`#${field.id}-error`).textContent = message;
    return !message;
  };
  fields.forEach(field => field.addEventListener("input", () => {
    status.textContent = "";
    if (field.getAttribute("aria-invalid") === "true") validate(field);
  }));
  form.addEventListener("submit", event => {
    event.preventDefault();
    const results = fields.map(validate);
    if (results.includes(false)) {
      status.textContent = "Please correct the highlighted fields and try again.";
      fields[results.indexOf(false)].focus(); return;
    }
    status.textContent = "Your demo message is complete. Nothing has been sent or saved. Use the email link to send your enquiry. Your text remains here so you can copy it.";
  });
}
