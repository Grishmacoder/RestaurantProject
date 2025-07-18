import { useState, useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import '../style/Menu.css'
import pizzaImage from "../assets/pizza.jpg";
function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const { addToCart } = useCart();

  // Single default image for all menu items
  const defaultImage = pizzaImage;

  const categories = [
    { id: "all", name: "All Items" },
    { id: 1, name: "Pizzas" },
    { id: 2, name: "Pasta" },
    { id: 3, name: "Side Items" },
    { id: 4, name: "Dips" },
    { id: 5, name: "Drinks" },
  ];

  const handleCategoryChange = async (categoryId) => {
    setActiveCategory(categoryId);
    setLoading(true);

    try {
      let url = "http://localhost:8080/menu";
      if (categoryId !== "all") {
        url += `?categoryId=${categoryId}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/menu");
      if (!response.ok) {
        throw new Error("Failed to fetch menu items");
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading menu...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <section id="menu" className="menu">
      <div className="container">
        <h2>Our Delicious Menu</h2>

        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-tab ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <img
                src={defaultImage}
                alt={item.name}
                className="menu-item-image"
              />
              <div className="menu-item-content">
                <div className="item-header">
                  <h3>{item.name}</h3>
                  {item.category && (
                    <span className="category-badge">{item.category}</span>
                  )}
                </div>
                <p className="description">{item.description}</p>
                <div className="item-footer">
                  <p className="price">${item.price}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {menuItems.length === 0 && (
          <div className="no-items">
            <p>No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;

