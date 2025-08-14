import { useState, useEffect } from 'react'
import { 
  MapPin, Filter, Navigation, Star, Clock, Shield, 
  Search, X, ChevronDown, Phone, Stethoscope,
  Building2, AlertCircle, ChevronRight
} from 'lucide-react'
import api from '../services/api'

function MapsPage() {
  const [hospitals, setHospitals] = useState([])
  const [filteredHospitals, setFilteredHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState(null)
  const [selectedHospital, setSelectedHospital] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter
  const [filters, setFilters] = useState({
    bpjs: false,
    specialist: '',
    distance: '10',
    rating: '0',
    emergency: false,
    search: ''
  })

  const specialists = [
    'Umum', 'Anak', 'Kandungan', 'Jantung', 'Paru', 
    'Saraf', 'Bedah', 'Mata', 'THT', 'Kulit', 'Gigi'
  ]

  useEffect(() => {
    fetchHospitals()
    getUserLocation()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, hospitals])

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error('Error getting location:', error)
          // Default location (Jakarta)
          setUserLocation({
            lat: -6.2088,
            lng: 106.8456
          })
        }
      )
    }
  }

  const fetchHospitals = async () => {
    try {
      const response = await api.get('/hospitals')
      const hospitalsWithDetails = (response.data.data || []).map(h => ({
        ...h,
        lat: -6.2088 + (Math.random() - 0.5) * 0.1,
        lng: 106.8456 + (Math.random() - 0.5) * 0.1,
        specialists: ['Umum', 'Anak', 'Kandungan', 'Jantung'].slice(0, Math.floor(Math.random() * 4) + 1),
        emergency: Math.random() > 0.5,
        operatingHours: '24 Jam'
      }))
      setHospitals(hospitalsWithDetails)
      setFilteredHospitals(hospitalsWithDetails)
    } catch (error) {
      console.error('Error fetching hospitals:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...hospitals]

    // BPJS filter
    if (filters.bpjs) {
      filtered = filtered.filter(h => h.bpjsAccepted)
    }

    // Specialist filter
    if (filters.specialist) {
      filtered = filtered.filter(h => 
        h.specialists && h.specialists.includes(filters.specialist)
      )
    }

    // Distance filter
    const maxDistance = parseFloat(filters.distance)
    filtered = filtered.filter(h => {
      const distance = parseFloat(h.distance) || 0
      return distance <= maxDistance
    })

    // Rating filter
    const minRating = parseFloat(filters.rating)
    filtered = filtered.filter(h => 
      (h.rating || 0) >= minRating
    )

    // Emergency filter
    if (filters.emergency) {
      filtered = filtered.filter(h => h.emergency)
    }

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(h =>
        h.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        h.address.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    setFilteredHospitals(filtered)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      bpjs: false,
      specialist: '',
      distance: '10',
      rating: '0',
      emergency: false,
      search: ''
    })
  }

  const getDirections = (hospital) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${hospital.lat},${hospital.lng}`
      window.open(url, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-indigo-600" />
                Peta Rumah Sakit
              </h1>
              <p className="text-gray-600 mt-1">
                {userLocation ? 'Menampilkan rumah sakit terdekat dari lokasi Anda' : 'Mengaktifkan lokasi...'}
              </p>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {}
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari rumah sakit..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filter Pencarian</h3>
              <button
                onClick={resetFilters}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                Reset Filter
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.bpjs}
                    onChange={(e) => handleFilterChange('bpjs', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Menerima BPJS
                  </span>
                </label>
              </div>

              {}
              <div>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.emergency}
                    onChange={(e) => handleFilterChange('emergency', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Unit Gawat Darurat
                  </span>
                </label>
              </div>

              {}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dokter Spesialis
                </label>
                <select
                  value={filters.specialist}
                  onChange={(e) => handleFilterChange('specialist', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Semua Spesialis</option>
                  {specialists.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              {}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jarak Maksimal: {filters.distance} km
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={filters.distance}
                  onChange={(e) => handleFilterChange('distance', e.target.value)}
                  className="w-full"
                />
              </div>

              {}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating Minimal: {filters.rating} ⭐
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {}
        <div className="grid lg:grid-cols-2 gap-6">
          {}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-[600px] bg-gray-100 relative">
              {}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Peta Interaktif</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Integrasi dengan Google Maps API
                  </p>
                </div>
              </div>
              
              {}
              {userLocation && (
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3">
                  <div className="flex items-center text-sm">
                    <Navigation className="w-4 h-4 text-blue-600 mr-2" />
                    <span>Lokasi Anda</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  Ditemukan {filteredHospitals.length} Rumah Sakit
                </h3>
                <span className="text-sm text-gray-500">
                  Urutkan: Terdekat
                </span>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent mx-auto"></div>
                  <p className="mt-4 text-gray-600">Memuat data...</p>
                </div>
              ) : filteredHospitals.length > 0 ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {filteredHospitals.map((hospital) => (
                    <div 
                      key={hospital.id}
                      className={`border rounded-xl p-4 hover:shadow-md transition cursor-pointer ${
                        selectedHospital?.id === hospital.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedHospital(hospital)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {hospital.address}
                          </p>
                        </div>
                        <span className="text-sm font-medium text-indigo-600">
                          {hospital.distance || '2.5 km'}
                        </span>
                      </div>

                      {}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {hospital.bpjsAccepted && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            BPJS
                          </span>
                        )}
                        {hospital.emergency && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                            UGD 24 Jam
                          </span>
                        )}
                        {hospital.specialists?.slice(0, 2).map(spec => (
                          <span key={spec} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {spec}
                          </span>
                        ))}
                        {hospital.specialists?.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{hospital.specialists.length - 2} lainnya
                          </span>
                        )}
                      </div>

                      {}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-3 text-gray-500">
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-500" />
                            {hospital.rating || '4.5'}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {hospital.operatingHours}
                          </span>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            getDirections(hospital)
                          }}
                          className="flex items-center text-indigo-600 hover:text-indigo-700"
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Petunjuk Arah
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Tidak ada rumah sakit yang sesuai filter</p>
                  <button
                    onClick={resetFilters}
                    className="mt-3 text-indigo-600 hover:text-indigo-700 text-sm"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {}
        {selectedHospital && (
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedHospital.name}</h3>
                <p className="text-gray-600 mt-1">{selectedHospital.address}</p>
              </div>
              <button
                onClick={() => setSelectedHospital(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Informasi Kontak</h4>
                <div className="space-y-2">
                  <p className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {selectedHospital.phone || '021-1234567'}
                  </p>
                  <p className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {selectedHospital.operatingHours}
                  </p>
                  <p className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {selectedHospital.distance} dari lokasi Anda
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Layanan Tersedia</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedHospital.specialists?.map(spec => (
                    <span key={spec} className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                      <Stethoscope className="w-3 h-3 inline mr-1" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => getDirections(selectedHospital)}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Petunjuk Arah
              </button>
              <button
                onClick={() => window.location.href = `/booking?hospital=${selectedHospital.id}`}
                className="flex-1 bg-white border border-indigo-600 text-indigo-600 py-3 rounded-lg hover:bg-indigo-50 transition flex items-center justify-center"
              >
                Booking Sekarang
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapsPage