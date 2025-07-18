

import Header from './components/Header'
import Menu from './components/Menu'
import './App.css'

function App() {
  return (
    <>
      <Header />
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

