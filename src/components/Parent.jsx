import React, { useState } from 'react'
import Signup from './Singup'
import Login from './Login'
import Welcome from './Welcome'

const Parent = () => {
  const [isSignup, setIsSignup] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)  // new state

  return (
    <div>
      {!isLoggedIn ? (
        isSignup ? (
          <Signup switchToLogin={() => setIsSignup(false)} />
        ) : (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        )
      ) : (
        <Welcome />
      )}
    </div>
  )
}

export default Parent
