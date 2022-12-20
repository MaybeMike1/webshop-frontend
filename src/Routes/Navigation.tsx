import React, { useEffect, useState } from 'react'
import { Router, Route, useNavigate } from 'react-router'
import { BrowserRouter, Link, Routes } from 'react-router-dom'
import { User } from '../@types/User'
import { LandingPage } from '../Pages/LandingPage'
import { LoginPage } from '../Pages/LoginPage'
import { useAuth } from './AuthContext'
import jwtDecode from 'jwt-decode'

import Cookie from 'js-cookie'
import NavigationBar from '../components/NavigationBar'
import { ProfilePage } from '../Pages/ProfilePage'
import { AdminPanel } from '../Pages/AdminPanel'

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const [user, setUser] = React.useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const token = Cookie.get('token')?.split(' ')[1] || null
    setToken(token)
    if(token) {
      setUser(jwtDecode(token ?? ''))
    }
    
  }, [token])

  const routes = [
    <Route key="landingPage" path="/" element={<LandingPage />} />,
    <Route
      key={'login'}
      path="/login"
      element={user ? <LandingPage /> : <LoginPage />}
    />,
    <Route key="privatePage" path="/profile" element={user ? <ProfilePage user={user}/> : <LoginPage/>} />,
    <Route key="adminPanel" path="/admin" element={user?.isAdmin ? <AdminPanel user={user} /> : <LoginPage />} />,
  ]

  return (
    <BrowserRouter>
      <NavigationBar user={user ?? null} token={token ?? ""}>
        <Routes>{routes}</Routes>
      </NavigationBar>
    </BrowserRouter>
  )
}

export default Navigation
