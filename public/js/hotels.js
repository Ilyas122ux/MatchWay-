document.addEventListener("DOMContentLoaded", function () {
  // Gestion du slider de prix
  const priceRange = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");

  if (priceRange && priceValue) {
    priceRange.addEventListener("input", function () {
      priceValue.textContent = this.value + "€";
    });
  }

  // Gestion du formulaire de recherche
  const searchForm = document.getElementById("hotel-search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Récupération des valeurs du formulaire
      const city = document.getElementById("city").value;
      const checkIn = document.getElementById("check-in").value;
      const checkOut = document.getElementById("check-out").value;
      const guests = document.getElementById("guests").value;

      // Validation des dates
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const today = new Date();

      if (checkInDate < today) {
        alert("La date d'arrivée ne peut pas être dans le passé");
        return;
      }

      if (checkOutDate <= checkInDate) {
        alert("La date de départ doit être postérieure à la date d'arrivée");
        return;
      }

      // Simulation d'une recherche d'hôtels
      searchHotels(city, checkIn, checkOut, guests);
    });
  }

  // Gestion des filtres
  const filterInputs = document.querySelectorAll(".filters-container input");
  filterInputs.forEach((input) => {
    input.addEventListener("change", function () {
      applyFilters();
    });
  });

  // Gestion des boutons de réservation
  const reserveButtons = document.querySelectorAll(".btn-reserve");
  reserveButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const hotelCard = this.closest(".hotel-card");
      const hotelName = hotelCard.querySelector("h3").textContent;
      const hotelPrice = hotelCard.querySelector(".price").textContent;

      // Vérification de la connexion de l'utilisateur
      if (!isUserLoggedIn()) {
        showLoginModal();
        return;
      }

      // Simulation d'une réservation
      showReservationModal(hotelName, hotelPrice);
    });
  });
});

// Fonction pour simuler la recherche d'hôtels
function searchHotels(city, checkIn, checkOut, guests) {
  // Ici, vous pouvez ajouter une requête API réelle
  console.log("Recherche d'hôtels avec les paramètres:", {
    city,
    checkIn,
    checkOut,
    guests,
  });

  // Simulation d'un chargement
  showLoadingState();

  // Simulation d'un délai de réponse
  setTimeout(() => {
    hideLoadingState();
    // Mise à jour de l'interface avec les résultats
    updateHotelsList();
  }, 1500);
}

// Fonction pour appliquer les filtres
function applyFilters() {
  const priceRange = document.getElementById("price-range").value;
  const selectedStars = Array.from(
    document.querySelectorAll(".star-filter input:checked")
  ).map((input) => input.value);
  const selectedServices = Array.from(
    document.querySelectorAll(".services-filter input:checked")
  ).map((input) => input.value);

  // Filtrage des hôtels affichés
  const hotelCards = document.querySelectorAll(".hotel-card");
  hotelCards.forEach((card) => {
    const price = parseInt(card.querySelector(".price").textContent);
    const stars = card.querySelectorAll(".hotel-rating .fas.fa-star").length;
    const services = Array.from(
      card.querySelectorAll(".hotel-features span")
    ).map((span) => span.textContent.trim().toLowerCase());

    const matchesPrice = price <= priceRange;
    const matchesStars =
      selectedStars.length === 0 || selectedStars.includes(stars.toString());
    const matchesServices =
      selectedServices.length === 0 ||
      selectedServices.every((service) => services.includes(service));

    card.style.display =
      matchesPrice && matchesStars && matchesServices ? "block" : "none";
  });
}

// Fonction pour vérifier si l'utilisateur est connecté
function isUserLoggedIn() {
  // À implémenter avec votre système d'authentification
  return false;
}

// Fonction pour afficher le modal de connexion
function showLoginModal() {
  const loginModal = document.getElementById("login-modal");
  if (loginModal) {
    loginModal.style.display = "block";
  }
}

// Fonction pour afficher le modal de réservation
function showReservationModal(hotelName, hotelPrice) {
  // Création du modal de réservation
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Confirmer la réservation</h2>
            <div class="reservation-details">
                <p><strong>Hôtel:</strong> ${hotelName}</p>
                <p><strong>Prix par nuit:</strong> ${hotelPrice}</p>
            </div>
            <form id="reservation-form">
                <div class="form-group">
                    <label for="reservation-check-in">Date d'arrivée</label>
                    <input type="date" id="reservation-check-in" required>
                </div>
                <div class="form-group">
                    <label for="reservation-check-out">Date de départ</label>
                    <input type="date" id="reservation-check-out" required>
                </div>
                <div class="form-group">
                    <label for="reservation-guests">Nombre de personnes</label>
                    <select id="reservation-guests" required>
                        <option value="1">1 personne</option>
                        <option value="2">2 personnes</option>
                        <option value="3">3 personnes</option>
                        <option value="4">4 personnes</option>
                    </select>
                </div>
                <button type="submit" class="btn-confirm">Confirmer la réservation</button>
            </form>
        </div>
    `;

  document.body.appendChild(modal);

  // Gestion de la fermeture du modal
  const closeBtn = modal.querySelector(".close");
  closeBtn.onclick = function () {
    modal.remove();
  };

  // Gestion de la soumission du formulaire
  const form = modal.querySelector("#reservation-form");
  form.onsubmit = function (e) {
    e.preventDefault();
    // Simulation de la réservation
    alert("Réservation confirmée !");
    modal.remove();
  };
}

// Fonction pour afficher l'état de chargement
function showLoadingState() {
  const hotelsGrid = document.querySelector(".hotels-grid");
  if (hotelsGrid) {
    hotelsGrid.innerHTML = '<div class="loading">Recherche en cours...</div>';
  }
}

// Fonction pour masquer l'état de chargement
function hideLoadingState() {
  const loading = document.querySelector(".loading");
  if (loading) {
    loading.remove();
  }
}

// Fonction pour mettre à jour la liste des hôtels
function updateHotelsList() {
  // Cette fonction serait appelée après une recherche réussie
  // pour mettre à jour l'affichage des hôtels
  console.log("Mise à jour de la liste des hôtels");
}
