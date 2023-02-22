import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies"

interface SignInData {
  email: string
  password: string
}

interface UserProps {
  id: number
  name: string
  email: string
}

interface AuthContextProps {
  isAuthenticated: boolean
  logIn: (data: SignInData) => void
  user: UserProps
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({children}) {
  const [user, setUser] = useState({} as UserProps | undefined)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const { 'notes.token': token } = parseCookies()
    if (token) {
      getUser(token)
    }
  }, [])

  async function getUser(token) {
    await axios.get('https://notes.elielson.net/api/user', {
      headers: {
        'Authorization': `Bearer ` + token
      }
    })
      .then(({data}) => {
        setUser(data)
        setIsAuthenticated(true)
      })
      .catch(e => {
        console.error(e)
        setIsAuthenticated(false)
      })
  }

  async function logIn({ email, password }: SignInData) {
    await axios.post('https://notes.elielson.net/api/token/create', {
      email,
      password
    })
      .then(({data}) => {
          setCookie(undefined, 'notes.token', data.token.plainTextToken, {
          maxAge: 60 * 60 * 1 // 1 hour
          })
          setIsAuthenticated(true)
      })
      .catch(error => console.error(error))
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}