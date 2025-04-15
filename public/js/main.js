// Gestion de la navigation
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner tous les liens de navigation
  const navLinks = document.querySelectorAll(".nav-links a");

  // Ajouter un écouteur d'événements à chaque lien
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Obtenir l'ID de la section cible à partir du href
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Faire défiler jusqu'à la section cible avec une animation fluide
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Mettre à jour l'URL sans recharger la page
        history.pushState(null, "", `#${targetId}`);
      }
    });
  });

  // Gérer le défilement initial si l'URL contient un hash
  if (window.location.hash) {
    const targetSection = document.getElementById(
      window.location.hash.substring(1)
    );
    if (targetSection) {
      setTimeout(() => {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }

  // Gestion des modales de connexion et d'inscription
  const loginBtn = document.querySelector(".btn-login");
  const registerBtn = document.querySelector(".btn-register");
  const loginModal = document.getElementById("login-modal");
  const registerModal = document.getElementById("register-modal");
  const closeButtons = document.querySelectorAll(".close");
  const switchToRegister = document.getElementById("switch-to-register");
  const switchToLogin = document.getElementById("switch-to-login");

  // Ouvrir la modale de connexion
  if (loginBtn) {
    loginBtn.addEventListener("click", function () {
      loginModal.style.display = "block";
    });
  }

  // Ouvrir la modale d'inscription
  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      registerModal.style.display = "block";
    });
  }

  // Fermer les modales
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      loginModal.style.display = "none";
      registerModal.style.display = "none";
    });
  });

  // Basculer entre les modales
  if (switchToRegister) {
    switchToRegister.addEventListener("click", function (e) {
      e.preventDefault();
      loginModal.style.display = "none";
      registerModal.style.display = "block";
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener("click", function (e) {
      e.preventDefault();
      registerModal.style.display = "none";
      loginModal.style.display = "block";
    });
  }

  // Fermer les modales en cliquant en dehors
  window.addEventListener("click", function (e) {
    if (e.target === loginModal) {
      loginModal.style.display = "none";
    }
    if (e.target === registerModal) {
      registerModal.style.display = "none";
    }
  });

  // Gestion des formulaires
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Logique de connexion à implémenter
      console.log("Tentative de connexion");
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Logique d'inscription à implémenter
      console.log("Tentative d'inscription");
    });
  }
});

// Fonction pour afficher les modales
function showModal(type) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${type === "login" ? "Connexion" : "Inscription"}</h2>
            <form id="${type}-form">
                ${
                  type === "register"
                    ? `
                    <div class="form-group">
                        <label for="name">Nom complet</label>
                        <input type="text" id="name" required>
                    </div>
                `
                    : ""
                }
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" id="password" required>
                </div>
                <button type="submit" class="submit-btn">
                    ${type === "login" ? "Se connecter" : "S'inscrire"}
                </button>
            </form>
        </div>
    `;

  document.body.appendChild(modal);

  // Gestion de la fermeture de la modale
  const closeBtn = modal.querySelector(".close");
  closeBtn.onclick = () => {
    modal.remove();
  };

  // Fermeture en cliquant en dehors de la modale
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.remove();
    }
  };

  // Gestion de la soumission du formulaire
  const form = modal.querySelector("form");
  form.onsubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(type, form);
  };
}

// Gestion de la soumission des formulaires
async function handleFormSubmit(type, form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`/api/auth/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      window.location.reload();
    } else {
      throw new Error("Erreur lors de l'authentification");
    }
  } catch (error) {
    console.error("Erreur:", error);
    alert("Une erreur est survenue. Veuillez réessayer.");
  }
}

// Fonction pour vérifier l'authentification
function checkAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    // Mettre à jour l'interface pour l'utilisateur connecté
    document.querySelector(".auth-buttons").innerHTML = `
            <button class="btn-profile">Mon Profil</button>
            <button class="btn-logout">Déconnexion</button>
        `;

    // Gestion de la déconnexion
    document.querySelector(".btn-logout").addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.reload();
    });
  }
}

// Appel de la vérification d'authentification au chargement
checkAuth();
