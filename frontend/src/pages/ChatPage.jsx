import { useState } from 'react'
import { Send, Bot, User, Sparkles, Info, RefreshCw } from 'lucide-react'
import api from '../services/api'

function ChatPage() {
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: 'Halo! Saya MediBot, asisten kesehatan AI Anda. Ceritakan keluhan atau pertanyaan kesehatan Anda, saya siap membantu 24/7.' 
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const quickQuestions = [
    "Saya demam dan sakit kepala",
    "Tips menjaga kesehatan",
    "Gejala COVID-19",
    "Cara menurunkan tekanan darah"
  ]

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { type: 'user', text: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await api.post('/chatbot/message', { message: input })
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

  const handleQuickQuestion = (question) => {
    setInput(question)
  }

  const clearChat = () => {
    setMessages([
      { 
        type: 'bot', 
        text: 'Halo! Saya MediBot, asisten kesehatan AI Anda. Ceritakan keluhan atau pertanyaan kesehatan Anda, saya siap membantu 24/7.' 
      }
    ])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid lg:grid-cols-4 gap-6">
          {}
          <div className="lg:col-span-1 space-y-4">
            {}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="ml-3 font-semibold text-gray-900">AI Assistant</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Dapatkan informasi kesehatan dan saran medis awal dari AI Assistant kami.
              </p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <Info className="w-4 h-4 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-xs text-gray-600">Rekomendasi kesehatan personal</p>
                </div>
              </div>
              <button 
                onClick={clearChat}
                className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear Chat
              </button>
            </div>

            {}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Pertanyaan Cepat</h3>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition text-sm"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px]">
              {}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-white">MediBot Assistant</h2>
                    <p className="text-blue-100 text-sm">Online • Siap membantu Anda</p>
                  </div>
                </div>
              </div>
              
              {}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                        msg.type === 'user' 
                          ? 'bg-indigo-600 ml-3' 
                          : 'bg-gray-200 mr-3'
                      }`}>
                        {msg.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                      <div 
                        className={`px-4 py-3 rounded-xl ${
                          msg.type === 'user' 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                        <Bot className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 px-4 py-3 rounded-xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
                    placeholder="Ketik keluhan atau pertanyaan kesehatan Anda..."
                    className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  💡 MediBot memberikan saran kesehatan awal. Untuk diagnosis akurat, konsultasi dengan dokter.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage