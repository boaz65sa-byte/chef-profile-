import { Navigate } from 'react-router-dom'

// Simple session check — replace with Supabase auth check when wiring up backend
// e.g. const { data: { session } } = await supabase.auth.getSession()
export default function ProtectedRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem('admin_authenticated') === 'true'

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return children
}
