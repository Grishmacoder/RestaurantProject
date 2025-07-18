

import { useState } from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import Signup from './components/Signup'
import './App.css'

function App() {
  const [showSignup, setShowSignup] = useState(false)

  const handleShowSignup = () => {
    setShowSignup(true)
  }

  const handleBackToHome = () => {
    setShowSignup(false)
  }

  if (showSignup) {
    return (
      <div>
        <button 
          onClick={handleBackToHome} 
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1001,
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Back to Home
        </button>
        <Signup />
      </div>
    )
  }

  return (
    <>
      <Header onShowSignup={handleShowSignup} />
      <main style={{ marginTop: '80px' }}>
        <section id="home" className="hero">
          <div className="hero-content">
            <h1>Welcome to Delicious Bites</h1>
            <p>Experience the finest dining with our carefully crafted menu</p>
            <button className="cta-button">View Menu</button>
          </div>
        </section>
        <Menu />
      </main>
    </>
  )
}

export default App



