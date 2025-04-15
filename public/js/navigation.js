// Gestion de la navigation entre les sections
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner tous les liens de navigation
  const navLinks = document.querySelectorAll('a[href^="#"]');

  // Ajouter un écouteur d'événements à chaque lien
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Obtenir l'ID de la section cible à partir du href
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Faire défiler jusqu'à la section cible avec une animation fluide
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Mettre à jour l'URL sans recharger la page
        history.pushState(null, "", `#${targetId}`);

        // Ajouter une classe active à la section
        document.querySelectorAll("section").forEach((section) => {
          section.classList.remove("active-section");
        });
        targetSection.classList.add("active-section");

        // Mettre à jour la navigation active
        updateActiveNavigation(targetId);
      }
    });
  });

  // Gérer le défilement initial si l'URL contient un hash
  if (window.location.hash) {
    const targetSection = document.getElementById(
      window.location.hash.substring(1)
    );
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        targetSection.classList.add("active-section");
        updateActiveNavigation(window.location.hash.substring(1));
      }, 100);
    }
  }

  // Mettre à jour la navigation active lors du défilement
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 200) {
        currentSection = section.getAttribute("id");
      }
    });

    updateActiveNavigation(currentSection);
  });

  // Fonction pour mettre à jour la navigation active
  function updateActiveNavigation(sectionId) {
    // Mettre à jour les liens de navigation
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${sectionId}`) {
        link.classList.add("active");
      }
    });

    // Mettre à jour les boutons CTA
    document.querySelectorAll(".cta-button").forEach((button) => {
      button.classList.remove("active");
      if (button.getAttribute("href") === `#${sectionId}`) {
        button.classList.add("active");
      }
    });
  }
});
