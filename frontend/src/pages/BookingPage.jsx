import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function BookingPage({ user }) {
  const navigate = useNavigate()
  const [hospitals, setHospitals] = useState([])
  const [selectedHospital, setSelectedHospital] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) {
      alert('Silakan login terlebih dahulu')
      navigate('/login')
      return
    }
    fetchHospitals()
  }, [user, navigate])

  const fetchHospitals = async () => {
    try {
      const response = await api.get('/hospitals')
      setHospitals(response.data.data || [])
    } catch (error) {
      console.error('Error fetching hospitals:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.post('/bookings', {
        userId: user.id,
        hospitalId: selectedHospital,
        doctorName,
        bookingDate,
        bookingTime
      })

      if (response.data.success) {
        alert(`Booking berhasil! Nomor antrian: ${response.data.data.queueNumber}`)
        navigate('/')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Booking gagal. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">📅 Booking Appointment</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Hospital Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Pilih Rumah Sakit
              </label>
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Pilih RS --</option>
                {hospitals.map(hospital => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name} {hospital.bpjsAccepted ? '(BPJS)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nama Dokter
              </label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                required
                placeholder="Dr. Nama Dokter"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Tanggal
              </label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Waktu
              </label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Pilih Waktu --</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Konfirmasi Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingPage