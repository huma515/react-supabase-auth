import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Singup from './components/Singup'
import Login from './components/Login'
import Parent from './components/Parent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Parent/>
    </>
  )
}

export default App
