// backend/src/config/database.js
const mysql = require('mysql2/promise');

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'medicare_plus',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database connected successfully');
    
    // Create tables if not exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS hospitals (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT,
        phone VARCHAR(20),
        bpjsAccepted BOOLEAN DEFAULT FALSE,
        rating DECIMAL(2,1) DEFAULT 0,
        distance VARCHAR(20),
        image VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        firstName VARCHAR(100),
        lastName VARCHAR(100),
        phone VARCHAR(20),
        role ENUM('patient', 'doctor', 'admin') DEFAULT 'patient',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT,
        hospitalId INT,
        doctorName VARCHAR(255),
        bookingDate DATE,
        bookingTime TIME,
        status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (hospitalId) REFERENCES hospitals(id)
      )
    `);

    // Insert sample hospitals if table is empty
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM hospitals');
    if (rows[0].count === 0) {
      await connection.execute(`
        INSERT INTO hospitals (name, address, phone, bpjsAccepted, rating, distance) VALUES 
        ('RS Siloam Semanggi', 'Jl. Garnisun Dalam No.2-3, Jakarta', '021-2996-2888', true, 4.8, '2.3 km'),
        ('RS Pondok Indah', 'Jl. Metro Duta, Jakarta Selatan', '021-765-7525', false, 4.9, '3.5 km'),
        ('RSUD Fatmawati', 'Jl. RS Fatmawati Raya, Jakarta', '021-7501524', true, 4.2, '4.1 km'),
        ('RS Mayapada', 'Jl. Lebak Bulus, Jakarta Selatan', '021-2921-7777', false, 4.7, '5.8 km')
      `);
      console.log('✅ Sample hospitals data inserted');
    }

    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
module.exports.pool = pool;