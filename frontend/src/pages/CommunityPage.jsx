import { useState } from 'react'
import { 
  Users, MessageSquare, Heart, Share2, Bookmark, 
  TrendingUp, Clock, Award, Hash, Plus, Search,
  ThumbsUp, MessageCircle, Eye, Filter
} from 'lucide-react'

function CommunityPage() {
  const [activeTab, setActiveTab] = useState('discussions')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock data for community posts
  const discussions = [
    {
      id: 1,
      author: 'Dr. Sarah Johnson',
      avatar: '👩‍⚕️',
      verified: true,
      title: 'Tips Menjaga Kesehatan Mental di Era Digital',
      content: 'Kesehatan mental sama pentingnya dengan kesehatan fisik. Berikut beberapa tips...',
      category: 'Mental Health',
      likes: 234,
      comments: 45,
      views: 1200,
      time: '2 jam yang lalu',
      tags: ['mental-health', 'tips', 'digital-wellness']
    },
    {
      id: 2,
      author: 'Budi Santoso',
      avatar: '👨',
      verified: false,
      title: 'Pengalaman Sembuh dari Diabetes Tipe 2',
      content: 'Saya ingin berbagi pengalaman saya mengontrol diabetes dengan perubahan gaya hidup...',
      category: 'Diabetes',
      likes: 189,
      comments: 67,
      views: 890,
      time: '5 jam yang lalu',
      tags: ['diabetes', 'lifestyle', 'success-story']
    },
    {
      id: 3,
      author: 'Maya Putri',
      avatar: '👩',
      verified: false,
      title: 'Rekomendasi Olahraga untuk Pemula',
      content: 'Bagi yang baru mulai olahraga, ini beberapa tips yang membantu saya konsisten...',
      category: 'Fitness',
      likes: 156,
      comments: 23,
      views: 567,
      time: '1 hari yang lalu',
      tags: ['fitness', 'beginner', 'tips']
    },
    {
      id: 4,
      author: 'Dr. Ahmad Rahman',
      avatar: '👨‍⚕️',
      verified: true,
      title: 'Pentingnya Vaksinasi untuk Anak',
      content: 'Vaksinasi adalah salah satu cara terbaik melindungi anak dari penyakit berbahaya...',
      category: 'Parenting',
      likes: 312,
      comments: 89,
      views: 2100,
      time: '2 hari yang lalu',
      tags: ['vaccination', 'children', 'health']
    }
  ]

  const categories = [
    { id: 'all', name: 'Semua', icon: '🏠', count: 1234 },
    { id: 'mental-health', name: 'Kesehatan Mental', icon: '🧠', count: 234 },
    { id: 'diabetes', name: 'Diabetes', icon: '💉', count: 156 },
    { id: 'fitness', name: 'Fitness', icon: '💪', count: 89 },
    { id: 'nutrition', name: 'Nutrisi', icon: '🥗', count: 201 },
    { id: 'parenting', name: 'Parenting', icon: '👶', count: 145 },
    { id: 'covid', name: 'COVID-19', icon: '😷', count: 78 }
  ]

  const trendingTopics = [
    { tag: 'diabetes-control', posts: 45 },
    { tag: 'mental-health', posts: 38 },
    { tag: 'home-workout', posts: 32 },
    { tag: 'healthy-diet', posts: 28 },
    { tag: 'sleep-quality', posts: 24 }
  ]

  const topContributors = [
    { name: 'Dr. Sarah Johnson', points: 2340, badge: 'Expert' },
    { name: 'Fitri Handayani', points: 1890, badge: 'Helpful' },
    { name: 'Ahmad Rizki', points: 1560, badge: 'Active' },
    { name: 'Dr. Budi Prakoso', points: 1234, badge: 'Expert' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-3 flex items-center">
                <Users className="w-8 h-8 mr-3" />
                Komunitas Kesehatan
              </h1>
              <p className="text-blue-100 max-w-2xl">
                Bergabunglah dengan ribuan anggota untuk berbagi pengalaman, tips kesehatan, dan dukungan
              </p>
              <div className="flex gap-6 mt-6">
                <div>
                  <div className="text-2xl font-bold">12.5K</div>
                  <div className="text-sm text-blue-200">Anggota Aktif</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">3.2K</div>
                  <div className="text-sm text-blue-200">Diskusi</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">45.8K</div>
                  <div className="text-sm text-blue-200">Komentar</div>
                </div>
              </div>
            </div>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg hover:shadow-lg transition flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Buat Diskusi
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {}
          <div className="lg:col-span-1 space-y-6">
            {}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Kategori</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-2">{cat.icon}</span>
                      <span className="text-sm font-medium">{cat.name}</span>
                    </span>
                    <span className="text-xs text-gray-500">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                Topik Trending
              </h3>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center">
                      <Hash className="w-3 h-3 mr-1" />
                      {topic.tag}
                    </span>
                    <span className="text-xs text-gray-400">{topic.posts} posts</span>
                  </div>
                ))}
              </div>
            </div>

            {}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-yellow-500" />
                Top Kontributor
              </h3>
              <div className="space-y-3">
                {topContributors.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.badge}</p>
                      </div>
                    </div>
                    <span className="text-xs text-indigo-600 font-semibold">{user.points} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-3">
            {}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari diskusi, topik, atau pengguna..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                  <select className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    <option>Terbaru</option>
                    <option>Terpopuler</option>
                    <option>Paling Dikomentari</option>
                  </select>
                </div>
              </div>
            </div>

            {}
            <div className="bg-white rounded-xl shadow-sm mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('discussions')}
                  className={`flex-1 px-6 py-3 font-medium transition ${
                    activeTab === 'discussions'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Diskusi
                </button>
                <button
                  onClick={() => setActiveTab('questions')}
                  className={`flex-1 px-6 py-3 font-medium transition ${
                    activeTab === 'questions'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Tanya Dokter
                </button>
                <button
                  onClick={() => setActiveTab('stories')}
                  className={`flex-1 px-6 py-3 font-medium transition ${
                    activeTab === 'stories'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cerita Kesembuhan
                </button>
              </div>
            </div>

            {}
            <div className="space-y-4">
              {discussions.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  {}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                        {post.avatar}
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <p className="font-medium text-gray-900">{post.author}</p>
                          {post.verified && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.time}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                      {post.category}
                    </span>
                  </div>

                  {}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-indigo-600 cursor-pointer">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">{post.content}</p>
                  </div>

                  {}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs text-gray-500 hover:text-indigo-600 cursor-pointer">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center text-gray-600 hover:text-indigo-600 transition">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-indigo-600 transition">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-indigo-600 transition">
                        <Eye className="w-4 h-4 mr-1" />
                        <span className="text-sm">{post.views}</span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-indigo-600 transition">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-indigo-600 transition">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {}
            <div className="text-center mt-6">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                Muat Lebih Banyak
              </button>
            </div>
          </div>
        </div>

        {}
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center">
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default CommunityPage