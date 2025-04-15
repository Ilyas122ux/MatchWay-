-- Création de la base de données
CREATE DATABASE IF NOT EXISTS mundial_experience;
USE mundial_experience;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des stades
CREATE TABLE IF NOT EXISTS stadiums (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des matchs
CREATE TABLE IF NOT EXISTS matches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    stadium_id INT NOT NULL,
    team1 VARCHAR(100) NOT NULL,
    team2 VARCHAR(100) NOT NULL,
    match_date DATETIME NOT NULL,
    match_type ENUM('group', 'round_of_16', 'quarter', 'semi', 'final') NOT NULL,
    price_category1 DECIMAL(10,2) NOT NULL,
    price_category2 DECIMAL(10,2) NOT NULL,
    price_category3 DECIMAL(10,2) NOT NULL,
    available_tickets INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (stadium_id) REFERENCES stadiums(id)
);

-- Table des billets
CREATE TABLE IF NOT EXISTS tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    match_id INT NOT NULL,
    user_id INT NOT NULL,
    category ENUM('1', '2', '3') NOT NULL,
    seat_number VARCHAR(10) NOT NULL,
    qr_code VARCHAR(255) NOT NULL,
    status ENUM('active', 'used', 'cancelled', 'transferred') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES matches(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table des transports
CREATE TABLE IF NOT EXISTS transport (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('bus', 'train', 'tram', 'taxi') NOT NULL,
    departure_location VARCHAR(100) NOT NULL,
    arrival_location VARCHAR(100) NOT NULL,
    departure_time DATETIME NOT NULL,
    arrival_time DATETIME NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    available_seats INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des réservations de transport
CREATE TABLE IF NOT EXISTS transport_bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    transport_id INT NOT NULL,
    user_id INT NOT NULL,
    number_of_seats INT NOT NULL,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
    FOREIGN KEY (transport_id) REFERENCES transport(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table des hôtels
CREATE TABLE IF NOT EXISTS hotels (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    available_rooms INT NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des réservations d'hôtels
CREATE TABLE IF NOT EXISTS hotel_bookings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    hotel_id INT NOT NULL,
    user_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_rooms INT NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (hotel_id) REFERENCES hotels(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table des événements
CREATE TABLE IF NOT EXISTS events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(100) NOT NULL,
    event_date DATETIME NOT NULL,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des messages du chat
CREATE TABLE IF NOT EXISTS chat_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    language VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insertion de données de test pour les stades
INSERT INTO stadiums (name, city, country, capacity, description) VALUES
('Stade Mohammed V', 'Casablanca', 'Maroc', 67000, 'Stade historique de Casablanca'),
('Stade Santiago Bernabéu', 'Madrid', 'Espagne', 81044, 'Stade légendaire du Real Madrid'),
('Estádio da Luz', 'Lisbonne', 'Portugal', 65000, 'Stade moderne de Lisbonne');

-- Insertion de données de test pour les matchs
INSERT INTO matches (stadium_id, team1, team2, match_date, match_type, price_category1, price_category2, price_category3, available_tickets) VALUES
(1, 'Maroc', 'Espagne', '2030-06-15 20:00:00', 'group', 150.00, 100.00, 50.00, 67000),
(2, 'Portugal', 'France', '2030-06-16 20:00:00', 'group', 200.00, 150.00, 75.00, 81044),
(3, 'Brésil', 'Argentine', '2030-06-17 20:00:00', 'group', 180.00, 120.00, 60.00, 65000); 