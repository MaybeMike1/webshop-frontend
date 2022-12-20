import React, { ReactNode, useEffect } from 'react'
import { User } from '../@types/User'
import { UserCredentials } from '../@types/userCredentials'
import { userService } from '../Services/authService'
import { CookiesProvider, useCookies } from 'react-cookie'
import jwtDecode from 'jwt-decode'
import { httpService } from '../Services/httpService'

interface AuthState {
  currentUser: User | null
  register: (email: string, password: string) => Promise<User | null>
  login: (email: string, password: string) => Promise<User | null>
  logout: () => void
  resetPassword: (email: string) => void
}

let user : User;


const initialAuthState: AuthState = {
  currentUser: null,
  register: async (email: string, password: string) => {
    return user
  },
  login: async (email: string, password: string) => {
    return user
  },
  logout: () => {},
  resetPassword: (email: string) => {},
}

const AuthContext = React.createContext<AuthState>(initialAuthState)

export function useAuth() {
  return React.useContext(AuthContext)
}

interface AuthProviderProps {
  children: any
}

export function AuthProvider(props: AuthProviderProps) {
  const [cookie, setCookie, ] = useCookies(['token'])
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [
    userCredentials,
    setUserCredentials,
  ] = React.useState<UserCredentials | null>(null)

  async function register(email: string, password: string) {
    setUserCredentials({ email: email, password: password })
    userService.register({ email: email, password: password })
      .then((data : string) => {
        setCookie('token', data)
        httpService.setJwt(data);
        setCurrentUser(jwtDecode(data))
        return data
      })

      return currentUser
  }

  async function login(email: string, password: string) {
    setUserCredentials({ email: email, password: password })
    userService.login({ email: email, password: password }).then((data) => {
      handleCookie("Bearer " + data)
      setCurrentUser(jwtDecode(data))
    })
    return currentUser
  }

  function handleCookie(token: string | null) {
    setCookie('token', token, { path: '/' })
  }
  async function logout() {
    setCurrentUser(null)
    handleCookie(null);

    await userService.logout()
    return currentUser
  }

  function resetPassword(email: string) {}

  useEffect(() => {
    setCurrentUser(currentUser)
  }, [currentUser])

  const value: AuthState = {
    currentUser,
    login,
    register,
    logout,
    resetPassword,
  }

  return (
    <CookiesProvider>
      <AuthContext.Provider value={value}>
        {!loading && props.children}
      </AuthContext.Provider>
    </CookiesProvider>
  )
}
