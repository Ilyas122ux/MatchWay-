// Sélection des éléments du DOM
const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");
const loginBtn = document.querySelector(".btn-login");
const registerBtn = document.querySelector(".btn-register");
const closeBtns = document.querySelectorAll(".close");
const switchToRegister = document.getElementById("switch-to-register");
const switchToLogin = document.getElementById("switch-to-login");

// Fonction pour ouvrir une modale
function openModal(modal) {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // Empêche le défilement de la page
}

// Fonction pour fermer une modale
function closeModal(modal) {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Réactive le défilement de la page
}

// Événements pour ouvrir les modales
if (loginBtn) {
  loginBtn.addEventListener("click", () => openModal(loginModal));
}

if (registerBtn) {
  registerBtn.addEventListener("click", () => openModal(registerModal));
}

// Événements pour fermer les modales
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    closeModal(loginModal);
    closeModal(registerModal);
  });
});

// Fermer la modale en cliquant en dehors
window.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    closeModal(loginModal);
  }
  if (e.target === registerModal) {
    closeModal(registerModal);
  }
});

// Switch entre les modales
if (switchToRegister) {
  switchToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(registerModal);
  });
}

if (switchToLogin) {
  switchToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(registerModal);
    openModal(loginModal);
  });
}

// Gestion des formulaires
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Ajoutez ici la logique de connexion
    console.log("Tentative de connexion");
  });
}

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Ajoutez ici la logique d'inscription
    console.log("Tentative d'inscription");
  });
}
