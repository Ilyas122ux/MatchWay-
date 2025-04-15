// Données des stades
const stadiums = [
  {
    id: 1,
    name: "Stade Mohammed V",
    city: "Casablanca",
    country: "maroc",
    capacity: "67,000",
    coordinates: [33.5731, -7.5898],
    image: "https://via.placeholder.com/300x200?text=Stade+Mohammed+V",
    description: "Le plus grand stade du Maroc, situé au cœur de Casablanca.",
  },
  {
    id: 2,
    name: "Santiago Bernabéu",
    city: "Madrid",
    country: "espagne",
    capacity: "81,044",
    coordinates: [40.4531, -3.6883],
    image: "https://via.placeholder.com/300x200?text=Santiago+Bernabéu",
    description: "Le légendaire stade du Real Madrid, récemment rénové.",
  },
  {
    id: 3,
    name: "Camp Nou",
    city: "Barcelone",
    country: "espagne",
    capacity: "99,354",
    coordinates: [41.3809, 2.1228],
    image: "https://via.placeholder.com/300x200?text=Camp+Nou",
    description: "Le plus grand stade d'Europe, fief du FC Barcelone.",
  },
  {
    id: 4,
    name: "Estádio da Luz",
    city: "Lisbonne",
    country: "portugal",
    capacity: "65,647",
    coordinates: [38.7526, -9.1842],
    image: "https://via.placeholder.com/300x200?text=Estádio+da+Luz",
    description: "Le stade moderne du Benfica, situé à Lisbonne.",
  },
];

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM chargé, initialisation de la carte...");

  // Vérifier si le conteneur de la carte existe
  const mapContainer = document.getElementById("stadiums-map");
  if (!mapContainer) {
    console.error("Le conteneur de la carte n'a pas été trouvé!");
    return;
  }
  console.log("Conteneur de la carte trouvé:", mapContainer);

  try {
    // Initialisation de la carte
    const map = L.map("stadiums-map").setView([30.0, 0.0], 4);
    console.log("Carte initialisée avec succès");

    // Ajout du fond de carte
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
    console.log("Fond de carte ajouté avec succès");

    // Icônes personnalisées pour les marqueurs
    const createCustomIcon = (country) => {
      return L.divIcon({
        className: "custom-icon",
        html: `<div class="marker-icon ${country}"></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
      });
    };

    // Ajout des marqueurs pour chaque stade
    const markers = {};
    const popups = {};

    stadiums.forEach((stadium) => {
      const marker = L.marker(stadium.coordinates, {
        icon: createCustomIcon(stadium.country),
      }).addTo(map);

      const popupContent = `
        <div class="stadium-popup">
          <img src="${stadium.image}" alt="${stadium.name}">
          <h3>${stadium.name}</h3>
          <p>${stadium.city}, ${
        stadium.country.charAt(0).toUpperCase() + stadium.country.slice(1)
      }</p>
          <p>${stadium.description}</p>
          <span class="capacity">Capacité: ${stadium.capacity}</span>
        </div>
      `;

      const popup = L.popup({
        maxWidth: 300,
        className: "stadium-popup",
      }).setContent(popupContent);

      marker.bindPopup(popup);
      markers[stadium.id] = marker;
      popups[stadium.id] = popup;
    });
    console.log("Marqueurs ajoutés avec succès");

    // Gestion des filtres par pays
    const filterButtons = document.querySelectorAll(".filter-btn");
    const stadiumsList = document.querySelector(".stadiums-list");

    // Création de la liste des stades
    function createStadiumsList(filteredStadiums = stadiums) {
      stadiumsList.innerHTML = "";

      filteredStadiums.forEach((stadium) => {
        const stadiumElement = document.createElement("div");
        stadiumElement.className = "stadium-item";
        stadiumElement.innerHTML = `
          <h3>${stadium.name}</h3>
          <p>${stadium.city}, ${
          stadium.country.charAt(0).toUpperCase() + stadium.country.slice(1)
        }</p>
          <p>Capacité: ${stadium.capacity}</p>
        `;

        stadiumElement.addEventListener("click", () => {
          map.setView(stadium.coordinates, 12);
          markers[stadium.id].openPopup();
        });

        stadiumsList.appendChild(stadiumElement);
      });
    }

    // Initialisation de la liste
    createStadiumsList();
    console.log("Liste des stades créée");

    // Gestion des filtres
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Mise à jour des boutons actifs
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const country = button.dataset.country;
        const filteredStadiums =
          country === "all"
            ? stadiums
            : stadiums.filter((stadium) => stadium.country === country);

        createStadiumsList(filteredStadiums);

        // Ajustement de la vue de la carte
        if (country === "all") {
          map.setView([30.0, 0.0], 4);
        } else {
          const countryStadiums = stadiums.filter(
            (stadium) => stadium.country === country
          );
          if (countryStadiums.length > 0) {
            const bounds = L.latLngBounds(
              countryStadiums.map((stadium) => stadium.coordinates)
            );
            map.fitBounds(bounds, { padding: [50, 50] });
          }
        }
      });
    });
    console.log("Filtres initialisés");

    // Ajout des styles CSS pour les marqueurs personnalisés
    const style = document.createElement("style");
    style.textContent = `
      .marker-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
      }
      .marker-icon.maroc {
        background-color: #c1272d;
      }
      .marker-icon.espagne {
        background-color: #f1bf00;
      }
      .marker-icon.portugal {
        background-color: #006600;
      }
    `;
    document.head.appendChild(style);
    console.log("Styles des marqueurs ajoutés");
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la carte:", error);
  }
});
