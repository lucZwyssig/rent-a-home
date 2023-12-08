DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    customerId INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE rooms (
    roomId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NOT NULL
);

CREATE TABLE bookings (
    bookingId INT AUTO_INCREMENT PRIMARY KEY,
    customerFKID INT NOT NULL,
    roomFKID INT NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (customerFKID) REFERENCES customers(customerId),
    FOREIGN KEY (roomFKID) REFERENCES rooms(roomId)
);

INSERT INTO rooms (name, description)
VALUES ("room1", "room1 description"),
("room2", "room2 description"),
("room3", "room3 description");
