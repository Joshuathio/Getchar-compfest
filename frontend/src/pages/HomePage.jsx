import { Link } from 'react-router-dom'
import { 
  MapPin, MessageCircle, Calendar, Activity, 
  Droplets, Heart, Brain, ChevronRight, 
  Phone, Mail, Shield, Users, Clock, Star
} from 'lucide-react'

function HomePage() {
  return (
    <div className="bg-white">
      {}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center text-white">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-6">
              <Shield className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Terpercaya oleh 10,000+ Pasien</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Kesehatan Anda,<br />Prioritas Kami
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Platform kesehatan digital dengan AI Assistant, booking online, 
              dan akses ke rumah sakit terbaik di Indonesia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/chat" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Konsultasi AI Gratis
              </Link>
              <Link 
                to="/booking" 
                className="inline-flex items-center justify-center px-8 py-4 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-400 transition"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Booking Dokter
              </Link>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-white" style={{ clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0 100%)' }}></div>
        </div>
      </section>

      {}
      <section className="py-8 -mt-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">50+</div>
                <div className="text-gray-600 mt-1">Rumah Sakit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">24/7</div>
                <div className="text-gray-600 mt-1">AI Assistant</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">100K+</div>
                <div className="text-gray-600 mt-1">Konsultasi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">4.9</div>
                <div className="text-gray-600 mt-1">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Layanan Unggulan Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Solusi kesehatan terintegrasi untuk kebutuhan Anda dan keluarga
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/maps" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition hover:border-indigo-200 block">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Cari Rumah Sakit</h3>
              <p className="text-gray-600 text-sm">Temukan RS terdekat dengan fasilitas BPJS & filter spesialis</p>
            </Link>

            <Link to="/booking" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition hover:border-indigo-200 block">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Booking Online</h3>
              <p className="text-gray-600 text-sm">Antrian online tanpa perlu datang langsung</p>
            </Link>

            <Link to="/chat" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition hover:border-indigo-200 block">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Health Assistant</h3>
              <p className="text-gray-600 text-sm">Diagnosa awal dengan teknologi AI</p>
            </Link>

            <Link to="/community" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition hover:border-indigo-200 block">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Komunitas</h3>
              <p className="text-gray-600 text-sm">Berbagi pengalaman dengan sesama pasien</p>
            </Link>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Akses Cepat</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Emergency</h3>
                  <p className="text-red-100 mt-1">Layanan darurat 24/7</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">112</p>
                <p className="text-sm text-red-100">Ambulance & Emergency</p>
              </div>
              <button className="mt-4 bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition">
                Hubungi Sekarang
              </button>
            </div>

            {}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">RS Terdekat</h3>
                  <p className="text-blue-100 mt-1">Berdasarkan lokasi Anda</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
              <p className="text-lg font-semibold mb-1">RS Siloam Semanggi</p>
              <p className="text-sm text-blue-100 mb-4">2.3 km dari lokasi Anda</p>
              <Link to="/maps" className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                Lihat di Maps
              </Link>
            </div>

            {/* Health Check Reminder */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">Check-up</h3>
                  <p className="text-green-100 mt-1">Jadwal pemeriksaan</p>
                </div>
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-green-100 mb-2">Pemeriksaan berikutnya:</p>
              <p className="text-lg font-semibold mb-4">15 Januari 2025</p>
              <Link to="/booking" className="inline-block bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition">
                Atur Jadwal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Tips Kesehatan Hari Ini
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Hidrasi Cukup</h3>
                <p className="text-sm text-gray-600">Minum 8 gelas air putih setiap hari</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Olahraga Rutin</h3>
                <p className="text-sm text-gray-600">30 menit aktivitas fisik per hari</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Istirahat Cukup</h3>
                <p className="text-sm text-gray-600">Tidur 7-9 jam setiap malam</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-semibold mb-2">Pola Makan Sehat</h3>
                <p className="text-sm text-gray-600">Konsumsi makanan bergizi seimbang</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Mulai Perjalanan Kesehatan Anda
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Konsultasi gratis dengan AI Assistant kami sekarang
          </p>
          <Link 
            to="/chat"
            className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Mulai Konsultasi
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">+</span>
                </div>
                <span className="font-bold text-xl">MediCare</span>
              </div>
              <p className="text-gray-400">Platform kesehatan digital terpercaya di Indonesia</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Konsultasi AI</li>
                <li>Booking Online</li>
                <li>Cari Rumah Sakit</li>
                <li>Komunitas</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Tentang Kami</li>
                <li>Karir</li>
                <li>Partner</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  021-5555-0123
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@medicare.id
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage