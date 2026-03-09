import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
import Landing from './pages/Landing'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  )
}
