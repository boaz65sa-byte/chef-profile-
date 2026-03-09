import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Simple password guard for local use.
// Replace with Supabase auth:
//   import { signInWithPassword } from '../lib/supabase'
//   const { error } = await signInWithPassword(email, password)
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin1234'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate brief latency
    await new Promise((r) => setTimeout(r, 400))

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Incorrect password. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 50%)',
        backgroundSize: '20px 20px',
      }} />

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="font-serif text-3xl text-white tracking-wider">
            Chef <span className="text-gold">Boaz Saada</span>
          </p>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
          <p className="text-gray-500 text-xs tracking-widest uppercase mt-4">Admin Access</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 p-8">
          <h1 className="font-serif text-xl text-white mb-6">Sign In</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="admin-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                placeholder="Enter admin password"
                className="admin-input"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm border border-red-400/20 bg-red-400/5 px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying…' : 'Access Dashboard'}
            </button>
          </form>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-gray-600 hover:text-gold text-xs tracking-widest uppercase transition-colors">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  )
}
