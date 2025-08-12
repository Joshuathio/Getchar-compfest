import { useState } from 'react'
import api from '../services/api'

function ChatPage() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Halo! Saya MediBot, asisten kesehatan AI Anda. Silakan ceritakan keluhan Anda.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = { type: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Send to backend
      const response = await api.post('/chatbot/message', { message: input })
      
      // Add bot response
      const botMessage = { 
        type: 'bot', 
        text: response.data.data.response 
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = { 
        type: 'bot', 
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi.' 
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <h1 className="text-2xl font-bold flex items-center">
              <span className="mr-3 text-3xl">🤖</span>
              AI Health Assistant
            </h1>
            <p className="mt-1 opacity-90">Konsultasi kesehatan 24/7 dengan AI</p>
          </div>
          
          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
                placeholder="Ketik keluhan Anda..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? '...' : 'Kirim'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💡 Contoh: "Saya sakit kepala", "demam 3 hari", "tips kesehatan"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage