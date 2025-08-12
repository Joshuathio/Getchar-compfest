import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

function HomePage() {
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHospitals()
  }, [])

  const fetchHospitals = async () => {
    try {
      const response = await api.get('/hospitals')
      setHospitals(response.data.data || [])
    } catch (error) {
      console.error('Error fetching hospitals:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Selamat Datang di MediCare+
          </h1>
          <p className="text-xl mb-6 opacity-95">
            Solusi kesehatan digital dengan AI Assistant 24/7
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/chat" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-flex items-center"
            >
              <span className="mr-2">🤖</span> Konsultasi AI
            </Link>
            <Link 
              to="/booking" 
              className="bg-blue-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition inline-flex items-center"
            >
              <span className="mr-2">📅</span> Booking Dokter
            </Link>
          </div>
        </div>

        {/* Quick Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '📍', title: 'Cari RS', desc: 'Terdekat & BPJS', color: 'blue' },
            { icon: '📅', title: 'Booking', desc: 'Antrian Online', color: 'green' },
            { icon: '💬', title: 'AI Chat', desc: 'Diagnosa Cepat', color: 'purple' },
            { icon: '📊', title: 'Rekam Medis', desc: 'Riwayat Anda', color: 'orange' }
          ].map((feature, i) => (
            <div 
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4 text-2xl`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Hospital List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">🏥 Rumah Sakit Terdekat</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin text-4xl">⏳</div>
              <p className="mt-2">Loading...</p>
            </div>
          ) : hospitals.length > 0 ? (
            <div className="space-y-4">
              {hospitals.map((hospital) => (
                <div key={hospital.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{hospital.name}</h3>
                      <p className="text-gray-600">{hospital.address}</p>
                      <div className="flex gap-4 mt-2 text-sm">
                        <span>📍 {hospital.distance || '2.5 km'}</span>
                        <span>⭐ {hospital.rating || 4.5}</span>
                        {hospital.bpjsAccepted && (
                          <span className="text-green-600 font-semibold">✓ BPJS</span>
                        )}
                      </div>
                    </div>
                    <Link 
                      to={`/booking?hospital=${hospital.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Booking
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Tidak ada data rumah sakit. Pastikan backend berjalan.
            </p>
          )}
        </div>

        {/* Health Tips */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">💡 Tips Kesehatan Hari Ini</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl mb-2 block">💧</span>
              <h3 className="font-semibold">Hidrasi</h3>
              <p className="text-sm text-gray-600">Minum 8 gelas air per hari</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl mb-2 block">🏃</span>
              <h3 className="font-semibold">Olahraga</h3>
              <p className="text-sm text-gray-600">30 menit aktivitas fisik</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-2xl mb-2 block">😴</span>
              <h3 className="font-semibold">Istirahat</h3>
              <p className="text-sm text-gray-600">Tidur 7-9 jam per malam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage