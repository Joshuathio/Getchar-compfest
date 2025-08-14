import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Calendar, Clock, User, Building2, 
  CheckCircle, AlertCircle, ChevronRight,
  Stethoscope, MapPin, Phone
} from 'lucide-react'
import api from '../services/api'

function BookingPage({ user }) {
  const navigate = useNavigate()
  const [hospitals, setHospitals] = useState([])
  const [selectedHospital, setSelectedHospital] = useState('')
  const [doctorName, setDoctorName] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

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
        setStep(4) // Show success screen
        setTimeout(() => {
          navigate('/')
        }, 3000)
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Booking gagal. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00'
  ]

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Berhasil!</h2>
          <p className="text-gray-600 mb-6">Appointment Anda telah dikonfirmasi</p>
          <div className="bg-indigo-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Nomor Antrian</p>
            <p className="text-2xl font-bold text-indigo-600">A-{Math.floor(Math.random() * 100) + 1}</p>
          </div>
          <p className="text-sm text-gray-500">Anda akan dialihkan ke halaman utama...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium hidden sm:inline">Pilih RS</span>
              </div>
              
              <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
              
              <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium hidden sm:inline">Pilih Dokter</span>
              </div>
              
              <div className={`w-16 h-0.5 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
              
              <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                }`}>
                  3
                </div>
                <span className="ml-2 font-medium hidden sm:inline">Pilih Jadwal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h1 className="text-2xl font-bold flex items-center">
              <Calendar className="w-6 h-6 mr-3" />
              Booking Appointment
            </h1>
            <p className="mt-2 text-blue-100">Buat janji temu dengan dokter pilihan Anda</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            {}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-indigo-600" />
                    Pilih Rumah Sakit
                  </label>
                  <div className="grid gap-3 mt-3">
                    {hospitals.map(hospital => (
                      <label
                        key={hospital.id}
                        className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition ${
                          selectedHospital === hospital.id 
                            ? 'border-indigo-600 bg-indigo-50' 
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="hospital"
                          value={hospital.id}
                          checked={selectedHospital === hospital.id}
                          onChange={(e) => setSelectedHospital(e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                              <p className="text-sm text-gray-600 mt-1 flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {hospital.address}
                              </p>
                            </div>
                            {hospital.bpjsAccepted && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                BPJS
                              </span>
                            )}
                          </div>
                        </div>
                        {selectedHospital === hospital.id && (
                          <CheckCircle className="w-5 h-5 text-indigo-600 ml-3" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!selectedHospital}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 flex items-center"
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Stethoscope className="w-4 h-4 mr-2 text-indigo-600" />
                    Nama Dokter
                  </label>
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    required
                    placeholder="Contoh: Dr. Ahmad Susanto, Sp.PD"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Masukkan nama dokter yang ingin Anda kunjungi
                  </p>
                </div>

                <div className="bg-indigo-50 rounded-xl p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-indigo-600 mt-0.5 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-indigo-900">Tips Memilih Dokter</p>
                      <p className="text-sm text-indigo-700 mt-1">
                        Pastikan dokter yang Anda pilih sesuai dengan keluhan kesehatan Anda
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!doctorName}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 flex items-center"
                  >
                    Selanjutnya
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                    Tanggal Kunjungan
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-600" />
                    Waktu Kunjungan
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <label
                        key={time}
                        className={`relative flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition ${
                          bookingTime === time 
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                            : 'border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="time"
                          value={time}
                          checked={bookingTime === time}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Booking</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rumah Sakit:</span>
                      <span className="font-medium">
                        {hospitals.find(h => h.id === selectedHospital)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dokter:</span>
                      <span className="font-medium">{doctorName}</span>
                    </div>
                    {bookingDate && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tanggal:</span>
                        <span className="font-medium">{bookingDate}</span>
                      </div>
                    )}
                    {bookingTime && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Waktu:</span>
                        <span className="font-medium">{bookingTime}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !bookingDate || !bookingTime}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Konfirmasi Booking
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookingPage