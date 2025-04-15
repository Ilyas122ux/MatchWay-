document.addEventListener("DOMContentLoaded", function () {
  // Gestion des onglets
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Retirer la classe active de tous les boutons et contenus
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Ajouter la classe active au bouton cliqué et au contenu correspondant
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");

      // Afficher les données correspondantes
      if (tabId === "flights") {
        displayFlightData();
      } else if (tabId === "trains") {
        displayTrainData();
      } else if (tabId === "buses") {
        displayBusData();
      }
    });
  });

  // Gestion du formulaire de recherche de vols
  const flightSearchForm = document.getElementById("flight-search-form");
  if (flightSearchForm) {
    flightSearchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      searchFlights();
    });
  }

  // Validation des dates
  const departureDateInput = document.getElementById("departure-date");
  const returnDateInput = document.getElementById("return-date");

  if (departureDateInput && returnDateInput) {
    // Définir la date minimale à aujourd'hui
    const today = new Date().toISOString().split("T")[0];
    departureDateInput.min = today;

    departureDateInput.addEventListener("change", function () {
      // La date de retour doit être après la date de départ
      returnDateInput.min = this.value;
    });
  }

  // Empêcher la sélection de la même ville pour le départ et l'arrivée
  const departureSelect = document.getElementById("departure");
  const arrivalSelect = document.getElementById("arrival");

  if (departureSelect && arrivalSelect) {
    departureSelect.addEventListener("change", function () {
      Array.from(arrivalSelect.options).forEach((option) => {
        option.disabled = option.value === this.value && option.value !== "";
      });
    });

    arrivalSelect.addEventListener("change", function () {
      Array.from(departureSelect.options).forEach((option) => {
        option.disabled = option.value === this.value && option.value !== "";
      });
    });
  }

  // Afficher les données de vols par défaut
  displayFlightData();
});

// Données de transport
const transportData = {
  flights: [
    {
      airline: "Royal Air Maroc",
      flightNumber: "AT123",
      departure: "Casablanca",
      arrival: "Madrid",
      departureTime: "08:00",
      arrivalTime: "10:30",
      price: 250,
      class: "Économique",
      image: "images/transport/ram.jpg",
    },
    {
      airline: "Iberia",
      flightNumber: "IB456",
      departure: "Madrid",
      arrival: "Barcelone",
      departureTime: "14:30",
      arrivalTime: "15:45",
      price: 120,
      class: "Économique",
      image: "images/transport/iberia.jpg",
    },
    {
      airline: "TAP Portugal",
      flightNumber: "TP789",
      departure: "Lisbonne",
      arrival: "Porto",
      departureTime: "19:45",
      arrivalTime: "20:30",
      price: 80,
      class: "Économique",
      image: "images/transport/tap.jpg",
    },
    {
      airline: "Royal Air Maroc",
      flightNumber: "AT124",
      departure: "Rabat",
      arrival: "Barcelone",
      departureTime: "09:15",
      arrivalTime: "11:45",
      price: 280,
      class: "Affaires",
      image: "images/transport/ram.jpg",
    },
    {
      airline: "Iberia",
      flightNumber: "IB457",
      departure: "Barcelone",
      arrival: "Lisbonne",
      departureTime: "16:00",
      arrivalTime: "17:30",
      price: 150,
      class: "Économique",
      image: "images/transport/iberia.jpg",
    },
    {
      airline: "TAP Portugal",
      flightNumber: "TP790",
      departure: "Porto",
      arrival: "Madrid",
      departureTime: "10:30",
      arrivalTime: "12:00",
      price: 130,
      class: "Économique",
      image: "images/transport/tap.jpg",
    },
  ],
  trains: [
    {
      operator: "Renfe",
      trainNumber: "AVE123",
      departure: "Madrid",
      arrival: "Barcelone",
      departureTime: "08:00",
      arrivalTime: "10:30",
      price: 120,
      class: "Standard",
      image: "images/transport/renfe.jpg",
    },
    {
      operator: "CP",
      trainNumber: "CP456",
      departure: "Lisbonne",
      arrival: "Porto",
      departureTime: "09:15",
      arrivalTime: "11:45",
      price: 35,
      class: "Standard",
      image: "images/transport/cp.jpg",
    },
    {
      operator: "ONCF",
      trainNumber: "ONCF789",
      departure: "Casablanca",
      arrival: "Rabat",
      departureTime: "10:30",
      arrivalTime: "11:30",
      price: 25,
      class: "Standard",
      image: "images/transport/oncf.jpg",
    },
    {
      operator: "Renfe",
      trainNumber: "AVE124",
      departure: "Barcelone",
      arrival: "Madrid",
      departureTime: "14:00",
      arrivalTime: "16:30",
      price: 120,
      class: "Premium",
      image: "images/transport/renfe.jpg",
    },
    {
      operator: "CP",
      trainNumber: "CP457",
      departure: "Porto",
      arrival: "Lisbonne",
      departureTime: "15:30",
      arrivalTime: "18:00",
      price: 35,
      class: "Standard",
      image: "images/transport/cp.jpg",
    },
    {
      operator: "ONCF",
      trainNumber: "ONCF790",
      departure: "Rabat",
      arrival: "Marrakech",
      departureTime: "16:45",
      arrivalTime: "19:15",
      price: 45,
      class: "Standard",
      image: "images/transport/oncf.jpg",
    },
  ],
  buses: [
    {
      operator: "ALSA",
      busNumber: "AL123",
      departure: "Madrid",
      arrival: "Barcelone",
      departureTime: "08:00",
      arrivalTime: "12:00",
      price: 45,
      class: "Standard",
      image: "images/transport/alsa.jpg",
    },
    {
      operator: "Rede Expressos",
      busNumber: "RE456",
      departure: "Lisbonne",
      arrival: "Porto",
      departureTime: "09:30",
      arrivalTime: "11:30",
      price: 20,
      class: "Standard",
      image: "images/transport/rede.jpg",
    },
    {
      operator: "CTM",
      busNumber: "CTM789",
      departure: "Casablanca",
      arrival: "Marrakech",
      departureTime: "10:00",
      arrivalTime: "13:00",
      price: 15,
      class: "Standard",
      image: "images/transport/ctm.jpg",
    },
    {
      operator: "ALSA",
      busNumber: "AL124",
      departure: "Barcelone",
      arrival: "Madrid",
      departureTime: "14:00",
      arrivalTime: "18:00",
      price: 45,
      class: "Premium",
      image: "images/transport/alsa.jpg",
    },
    {
      operator: "Rede Expressos",
      busNumber: "RE457",
      departure: "Porto",
      arrival: "Lisbonne",
      departureTime: "15:30",
      arrivalTime: "17:30",
      price: 20,
      class: "Standard",
      image: "images/transport/rede.jpg",
    },
    {
      operator: "CTM",
      busNumber: "CTM790",
      departure: "Rabat",
      arrival: "Casablanca",
      departureTime: "16:00",
      arrivalTime: "17:00",
      price: 10,
      class: "Standard",
      image: "images/transport/ctm.jpg",
    },
  ],
};

// Fonction pour afficher les données de vols
function displayFlightData() {
  const flightCardsContainer = document.querySelector("#flights .flight-cards");
  if (!flightCardsContainer) return;

  flightCardsContainer.innerHTML = "";

  transportData.flights.forEach((flight) => {
    const flightCard = document.createElement("div");
    flightCard.className = "flight-card";
    flightCard.innerHTML = `
      <div class="flight-header">
        <img src="${flight.image}" alt="${flight.airline}" class="airline-logo">
        <div class="flight-info">
          <span class="airline">${flight.airline}</span>
          <span class="flight-number">${flight.flightNumber}</span>
        </div>
      </div>
      <div class="flight-details">
        <div class="time-details">
          <div class="departure">
            <span class="time">${flight.departureTime}</span>
            <span class="city">${flight.departure}</span>
          </div>
          <div class="duration">
            <i class="fas fa-plane"></i>
            <span>2h 30m</span>
          </div>
          <div class="arrival">
            <span class="time">${flight.arrivalTime}</span>
            <span class="city">${flight.arrival}</span>
          </div>
        </div>
        <div class="price-details">
          <span class="price">${flight.price}€</span>
          <span class="per-person">par personne</span>
          <span class="class">${flight.class}</span>
        </div>
      </div>
      <button class="btn-book-flight">Réserver</button>
    `;

    flightCardsContainer.appendChild(flightCard);
  });

  // Ajouter les gestionnaires d'événements pour les boutons de réservation
  document.querySelectorAll(".btn-book-flight").forEach((button) => {
    button.addEventListener("click", function () {
      showBookingInterface("flight");
    });
  });
}

// Fonction pour afficher les données de trains
function displayTrainData() {
  const trainsTab = document.getElementById("trains");
  if (!trainsTab) return;

  // Créer le contenu pour les trains s'il n'existe pas
  if (!trainsTab.querySelector(".search-form")) {
    trainsTab.innerHTML = `
      <div class="search-form">
        <form id="train-search-form">
          <div class="form-row">
            <div class="form-group">
              <label for="train-departure">Départ</label>
              <select id="train-departure" name="train-departure" required>
                <option value="">Sélectionnez une ville</option>
                <option value="casablanca">Casablanca</option>
                <option value="rabat">Rabat</option>
                <option value="marrakech">Marrakech</option>
                <option value="madrid">Madrid</option>
                <option value="barcelona">Barcelone</option>
                <option value="lisbonne">Lisbonne</option>
                <option value="porto">Porto</option>
              </select>
            </div>
            <div class="form-group">
              <label for="train-arrival">Arrivée</label>
              <select id="train-arrival" name="train-arrival" required>
                <option value="">Sélectionnez une ville</option>
                <option value="casablanca">Casablanca</option>
                <option value="rabat">Rabat</option>
                <option value="marrakech">Marrakech</option>
                <option value="madrid">Madrid</option>
                <option value="barcelona">Barcelone</option>
                <option value="lisbonne">Lisbonne</option>
                <option value="porto">Porto</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="train-date">Date</label>
              <input type="date" id="train-date" name="train-date" required />
            </div>
            <div class="form-group">
              <label for="train-passengers">Passagers</label>
              <select id="train-passengers" name="train-passengers" required>
                <option value="1">1 passager</option>
                <option value="2">2 passagers</option>
                <option value="3">3 passagers</option>
                <option value="4">4 passagers</option>
                <option value="5">5 passagers</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn-search">Rechercher des trains</button>
        </form>
      </div>
      <div class="train-results">
        <h3>Trains disponibles</h3>
        <div class="train-cards">
          <!-- Les résultats des trains seront ajoutés dynamiquement via JavaScript -->
        </div>
      </div>
    `;

    // Ajouter l'écouteur d'événements pour le formulaire de recherche de trains
    const trainSearchForm = document.getElementById("train-search-form");
    if (trainSearchForm) {
      trainSearchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        searchTrains();
      });
    }
  }

  // Afficher les données de trains
  const trainCardsContainer = document.querySelector("#trains .train-cards");
  if (!trainCardsContainer) return;

  trainCardsContainer.innerHTML = "";

  transportData.trains.forEach((train) => {
    const trainCard = document.createElement("div");
    trainCard.className = "train-card";
    trainCard.innerHTML = `
      <div class="train-header">
        <img src="${train.image}" alt="${train.operator}" class="operator-logo">
        <div class="train-info">
          <span class="operator">${train.operator}</span>
          <span class="train-number">${train.trainNumber}</span>
        </div>
      </div>
      <div class="train-details">
        <div class="time-details">
          <div class="departure">
            <span class="time">${train.departureTime}</span>
            <span class="city">${train.departure}</span>
          </div>
          <div class="duration">
            <i class="fas fa-train"></i>
            <span>2h 30m</span>
          </div>
          <div class="arrival">
            <span class="time">${train.arrivalTime}</span>
            <span class="city">${train.arrival}</span>
          </div>
        </div>
        <div class="price-details">
          <span class="price">${train.price}€</span>
          <span class="per-person">par personne</span>
          <span class="class">${train.class}</span>
        </div>
      </div>
      <button class="btn-book-train">Réserver</button>
    `;

    trainCardsContainer.appendChild(trainCard);
  });

  // Ajouter les gestionnaires d'événements pour les boutons de réservation
  document.querySelectorAll(".btn-book-train").forEach((button) => {
    button.addEventListener("click", function () {
      showBookingInterface("train");
    });
  });
}

// Fonction pour afficher les données de bus
function displayBusData() {
  const busesTab = document.getElementById("buses");
  if (!busesTab) return;

  // Créer le contenu pour les bus s'il n'existe pas
  if (!busesTab.querySelector(".search-form")) {
    busesTab.innerHTML = `
      <div class="search-form">
        <form id="bus-search-form">
          <div class="form-row">
            <div class="form-group">
              <label for="bus-departure">Départ</label>
              <select id="bus-departure" name="bus-departure" required>
                <option value="">Sélectionnez une ville</option>
                <option value="casablanca">Casablanca</option>
                <option value="rabat">Rabat</option>
                <option value="marrakech">Marrakech</option>
                <option value="madrid">Madrid</option>
                <option value="barcelona">Barcelone</option>
                <option value="lisbonne">Lisbonne</option>
                <option value="porto">Porto</option>
              </select>
            </div>
            <div class="form-group">
              <label for="bus-arrival">Arrivée</label>
              <select id="bus-arrival" name="bus-arrival" required>
                <option value="">Sélectionnez une ville</option>
                <option value="casablanca">Casablanca</option>
                <option value="rabat">Rabat</option>
                <option value="marrakech">Marrakech</option>
                <option value="madrid">Madrid</option>
                <option value="barcelona">Barcelone</option>
                <option value="lisbonne">Lisbonne</option>
                <option value="porto">Porto</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="bus-date">Date</label>
              <input type="date" id="bus-date" name="bus-date" required />
            </div>
            <div class="form-group">
              <label for="bus-passengers">Passagers</label>
              <select id="bus-passengers" name="bus-passengers" required>
                <option value="1">1 passager</option>
                <option value="2">2 passagers</option>
                <option value="3">3 passagers</option>
                <option value="4">4 passagers</option>
                <option value="5">5 passagers</option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn-search">Rechercher des bus</button>
        </form>
      </div>
      <div class="bus-results">
        <h3>Bus disponibles</h3>
        <div class="bus-cards">
          <!-- Les résultats des bus seront ajoutés dynamiquement via JavaScript -->
        </div>
      </div>
    `;

    // Ajouter l'écouteur d'événements pour le formulaire de recherche de bus
    const busSearchForm = document.getElementById("bus-search-form");
    if (busSearchForm) {
      busSearchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        searchBuses();
      });
    }
  }

  // Afficher les données de bus
  const busCardsContainer = document.querySelector("#buses .bus-cards");
  if (!busCardsContainer) return;

  busCardsContainer.innerHTML = "";

  transportData.buses.forEach((bus) => {
    const busCard = document.createElement("div");
    busCard.className = "bus-card";
    busCard.innerHTML = `
      <div class="bus-header">
        <img src="${bus.image}" alt="${bus.operator}" class="operator-logo">
        <div class="bus-info">
          <span class="operator">${bus.operator}</span>
          <span class="bus-number">${bus.busNumber}</span>
        </div>
      </div>
      <div class="bus-details">
        <div class="time-details">
          <div class="departure">
            <span class="time">${bus.departureTime}</span>
            <span class="city">${bus.departure}</span>
          </div>
          <div class="duration">
            <i class="fas fa-bus"></i>
            <span>4h 00m</span>
          </div>
          <div class="arrival">
            <span class="time">${bus.arrivalTime}</span>
            <span class="city">${bus.arrival}</span>
          </div>
        </div>
        <div class="price-details">
          <span class="price">${bus.price}€</span>
          <span class="per-person">par personne</span>
          <span class="class">${bus.class}</span>
        </div>
      </div>
      <button class="btn-book-bus">Réserver</button>
    `;

    busCardsContainer.appendChild(busCard);
  });

  // Ajouter les gestionnaires d'événements pour les boutons de réservation
  document.querySelectorAll(".btn-book-bus").forEach((button) => {
    button.addEventListener("click", function () {
      showBookingInterface("bus");
    });
  });
}

// Fonction pour rechercher les vols
function searchFlights() {
  const departure = document.getElementById("departure").value;
  const arrival = document.getElementById("arrival").value;
  const departureDate = document.getElementById("departure-date").value;
  const returnDate = document.getElementById("return-date").value;
  const passengers = document.getElementById("passengers").value;
  const flightClass = document.getElementById("class").value;

  // Filtrer les vols en fonction des critères de recherche
  const filteredFlights = transportData.flights.filter((flight) => {
    return (
      flight.departure.toLowerCase() === departure.toLowerCase() &&
      flight.arrival.toLowerCase() === arrival.toLowerCase() &&
      flight.class.toLowerCase() === flightClass.toLowerCase()
    );
  });

  displayFilteredFlights(filteredFlights);
}

// Fonction pour afficher les vols filtrés
function displayFilteredFlights(flights) {
  const flightCardsContainer = document.querySelector(".flight-cards");
  flightCardsContainer.innerHTML = "";

  if (flights.length === 0) {
    flightCardsContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>Aucun vol trouvé</h3>
        <p>Essayez de modifier vos critères de recherche</p>
      </div>
    `;
    return;
  }

  flights.forEach((flight) => {
    const flightCard = document.createElement("div");
    flightCard.className = "flight-card";
    flightCard.innerHTML = `
      <div class="flight-header">
        <img src="${flight.image}" alt="${flight.airline}" class="airline-logo">
        <div class="flight-info">
          <span class="airline">${flight.airline}</span>
          <span class="flight-number">${flight.flightNumber}</span>
        </div>
      </div>
      <div class="flight-details">
        <div class="time-details">
          <div class="departure">
            <span class="time">${flight.departureTime}</span>
            <span class="city">${flight.departure}</span>
          </div>
          <div class="duration">
            <i class="fas fa-plane"></i>
            <span>2h 30m</span>
          </div>
          <div class="arrival">
            <span class="time">${flight.arrivalTime}</span>
            <span class="city">${flight.arrival}</span>
          </div>
        </div>
        <div class="price-details">
          <span class="price">${flight.price}€</span>
          <span class="per-person">par personne</span>
          <span class="class">${flight.class}</span>
        </div>
      </div>
      <button class="btn-book-flight">Réserver</button>
    `;

    flightCardsContainer.appendChild(flightCard);
  });

  // Ajouter les gestionnaires d'événements pour les boutons de réservation
  document.querySelectorAll(".btn-book-flight").forEach((button) => {
    button.addEventListener("click", function () {
      showBookingInterface("flight");
    });
  });
}

// Fonction pour rechercher les trains
function searchTrains() {
  const departure = document.getElementById("train-departure").value;
  const arrival = document.getElementById("train-arrival").value;
  const date = document.getElementById("train-date").value;
  const passengers = document.getElementById("train-passengers").value;

  // Filtrer les trains en fonction des critères de recherche
  const filteredTrains = transportData.trains.filter((train) => {
    return (
      train.departure.toLowerCase() === departure.toLowerCase() &&
      train.arrival.toLowerCase() === arrival.toLowerCase()
    );
  });

  displayFilteredTrains(filteredTrains);
}

// Fonction pour afficher les trains filtrés
function displayFilteredTrains(trains) {
  const trainCardsContainer = document.querySelector(".train-cards");
  trainCardsContainer.innerHTML = "";

  if (trains.length === 0) {
    trainCardsContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>Aucun train trouvé</h3>
        <p>Essayez de modifier vos critères de recherche</p>
      </div>
    `;
    return;
  }

  trains.forEach((train) => {
    const trainCard = document.createElement("div");
    trainCard.className = "train-card";
    trainCard.innerHTML = `
      <div class="train-header">
        <img src="${train.image}" alt="${train.operator}" class="operator-logo">
        <div class="train-info">
          <span class="operator">${train.operator}</span>
          <span class="train-number">${train.trainNumber}</span>
        </div>
      </div>
      <div class="train-details">
        <div class="time-details">
          <div class="departure">
            <span class="time">${train.departureTime}</span>
            <span class="city">${train.departure}</span>
          </div>
          <div class="duration">
            <i class="fas fa-train"></i>
            <span>2h 30m</span>
          </div>
          <div class="arrival">
            <span class="time">${train.arrivalTime}</span>
            <span class="city">${train.arrival}</span>
          </div>
        </div>
        <div class="price-details">
          <span class="price">${train.price}€</span>
          <span class="per-person">par personne</span>
          <span class="class">${train.class}</span>
        </div>
      </div>
      <button class="btn-book-train">Réserver</button>
    `;

    trainCardsContainer.appendChild(trainCard);
  });

  // Ajouter les gestionnaires d'événements pour les boutons de réservation
  document.querySelectorAll(".btn-book-train").forEach((button) => {
    button.addEventListener("click", function () {
      showBookingInterface("train");
    });
  });
}

// Fonction pour rechercher les bus
function searchBuses() {
  const departure = document.getElementById("bus-departure").value;
  const arrival = document.getElementById("bus-arrival").value;
  const date = document.getElementById("bus-date").value;
  const passengers = document.getElementById("bus-passengers").value;

  // Filtrer les bus en fonction des critères de recherche
  const filteredBuses = transportData.buses.filter((bus) => {
    return (
      bus.departure.toLowerCase() === departure.toLowerCase() &&
      bus.arrival.toLowerCase() === arrival.toLowerCase()
    );
  });

  displayFilteredBuses(filteredBuses);
}

// Fonction pour afficher les bus filtrés
function displayFilteredBuses(buses) {
  const busCardsContainer = document.querySelector(".bus-cards");
  busCardsContainer.innerHTML = "";

  if (buses.length === 0) {
    busCardsContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>Aucun bus trouvé</h3>
        <p>Essayez de modifier vos critères de recherche</p>
      </div>
    `;
    return;
  }

  buses.forEach((bus) => {
    const busCard = document.createElement("div");
    busCard.className = "bus-card";
    busCard.innerHTML = `
      <div class="bus-header">
        <img src="${bus.image}" alt="${bus.operator}" class="operator-logo">
        <div class="bus-info">
          <span class="operator">${bus.operator}</span>
          <span class="bus-number">${bus.busNumber}</span>
        </div>
      </div>
      <div class="bus-details">
        <div class="time-details">
          <div class="departure">
            <span class="time">${bus.departureTime}</span>
            <span class="city">${bus.departure}</span>
          </div>
          <div class="duration">
            <i class="fas fa-bus"></i>
            <span>4h 00m</span>
          </div>
          <div class="arrival">
            <span class="time">${bus.arrivalTime}</span>
            <span class="city">${bus.arrival}</span>
          </div>
        </div>
        <div class="price-details">
          <span class="price">${bus.price}€</span>
          <span class="per-person">par personne</span>
          <span class="class">${bus.class}</span>
        </div>
      </div>
      <button class="btn-book-bus">Réserver</button>
    `;

    busCardsContainer.appendChild(busCard);
  });

  // Ajouter les gestionnaires d'événements pour les boutons de réservation
  document.querySelectorAll(".btn-book-bus").forEach((button) => {
    button.addEventListener("click", function () {
      showBookingInterface("bus");
    });
  });
}

// Fonction pour afficher l'interface de réservation
function showBookingInterface(type) {
  // Créer un modal de réservation
  const bookingModal = document.createElement("div");
  bookingModal.className = "modal booking-modal";
  bookingModal.id = "booking-modal";

  let transportType = "";
  let transportName = "";

  if (type === "flight") {
    transportType = "vol";
    transportName = "Vol";
  } else if (type === "train") {
    transportType = "train";
    transportName = "Train";
  } else if (type === "bus") {
    transportType = "bus";
    transportName = "Bus";
  }

  bookingModal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>Réserver votre ${transportType}</h2>
      <form id="booking-form">
        <div class="form-row">
          <div class="form-group">
            <label for="booking-name">Nom complet</label>
            <input type="text" id="booking-name" name="booking-name" required>
          </div>
          <div class="form-group">
            <label for="booking-email">Email</label>
            <input type="email" id="booking-email" name="booking-email" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="booking-phone">Téléphone</label>
            <input type="tel" id="booking-phone" name="booking-phone" required>
          </div>
          <div class="form-group">
            <label for="booking-passengers">Nombre de passagers</label>
            <select id="booking-passengers" name="booking-passengers" required>
              <option value="1">1 passager</option>
              <option value="2">2 passagers</option>
              <option value="3">3 passagers</option>
              <option value="4">4 passagers</option>
              <option value="5">5 passagers</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="booking-payment">Mode de paiement</label>
            <select id="booking-payment" name="booking-payment" required>
              <option value="card">Carte bancaire</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
        </div>
        <div class="booking-summary">
          <h3>Résumé de la réservation</h3>
          <div class="summary-details">
            <p><strong>Type:</strong> ${transportName}</p>
            <p><strong>Départ:</strong> <span id="summary-departure"></span></p>
            <p><strong>Arrivée:</strong> <span id="summary-arrival"></span></p>
            <p><strong>Date:</strong> <span id="summary-date"></span></p>
            <p><strong>Prix:</strong> <span id="summary-price"></span>€</p>
          </div>
        </div>
        <button type="submit" class="btn-confirm-booking">Confirmer la réservation</button>
      </form>
    </div>
  `;

  // Ajouter le modal au body
  document.body.appendChild(bookingModal);

  // Afficher le modal
  bookingModal.style.display = "flex";

  // Gérer la fermeture du modal
  const closeBtn = bookingModal.querySelector(".close-modal");
  closeBtn.addEventListener("click", function () {
    bookingModal.style.display = "none";
    document.body.removeChild(bookingModal);
  });

  // Gérer la soumission du formulaire
  const bookingForm = document.getElementById("booking-form");
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Simuler une réservation réussie
    alert("Réservation confirmée ! Un email de confirmation vous sera envoyé.");

    // Fermer le modal
    bookingModal.style.display = "none";
    document.body.removeChild(bookingModal);
  });
}
