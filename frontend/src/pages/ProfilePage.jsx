import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProfilePage({ user }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please login to view profile</h2>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user.firstName?.[0] || 'U'}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
                  📱 {user.phone || 'No phone'}
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                  ✓ Verified Member
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">
                  📅 Member since 2024
                </span>
              </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition">
              Edit Profile
            </button>
          </div>
        </div>

        {}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            {['overview', 'appointments', 'medical', 'settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 capitalize font-medium transition ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-blue-600 text-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="text-3xl mb-2">📅</div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-gray-600">Total Appointments</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <div className="text-3xl mb-2">💬</div>
                  <div className="text-2xl font-bold">48</div>
                  <div className="text-gray-600">AI Consultations</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <div className="text-3xl mb-2">📝</div>
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-gray-600">Medical Records</div>
                </div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Appointment History</h3>
                <p className="text-gray-600">No appointments yet</p>
              </div>
            )}

            {activeTab === 'medical' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Medical Records</h3>
                <p className="text-gray-600">No medical records uploaded</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Account Settings</h3>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage