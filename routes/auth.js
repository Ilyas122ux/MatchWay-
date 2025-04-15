const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const mysql = require("mysql2/promise");
require("dotenv").config();

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Middleware de validation pour l'inscription
const registerValidation = [
  body("name").trim().notEmpty().withMessage("Le nom est requis"),
  body("email").isEmail().withMessage("Email invalide"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
];

// Route d'inscription
router.post("/register", registerValidation, async (req, res) => {
  try {
    // Validation des données
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Connexion à la base de données
    const connection = await mysql.createConnection(dbConfig);

    // Vérification si l'email existe déjà
    const [existingUsers] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      await connection.end();
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertion de l'utilisateur
    const [result] = await connection.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    await connection.end();

    // Création du token JWT
    const token = jwt.sign(
      { userId: result.insertId },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Inscription réussie",
      token,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route de connexion
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email invalide"),
    body("password").notEmpty().withMessage("Mot de passe requis"),
  ],
  async (req, res) => {
    try {
      // Validation des données
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Connexion à la base de données
      const connection = await mysql.createConnection(dbConfig);

      // Recherche de l'utilisateur
      const [users] = await connection.execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      await connection.end();

      if (users.length === 0) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      const user = users[0];

      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      // Création du token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.json({
        message: "Connexion réussie",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

// Route de vérification du token
router.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token non fourni" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
});

module.exports = router;
