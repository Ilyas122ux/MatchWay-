document.addEventListener("DOMContentLoaded", function () {
  // Navigation entre les sections
  const menuItems = document.querySelectorAll(".menu-item");
  const sections = document.querySelectorAll(".profile-section");

  menuItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-section");

      // Mise à jour des classes active
      menuItems.forEach((i) => i.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      this.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });

  // Gestion des onglets de réservations
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      this.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });

  // Gestion des filtres
  const filterSelects = document.querySelectorAll("select[data-filter]");
  filterSelects.forEach((select) => {
    select.addEventListener("change", function () {
      const filterType = this.getAttribute("data-filter");
      const value = this.value;
      filterItems(filterType, value);
    });
  });

  // Fonction de filtrage
  function filterItems(type, value) {
    const items = document.querySelectorAll(`.${type}-item`);
    items.forEach((item) => {
      const itemValue = item.getAttribute(`data-${type}`);
      if (value === "all" || itemValue === value) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Gestion des paramètres
  const settingToggles = document.querySelectorAll(".setting-toggle");
  settingToggles.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const setting = this.getAttribute("data-setting");
      const enabled = this.checked;
      updateSetting(setting, enabled);
    });
  });

  // Fonction de mise à jour des paramètres
  function updateSetting(setting, enabled) {
    // Ici, vous pouvez ajouter la logique pour sauvegarder les paramètres
    console.log(`Setting ${setting} updated to ${enabled}`);
  }

  // Gestion du formulaire de profil
  const profileForm = document.querySelector(".profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", function (e) {
      e.preventDefault();
      saveProfile();
    });
  }

  // Fonction de sauvegarde du profil
  function saveProfile() {
    const formData = new FormData(profileForm);
    const data = Object.fromEntries(formData.entries());

    // Ici, vous pouvez ajouter la logique pour sauvegarder les données du profil
    console.log("Profile data to save:", data);
  }

  // Gestion des actions sur les tickets
  const ticketActions = document.querySelectorAll(".ticket-action");
  ticketActions.forEach((action) => {
    action.addEventListener("click", function (e) {
      e.preventDefault();
      const actionType = this.getAttribute("data-action");
      const ticketId = this.getAttribute("data-ticket-id");
      handleTicketAction(actionType, ticketId);
    });
  });

  // Fonction de gestion des actions sur les tickets
  function handleTicketAction(action, ticketId) {
    // Ici, vous pouvez ajouter la logique pour gérer les actions sur les tickets
    console.log(`Performing ${action} on ticket ${ticketId}`);
  }

  // Gestion des actions sur les réservations
  const bookingActions = document.querySelectorAll(".booking-action");
  bookingActions.forEach((action) => {
    action.addEventListener("click", function (e) {
      e.preventDefault();
      const actionType = this.getAttribute("data-action");
      const bookingId = this.getAttribute("data-booking-id");
      handleBookingAction(actionType, bookingId);
    });
  });

  // Fonction de gestion des actions sur les réservations
  function handleBookingAction(action, bookingId) {
    // Ici, vous pouvez ajouter la logique pour gérer les actions sur les réservations
    console.log(`Performing ${action} on booking ${bookingId}`);
  }

  // Gestion des actions sur les transports
  const transportActions = document.querySelectorAll(".transport-action");
  transportActions.forEach((action) => {
    action.addEventListener("click", function (e) {
      e.preventDefault();
      const actionType = this.getAttribute("data-action");
      const transportId = this.getAttribute("data-transport-id");
      handleTransportAction(actionType, transportId);
    });
  });

  // Fonction de gestion des actions sur les transports
  function handleTransportAction(action, transportId) {
    // Ici, vous pouvez ajouter la logique pour gérer les actions sur les transports
    console.log(`Performing ${action} on transport ${transportId}`);
  }

  // Gestion des actions sur les hôtels
  const hotelActions = document.querySelectorAll(".hotel-action");
  hotelActions.forEach((action) => {
    action.addEventListener("click", function (e) {
      e.preventDefault();
      const actionType = this.getAttribute("data-action");
      const hotelId = this.getAttribute("data-hotel-id");
      handleHotelAction(actionType, hotelId);
    });
  });

  // Fonction de gestion des actions sur les hôtels
  function handleHotelAction(action, hotelId) {
    // Ici, vous pouvez ajouter la logique pour gérer les actions sur les hôtels
    console.log(`Performing ${action} on hotel ${hotelId}`);
  }

  // Gestion des actions sur les événements
  const eventActions = document.querySelectorAll(".event-action");
  eventActions.forEach((action) => {
    action.addEventListener("click", function (e) {
      e.preventDefault();
      const actionType = this.getAttribute("data-action");
      const eventId = this.getAttribute("data-event-id");
      handleEventAction(actionType, eventId);
    });
  });

  // Fonction de gestion des actions sur les événements
  function handleEventAction(action, eventId) {
    // Ici, vous pouvez ajouter la logique pour gérer les actions sur les événements
    console.log(`Performing ${action} on event ${eventId}`);
  }
});
