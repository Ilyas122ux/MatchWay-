document.addEventListener("DOMContentLoaded", function () {
  // Gestion du formulaire de recherche
  const searchForm = document.getElementById("restaurant-search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Récupération des valeurs du formulaire
      const city = document.getElementById("city").value;
      const cuisine = document.getElementById("cuisine").value;
      const priceRange = document.getElementById("price-range").value;

      // Simulation d'une recherche de restaurants
      searchRestaurants(city, cuisine, priceRange);
    });
  }

  // Gestion des boutons de réservation
  const reserveButtons = document.querySelectorAll(".btn-reserve");
  reserveButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const restaurantCard = this.closest(".restaurant-card");
      const restaurantName = restaurantCard.querySelector("h3").textContent;
      const restaurantCuisine = restaurantCard.querySelector(
        ".restaurant-cuisine"
      ).textContent;

      // Vérification de la connexion de l'utilisateur
      if (!isUserLoggedIn()) {
        showLoginModal();
        return;
      }

      // Affichage du modal de réservation
      showReservationModal(restaurantName, restaurantCuisine);
    });
  });
});

// Fonction pour simuler la recherche de restaurants
function searchRestaurants(city, cuisine, priceRange) {
  // Ici, vous pouvez ajouter une requête API réelle
  console.log("Recherche de restaurants avec les paramètres:", {
    city,
    cuisine,
    priceRange,
  });

  // Simulation d'un chargement
  showLoadingState();

  // Simulation d'un délai de réponse
  setTimeout(() => {
    hideLoadingState();
    // Mise à jour de l'interface avec les résultats
    updateRestaurantsList();
  }, 1500);
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
function showReservationModal(restaurantName, restaurantCuisine) {
  // Création du modal de réservation
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Réserver une table</h2>
            <div class="reservation-details">
                <p><strong>Restaurant:</strong> ${restaurantName}</p>
                <p><strong>Cuisine:</strong> ${restaurantCuisine}</p>
            </div>
            <form id="reservation-form">
                <div class="form-group">
                    <label for="reservation-date">Date</label>
                    <input type="date" id="reservation-date" required>
                </div>
                <div class="form-group">
                    <label for="reservation-time">Heure</label>
                    <input type="time" id="reservation-time" required>
                </div>
                <div class="form-group">
                    <label for="reservation-guests">Nombre de personnes</label>
                    <select id="reservation-guests" required>
                        <option value="1">1 personne</option>
                        <option value="2">2 personnes</option>
                        <option value="3">3 personnes</option>
                        <option value="4">4 personnes</option>
                        <option value="5">5 personnes</option>
                        <option value="6">6 personnes</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="reservation-notes">Notes spéciales (optionnel)</label>
                    <textarea id="reservation-notes" rows="3"></textarea>
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
  const restaurantsGrid = document.querySelector(".restaurants-grid");
  if (restaurantsGrid) {
    restaurantsGrid.innerHTML =
      '<div class="loading">Recherche en cours...</div>';
  }
}

// Fonction pour masquer l'état de chargement
function hideLoadingState() {
  const loading = document.querySelector(".loading");
  if (loading) {
    loading.remove();
  }
}

// Fonction pour mettre à jour la liste des restaurants
function updateRestaurantsList() {
  // Cette fonction serait appelée après une recherche réussie
  // pour mettre à jour l'affichage des restaurants
  console.log("Mise à jour de la liste des restaurants");
}
