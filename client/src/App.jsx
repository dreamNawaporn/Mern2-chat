import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UserContext } from './context/UserContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <Routes/>
    </UserContextProvider>
  )
}

export default App
