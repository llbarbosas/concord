import React from 'react'

import { BrowserRouter as Router, Switch } from 'react-router-dom'
import PrivateRoute from './util/PrivateRoute'

import { AuthProvider, useAuth } from './providers/Auth'
import { ChatProvider } from './providers/Chat'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <AppRouter />
      </ChatProvider>
    </AuthProvider>
  )
}

function AppRouter() {
  const { isAuthenticated } = useAuth()

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/login" allowed={!isAuthenticated}>
          <Login />
        </PrivateRoute>
        <PrivateRoute path="/register" allowed={!isAuthenticated}>
          <Login />
        </PrivateRoute>
        <PrivateRoute path="/" allowed={isAuthenticated}>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}
