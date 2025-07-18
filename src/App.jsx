

import Header from './components/Header'
import Menu from './pages/Menu'
import Signup from './pages/Signup'
import Order from './pages/Order'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import ContactUs from './pages/ContactUs'
import About from './pages/About'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <Header />
      <main style={{ marginTop: '80px' }}>
        <Routes>
          <Route path="/" element={
            <section id="home" className="hero">
              <div className="hero-content">
                <h1>Welcome to Delicious Bites</h1>
                <p>Experience the finest dining with our carefully crafted menu</p>
                <Link to="/menu" style={{ textDecoration: 'none' }} className="cta-button">View Menu</Link>
              </div>
            </section>
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </main>
    </CartProvider>
  )
}

export default App






