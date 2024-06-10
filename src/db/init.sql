CREATE DATABASE IF NOT EXISTS blend_long_challenge;

USE blend_long_challenge;

DROP TABLE IF EXISTS logs;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  symbol VARCHAR(10) NOT NULL,
  current_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (user_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, email, password) VALUES ('Monkey D Luffy', 'thounsandsunny@ship.com', '123456');
INSERT INTO users (name, email, password) VALUES ('Trafalgar D Water Law', 'polartank@submarine.com', '123456');
INSERT INTO users (name, email, password) VALUES ('Eustass Kid', 'victorapunk@ship.com','123456');

GRANT ALL PRIVILEGES ON blend_long_challenge.* TO 'basic_user'@'%';
FLUSH PRIVILEGES;
