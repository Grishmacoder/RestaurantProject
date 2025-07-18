import './Header.css'
import { Link } from 'react-router-dom'
function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>Delicious Bites</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/order">Cart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header


