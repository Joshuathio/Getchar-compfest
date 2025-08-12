const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// Create booking
router.post('/', async (req, res) => {
  try {
    const { userId, hospitalId, doctorName, bookingDate, bookingTime } = req.body;
    
    const [result] = await pool.execute(
      'INSERT INTO bookings (userId, hospitalId, doctorName, bookingDate, bookingTime) VALUES (?, ?, ?, ?, ?)',
      [userId, hospitalId, doctorName, bookingDate, bookingTime]
    );
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        bookingId: result.insertId,
        queueNumber: `A${String(result.insertId).padStart(3, '0')}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Booking failed',
      error: error.message
    });
  }
});

// Get user bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const [bookings] = await pool.execute(
      `SELECT b.*, h.name as hospitalName, h.address 
       FROM bookings b 
       JOIN hospitals h ON b.hospitalId = h.id 
       WHERE b.userId = ? 
       ORDER BY b.bookingDate DESC`,
      [req.params.userId]
    );
    
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

module.exports = router;