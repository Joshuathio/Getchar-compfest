// frontend/src/App.jsx
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import BookingPage from './pages/BookingPage'
import LoginPage from './pages/LoginPage'
import './index.css'

function App() {
  const [user, setUser] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in
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
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl">🏥</span>
                <span className="font-bold text-xl">MediCare+</span>
              </Link>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="hover:text-blue-200 transition">Home</Link>
                <Link to="/chat" className="hover:text-blue-200 transition">AI Chat</Link>
                <Link to="/booking" className="hover:text-blue-200 transition">Booking</Link>
                {user ? (
                  <>
                    <span>Hi, {user.firstName}!</span>
                    <button onClick={handleLogout} className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30">
                    Login
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden pb-4">
                <Link to="/" className="block py-2 hover:text-blue-200">Home</Link>
                <Link to="/chat" className="block py-2 hover:text-blue-200">AI Chat</Link>
                <Link to="/booking" className="block py-2 hover:text-blue-200">Booking</Link>
                {user ? (
                  <button onClick={handleLogout} className="block w-full text-left py-2 hover:text-blue-200">
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="block py-2 hover:text-blue-200">Login</Link>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/booking" element={<BookingPage user={user} />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App