import { useState, useEffect } from 'react'
import pizzaImage from '../assets/pizza.jpg'
import './Menu.css'

function Menu() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Predefined images for menu items
  const menuImages = {
    'Extravaganza': 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
    'pepperoni pizza': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
    'supreme pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    'buffalo wings': 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop',
    'bbq wings': 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop',
    'spaghetti carbonara': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    'penne arrabbiata': 'https://images.unsplash.com/photo-1572441713132-51c75654db73?w=400&h=300&fit=crop',
    'fettuccine alfredo': 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&h=300&fit=crop',
    'chicken burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    'caesar salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    'default': pizzaImage, // Fallback image
  }

  const getImageForItem = (itemName) => {
    const normalizedName = itemName.toLowerCase()
    return menuImages[normalizedName] || menuImages['default']
  }

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:8080/menu')
      if (!response.ok) {
        throw new Error('Failed to fetch menu items')
      }
      const data = await response.json()
      setMenuItems(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading menu...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <section id="menu" className="menu">
      <div className="container">
        <h2>Our Delicious Menu</h2>
        <div className="menu-grid">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <img 
                src={getImageForItem(item.name)} 
                alt={item.name}
                className="menu-item-image"
              />
              <div className="menu-item-content">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <p className="price">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Menu

