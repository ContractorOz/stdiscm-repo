window.addEventListener("DOMContentLoaded", (event) => {
  const button = document.querySelector(".mobile-nav__toggle");
  button.addEventListener("click", (event) => {
    const navItems = document.querySelector(".nav__items");
    navItems.classList.toggle("nav__items--show");
  });
});
