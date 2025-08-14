// frontend/src/App.jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Menu, X, Home, MessageCircle, Calendar, User, LogOut, MapPin, Users } from 'lucide-react'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import BookingPage from './pages/BookingPage'
import LoginPage from './pages/LoginPage'
import MapsPage from './pages/MapsPage'
import CommunityPage from './pages/CommunityPage'
import './index.css'

function App() {
  const [user, setUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">+</span>
                </div>
                <span className="font-bold text-xl text-gray-900">MediCare</span>
              </Link>
              
              {}
              <div className="hidden md:flex items-center space-x-1">
                <Link to="/" className="flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
                <Link to="/maps" className="flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                  <MapPin className="w-4 h-4 mr-2" />
                  Maps
                </Link>
                <Link to="/chat" className="flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Chat
                </Link>
                <Link to="/booking" className="flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                  <Calendar className="w-4 h-4 mr-2" />
                  Booking
                </Link>
                <Link to="/community" className="flex items-center px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition">
                  <Users className="w-4 h-4 mr-2" />
                  Komunitas
                </Link>
                {user ? (
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg">
                      <User className="w-4 h-4 mr-2" />
                      <span className="font-medium">{user.firstName}</span>
                    </div>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    to="/login" 
                    className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition"
                  >
                    Login
                  </Link>
                )}
              </div>

              {}
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {}
            {mobileMenuOpen && (
              <div className="md:hidden py-4 border-t border-gray-200">
                <Link to="/" className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg">
                  <Home className="w-4 h-4 mr-3" />
                  Home
                </Link>
                <Link to="/maps" className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg">
                  <MapPin className="w-4 h-4 mr-3" />
                  Maps
                </Link>
                <Link to="/chat" className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg">
                  <MessageCircle className="w-4 h-4 mr-3" />
                  AI Chat
                </Link>
                <Link to="/booking" className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg">
                  <Calendar className="w-4 h-4 mr-3" />
                  Booking
                </Link>
                <Link to="/community" className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg">
                  <Users className="w-4 h-4 mr-3" />
                  Komunitas
                </Link>
                {user ? (
                  <>
                    <div className="px-4 py-3 text-gray-700 bg-indigo-50 rounded-lg mt-2">
                      <User className="w-4 h-4 inline mr-2" />
                      {user.firstName} {user.lastName}
                    </div>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 rounded-lg"
                    >
                      <LogOut className="w-4 h-4 inline mr-3" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="block px-4 py-3 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-center">
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>

        {}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/booking" element={<BookingPage user={user} />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App