import './App.css'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { useAuth } from './hooks/useAuth'

function App() {
  const { isAuthenticated } = useAuth()

  return (
    (isAuthenticated) ? (
      <Dashboard />
    ) : (
      <Login />
    )
  )
}

export default App
