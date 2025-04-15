document.addEventListener("DOMContentLoaded", function () {
  // Ajouter le bouton du menu mobile
  const navbar = document.querySelector(".navbar");
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.className = "mobile-menu-btn";
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  navbar.insertBefore(mobileMenuBtn, navbar.firstChild);

  // Gérer l'ouverture/fermeture du menu
  const navLinks = document.querySelector(".nav-links");
  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    const icon = this.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Fermer le menu lors du clic sur un lien
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });

  // Fermer le menu lors du redimensionnement de la fenêtre
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navLinks.classList.remove("active");
      const icon = mobileMenuBtn.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});
