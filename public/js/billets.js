// Données des billets
const billets = [
  {
    id: 1,
    match: "Maroc vs Espagne",
    phase: "groupes",
    pays: "maroc",
    categorie: "standard",
    date: "15 juin 2030",
    stade: "Stade Mohammed V",
    ville: "Casablanca",
    prix: 150,
    image: "images/match1.jpg",
  },
  {
    id: 2,
    match: "Portugal vs Maroc",
    phase: "groupes",
    pays: "portugal",
    categorie: "premium",
    date: "20 juin 2030",
    stade: "Estádio da Luz",
    ville: "Lisbonne",
    prix: 250,
    image: "images/match2.jpg",
  },
  {
    id: 3,
    match: "Espagne vs Portugal",
    phase: "huitiemes",
    pays: "espagne",
    categorie: "vip",
    date: "28 juin 2030",
    stade: "Santiago Bernabéu",
    ville: "Madrid",
    prix: 400,
    image: "images/match3.jpg",
  },
  {
    id: 4,
    match: "Quart de finale",
    phase: "quarts",
    pays: "maroc",
    categorie: "standard",
    date: "2 juillet 2030",
    stade: "Grand Stade de Tanger",
    ville: "Tanger",
    prix: 200,
    image: "images/match4.jpg",
  },
  {
    id: 5,
    match: "Demi-finale",
    phase: "demies",
    pays: "espagne",
    categorie: "premium",
    date: "6 juillet 2030",
    stade: "Camp Nou",
    ville: "Barcelone",
    prix: 300,
    image: "images/match5.jpg",
  },
  {
    id: 6,
    match: "Finale",
    phase: "finale",
    pays: "portugal",
    categorie: "vip",
    date: "12 juillet 2030",
    stade: "Estádio do Dragão",
    ville: "Porto",
    prix: 500,
    image: "images/match6.jpg",
  },
];

// Éléments DOM
const billetsGrid = document.querySelector(".billets-grid");
const phaseSelect = document.getElementById("phase");
const paysSelect = document.getElementById("pays");
const categorieSelect = document.getElementById("categorie");
const prevPageBtn = document.querySelector(".prev-page");
const nextPageBtn = document.querySelector(".next-page");
const pageNumbers = document.querySelector(".page-numbers");

// État
let currentPage = 1;
const itemsPerPage = 6;
let filteredBillets = [...billets];

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  renderBillets();
  updatePagination();
});

// Configuration des écouteurs d'événements
function setupEventListeners() {
  phaseSelect.addEventListener("change", filterBillets);
  paysSelect.addEventListener("change", filterBillets);
  categorieSelect.addEventListener("change", filterBillets);
  prevPageBtn.addEventListener("click", () => changePage(currentPage - 1));
  nextPageBtn.addEventListener("click", () => changePage(currentPage + 1));
}

// Filtrage des billets
function filterBillets() {
  const phase = phaseSelect.value;
  const pays = paysSelect.value;
  const categorie = categorieSelect.value;

  filteredBillets = billets.filter((billet) => {
    const phaseMatch = phase === "all" || billet.phase === phase;
    const paysMatch = pays === "all" || billet.pays === pays;
    const categorieMatch =
      categorie === "all" || billet.categorie === categorie;
    return phaseMatch && paysMatch && categorieMatch;
  });

  currentPage = 1;
  renderBillets();
  updatePagination();
}

// Rendu des billets
function renderBillets() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const billetsToShow = filteredBillets.slice(start, end);

  billetsGrid.innerHTML = billetsToShow
    .map(
      (billet) => `
        <div class="billet-card">
            <div class="billet-image">
                <img src="${billet.image}" alt="${billet.match}">
            </div>
            <div class="billet-info">
                <h3>${billet.match}</h3>
                <div class="billet-details">
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span>${billet.date}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${billet.stade}, ${billet.ville}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-ticket-alt"></i>
                        <span>Catégorie ${billet.categorie}</span>
                    </div>
                </div>
                <div class="billet-price">${billet.prix}€</div>
                <a href="#" class="btn-reserve" onclick="reserverBillet(${billet.id})">Réserver</a>
            </div>
        </div>
    `
    )
    .join("");
}

// Mise à jour de la pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredBillets.length / itemsPerPage);

  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages;

  pageNumbers.innerHTML = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map(
      (page) =>
        `<span class="${page === currentPage ? "active" : ""}">${page}</span>`
    )
    .join("");

  document.querySelectorAll(".page-numbers span").forEach((span) => {
    span.addEventListener("click", () =>
      changePage(parseInt(span.textContent))
    );
  });
}

// Changement de page
function changePage(page) {
  const totalPages = Math.ceil(filteredBillets.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderBillets();
    updatePagination();
  }
}

// Réservation de billet
function reserverBillet(billetId) {
  const billet = billets.find((b) => b.id === billetId);
  if (billet) {
    // Redirection vers la page de réservation avec l'ID du billet
    window.location.href = `reservation.html?id=${billetId}`;
  }
}
