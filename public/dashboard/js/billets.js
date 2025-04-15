// Données des billets (à remplacer par des données réelles de l'API)
const billets = [
  {
    id: 1,
    match: "Maroc vs Espagne",
    phase: "Phase de groupes",
    status: "upcoming",
    category: "standard",
    date: "15 juin 2030",
    stadium: "Stade Mohammed V",
    city: "Casablanca",
    numero: "T123456",
    siege: "A12",
    rang: "15",
    image: "../images/matches/maroc-espagne.jpg",
  },
  {
    id: 2,
    match: "Portugal vs France",
    phase: "Quarts de finale",
    status: "upcoming",
    category: "premium",
    date: "3 juillet 2030",
    stadium: "Estádio da Luz",
    city: "Lisbonne",
    numero: "T789012",
    siege: "B05",
    rang: "8",
    image: "../images/matches/portugal-france.jpg",
  },
  {
    id: 3,
    match: "Angleterre vs Italie",
    phase: "Demi-finale",
    status: "upcoming",
    category: "vip",
    date: "8 juillet 2030",
    stadium: "Santiago Bernabéu",
    city: "Madrid",
    numero: "T345678",
    siege: "C03",
    rang: "5",
    image: "../images/matches/angleterre-italie.jpg",
  },
];

// Éléments du DOM
const searchInput = document.querySelector(".header-search input");
const statusFilter = document.querySelector('select[name="status"]');
const categoryFilter = document.querySelector('select[name="category"]');
const ticketsList = document.querySelector(".tickets-list");
const paginationContainer = document.querySelector(".pagination");

// État
let currentPage = 1;
const itemsPerPage = 5;
let filteredBillets = [...billets];

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  renderBillets();
  renderPagination();
});

// Configuration des écouteurs d'événements
function setupEventListeners() {
  searchInput.addEventListener("input", handleSearch);
  statusFilter.addEventListener("change", handleFilters);
  categoryFilter.addEventListener("change", handleFilters);
}

// Gestion de la recherche
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  filterBillets();
  currentPage = 1;
  renderBillets();
  renderPagination();
}

// Gestion des filtres
function handleFilters() {
  filterBillets();
  currentPage = 1;
  renderBillets();
  renderPagination();
}

// Filtrage des billets
function filterBillets() {
  const searchTerm = searchInput.value.toLowerCase();
  const statusValue = statusFilter.value;
  const categoryValue = categoryFilter.value;

  filteredBillets = billets.filter((billet) => {
    const matchSearch =
      billet.match.toLowerCase().includes(searchTerm) ||
      billet.stadium.toLowerCase().includes(searchTerm) ||
      billet.city.toLowerCase().includes(searchTerm);

    const matchStatus = statusValue === "all" || billet.status === statusValue;
    const matchCategory =
      categoryValue === "all" || billet.category === categoryValue;

    return matchSearch && matchStatus && matchCategory;
  });
}

// Rendu des billets
function renderBillets() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const billetsToShow = filteredBillets.slice(startIndex, endIndex);

  ticketsList.innerHTML = billetsToShow
    .map(
      (billet) => `
        <div class="ticket-card">
            <div class="ticket-header">
                <span class="ticket-status ${billet.status}">${getStatusText(
        billet.status
      )}</span>
                <span class="ticket-category ${
                  billet.category
                }">${getCategoryText(billet.category)}</span>
            </div>
            <div class="ticket-content">
                <div class="match-info">
                    <h3>${billet.match}</h3>
                    <p class="date"><i class="fas fa-calendar"></i> ${
                      billet.date
                    }</p>
                    <p class="stadium"><i class="fas fa-map-marker-alt"></i> ${
                      billet.stadium
                    }, ${billet.city}</p>
                </div>
                <div class="ticket-details">
                    <div class="detail-item">
                        <i class="fas fa-ticket-alt"></i>
                        <span>Numéro de billet: ${billet.numero}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-chair"></i>
                        <span>Siège: ${billet.siege}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-layer-group"></i>
                        <span>Rang: ${billet.rang}</span>
                    </div>
                </div>
            </div>
            <div class="ticket-actions">
                <button class="btn-download" onclick="downloadTicket(${
                  billet.id
                })">
                    <i class="fas fa-download"></i> Télécharger
                </button>
                <button class="btn-transfer" onclick="transferTicket(${
                  billet.id
                })">
                    <i class="fas fa-exchange-alt"></i> Transférer
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// Rendu de la pagination
function renderPagination() {
  const totalPages = Math.ceil(filteredBillets.length / itemsPerPage);

  let paginationHTML = `
        <button class="pagination-btn" ${
          currentPage === 1 ? "disabled" : ""
        } onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

  for (let i = 1; i <= totalPages; i++) {
    paginationHTML += `
            <button class="pagination-btn ${
              currentPage === i ? "active" : ""
            }" onclick="changePage(${i})">
                ${i}
            </button>
        `;
  }

  paginationHTML += `
        <button class="pagination-btn" ${
          currentPage === totalPages ? "disabled" : ""
        } onclick="changePage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

  paginationContainer.innerHTML = paginationHTML;
}

// Changement de page
function changePage(page) {
  currentPage = page;
  renderBillets();
  renderPagination();
}

// Téléchargement du billet
function downloadTicket(id) {
  const billet = billets.find((b) => b.id === id);
  if (billet) {
    // Simuler le téléchargement
    alert(
      `Téléchargement du billet ${billet.numero} pour le match ${billet.match}`
    );
  }
}

// Transfert du billet
function transferTicket(id) {
  const billet = billets.find((b) => b.id === id);
  if (billet) {
    // Rediriger vers la page de transfert
    window.location.href = `transfer.html?id=${billet.id}`;
  }
}

// Utilitaires
function getStatusText(status) {
  const statusMap = {
    upcoming: "À venir",
    past: "Passé",
    cancelled: "Annulé",
  };
  return statusMap[status] || status;
}

function getCategoryText(category) {
  const categoryMap = {
    standard: "Standard",
    premium: "Premium",
    vip: "VIP",
  };
  return categoryMap[category] || category;
}
