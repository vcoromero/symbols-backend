CREATE DATABASE IF NOT EXISTS blend_long_challenge;

USE blend_long_challenge;

CREATE TABLE IF NOT EXISTS logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  symbol VARCHAR(10) NOT NULL,
  current_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

GRANT ALL PRIVILEGES ON blend_long_challenge.* TO 'basic_user'@'%';
FLUSH PRIVILEGES;
