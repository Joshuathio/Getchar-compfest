const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');

// GET all hospitals
router.get('/', async (req, res) => {
  try {
    const [hospitals] = await pool.execute('SELECT * FROM hospitals ORDER BY distance ASC');
    res.json({
      success: true,
      data: hospitals
    });
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hospitals',
      error: error.message
    });
  }
});

// GET hospital by ID
router.get('/:id', async (req, res) => {
  try {
    const [hospitals] = await pool.execute(
      'SELECT * FROM hospitals WHERE id = ?',
      [req.params.id]
    );
    
    if (hospitals.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }
    
    res.json({
      success: true,
      data: hospitals[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hospital',
      error: error.message
    });
  }
});

// Search hospitals
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = `%${req.params.query}%`;
    const [hospitals] = await pool.execute(
      'SELECT * FROM hospitals WHERE name LIKE ? OR address LIKE ?',
      [searchQuery, searchQuery]
    );
    
    res.json({
      success: true,
      data: hospitals
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
});

module.exports = router;