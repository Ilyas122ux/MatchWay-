document.addEventListener("DOMContentLoaded", function () {
  // Date de début de la Coupe du Monde 2030 (à ajuster selon la date exacte)
  const worldCupDate = new Date("2030-06-14T00:00:00");

  function updateCountdown() {
    const now = new Date();
    const difference = worldCupDate - now;

    // Calcul des jours, heures, minutes et secondes
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Mise à jour des éléments HTML
    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    // Animation des nombres
    animateNumber("days", days);
    animateNumber("hours", hours);
    animateNumber("minutes", minutes);
    animateNumber("seconds", seconds);
  }

  function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent);

    if (currentValue !== newValue) {
      element.style.transform = "scale(1.2)";
      element.style.color = "#e63946";

      setTimeout(() => {
        element.style.transform = "scale(1)";
        element.style.color = "#2c3e50";
      }, 200);
    }
  }

  // Mise à jour initiale
  updateCountdown();

  // Mise à jour toutes les secondes
  setInterval(updateCountdown, 1000);
});
