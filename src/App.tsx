import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div>
        <h1>Ishmael Mawusi Akaboa</h1>
      </div>
    </>
  )
}

export default App
