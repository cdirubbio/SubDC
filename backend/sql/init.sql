CREATE DATABASE subdc;

USE subdc;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    phone_number VARCHAR(11),
    email_is_verified BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Listings (
    listing_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    apt_type ENUM('studio', '1br', '2br') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    address VARCHAR(255) NOT NULL,
    zip_code VARCHAR(10),
    availability_start DATE NOT NULL,
    availability_end DATE NOT NULL,
    image1 VARCHAR(255) NOT NULL,
    image2 VARCHAR(255) NOT NULL,
    reserved_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reserved_by) REFERENCES Users(user_id) ON DELETE SET NULL
);

CREATE TABLE Favorites (
    user_id INT NOT NULL,
    listing_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, listing_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (listing_id) REFERENCES Listings(listing_id) ON DELETE CASCADE
);