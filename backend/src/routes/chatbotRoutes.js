const express = require('express');
const router = express.Router();

// Simple chatbot responses
const getBotResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('sakit kepala') || lowerMsg.includes('headache')) {
    return 'Untuk sakit kepala, coba istirahat di tempat yang tenang dan gelap. Minum air putih yang cukup. Jika berlanjut lebih dari 3 hari, konsultasi dengan dokter.';
  } else if (lowerMsg.includes('demam') || lowerMsg.includes('fever')) {
    return 'Untuk demam, istirahat yang cukup, minum banyak air, dan kompres dengan air hangat. Jika demam > 39°C atau berlanjut > 3 hari, segera ke dokter.';
  } else if (lowerMsg.includes('covid') || lowerMsg.includes('corona')) {
    return 'Jika mengalami gejala COVID-19, segera lakukan tes antigen/PCR. Isolasi mandiri dan hubungi fasilitas kesehatan terdekat.';
  } else if (lowerMsg.includes('stress') || lowerMsg.includes('cemas')) {
    return 'Untuk mengatasi stress, coba teknik pernapasan dalam, meditasi, atau olahraga ringan. Jika berlanjut, konsultasi dengan psikolog.';
  } else {
    return 'Mohon jelaskan keluhan Anda dengan lebih detail. Saya siap membantu dengan informasi kesehatan umum.';
  }
};

// Send message
router.post('/message', async (req, res) => {
  try {
    const { message } = req.body;
    const response = getBotResponse(message);
    
    res.json({
      success: true,
      data: {
        response,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Chatbot error',
      error: error.message
    });
  }
});

// Get health tips
router.get('/health-tips', async (req, res) => {
  const tips = [
    { id: 1, title: 'Minum Air Putih', description: 'Minum minimal 8 gelas air putih per hari', icon: '💧' },
    { id: 2, title: 'Olahraga Teratur', description: 'Olahraga minimal 30 menit setiap hari', icon: '🏃' },
    { id: 3, title: 'Tidur Cukup', description: 'Tidur 7-9 jam setiap malam', icon: '😴' },
    { id: 4, title: 'Makan Sehat', description: 'Konsumsi sayur dan buah setiap hari', icon: '🥗' }
  ];
  
  res.json({
    success: true,
    data: tips
  });
});

module.exports = router;