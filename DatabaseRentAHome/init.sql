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
    description TEXT NOT NULL,    
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE bookings (
    bookingId INT AUTO_INCREMENT PRIMARY KEY,
    customerFKID INT NOT NULL,
    roomFKID INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (customerFKID) REFERENCES customers(customerId),
    FOREIGN KEY (roomFKID) REFERENCES rooms(roomId)
);

CREATE TABLE payments (
    paymentId INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT NOT NULL,
    bookingId INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    paymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customers(customerId),
    FOREIGN KEY (bookingId) REFERENCES bookings(bookingId)
);

INSERT INTO rooms (name, description, price, image)
VALUES ("room1", "room1 description", 30.50, "test.jpg"),
("room2", "room2 description", 30.50, "test.jpg"),
("room3", "room3 description", 30.50, "test.jpg");
