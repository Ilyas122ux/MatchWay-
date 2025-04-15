// Données des excursions
const excursions = [
  {
    id: 1,
    title: "Tour de la ville historique",
    location: "Marrakech, Maroc",
    description:
      "Découvrez les souks colorés, les palais et les jardins de la ville impériale.",
    duration: "4 heures",
    features: ["Guide local", "Transport inclus", "Entrées incluses"],
    price: 45,
    image: "../images/excursions/marrakech-tour.jpg",
    country: "maroc",
  },
  {
    id: 2,
    title: "Safari dans le désert",
    location: "Désert du Sahara, Maroc",
    description: "Une aventure inoubliable dans les dunes dorées du Sahara.",
    duration: "2 jours",
    features: [
      "Nuit sous les étoiles",
      "Chameaux inclus",
      "Repas traditionnels",
    ],
    price: 150,
    image: "../images/excursions/sahara-safari.jpg",
    country: "maroc",
  },
  {
    id: 3,
    title: "Visite des médinas",
    location: "Fès, Maroc",
    description:
      "Explorez la plus grande zone piétonne au monde et ses artisans traditionnels.",
    duration: "6 heures",
    features: ["Guide expert", "Dégustation de thé", "Artisanat local"],
    price: 35,
    image: "../images/excursions/fes-medina.jpg",
    country: "maroc",
  },
];

// Éléments du DOM
const searchForm = document.querySelector(".search-form");
const excursionsGrid = document.querySelector(".excursions-grid");
const paginationContainer = document.querySelector(".pagination");

// État de l'application
let currentPage = 1;
const itemsPerPage = 6;
let filteredExcursions = [...excursions];

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  renderExcursions();
  setupEventListeners();
});

// Configuration des écouteurs d'événements
function setupEventListeners() {
  // Filtrage
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const country = document.querySelector('select[name="country"]').value;
    const type = document.querySelector('select[name="type"]').value;
    const duration = document.querySelector('select[name="duration"]').value;

    filterExcursions(country, type, duration);
  });

  // Pagination
  paginationContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("pagination-btn")) {
      const page = parseInt(e.target.dataset.page);
      if (page && page !== currentPage) {
        currentPage = page;
        renderExcursions();
      }
    }
  });
}

// Filtrage des excursions
function filterExcursions(country, type, duration) {
  filteredExcursions = excursions.filter((excursion) => {
    const countryMatch = country === "all" || excursion.country === country;
    const typeMatch = type === "all" || excursion.type === type;
    const durationMatch =
      duration === "all" || excursion.duration.includes(duration);
    return countryMatch && typeMatch && durationMatch;
  });

  currentPage = 1;
  renderExcursions();
}

// Rendu des excursions
function renderExcursions() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExcursions = filteredExcursions.slice(startIndex, endIndex);

  // Rendu des cartes d'excursion
  excursionsGrid.innerHTML = paginatedExcursions
    .map(
      (excursion) => `
        <div class="excursion-card">
            <div class="excursion-image">
                <img src="${excursion.image}" alt="${excursion.title}">
                <span class="excursion-duration">${excursion.duration}</span>
            </div>
            <div class="excursion-info">
                <h3>${excursion.title}</h3>
                <div class="excursion-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${excursion.location}
                </div>
                <p class="excursion-description">${excursion.description}</p>
                <div class="excursion-features">
                    ${excursion.features
                      .map(
                        (feature) => `
                        <span><i class="fas fa-check"></i>${feature}</span>
                    `
                      )
                      .join("")}
                </div>
                <div class="excursion-price">
                    <span class="price">${excursion.price}€</span>
                    <span class="per-person">/personne</span>
                </div>
                <button class="btn-reserve" onclick="reserveExcursion(${
                  excursion.id
                })">
                    Réserver
                </button>
            </div>
        </div>
    `
    )
    .join("");

  // Rendu de la pagination
  renderPagination();
}

// Rendu de la pagination
function renderPagination() {
  const totalPages = Math.ceil(filteredExcursions.length / itemsPerPage);

  let paginationHTML = `
        <button class="pagination-btn" ${
          currentPage === 1 ? "disabled" : ""
        } data-page="${currentPage - 1}">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
            <button class="pagination-btn ${
              i === currentPage ? "active" : ""
            }" data-page="${i}">
                ${i}
            </button>
        `;
  }

  paginationHTML += `
        <button class="pagination-btn" ${
          currentPage === totalPages ? "disabled" : ""
        } data-page="${currentPage + 1}">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

  paginationContainer.innerHTML = paginationHTML;
}

// Fonction de réservation
function reserveExcursion(excursionId) {
  // Vérifier si l'utilisateur est connecté
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    // Afficher la modal de connexion
    const loginModal = document.getElementById("loginModal");
    if (loginModal) {
      loginModal.style.display = "block";
    }
    return;
  }

  // Rediriger vers la page de réservation
  window.location.href = `reservation.html?excursion=${excursionId}`;
}
