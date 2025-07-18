import { useState } from 'react'
import { useCart } from '../hooks/useCart'
import '../style/Order.css'

function Order() {
  const { cart, updateQuantity, removeFromCart, getTotal, clearCart } = useCart()
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    })
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    
    const orderData = {
      items: cart.items,
      total: getTotal(),
      customer: customerInfo,
      orderDate: new Date().toISOString()
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      })

      if (response.ok) {
        setOrderPlaced(true)
        clearCart()
      } else {
        alert('Failed to place order. Please try again.')
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    }
  }

  if (orderPlaced) {
    return (
      <div className="order-success">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order. We'll contact you soon with delivery details.</p>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Add some delicious items from our menu!</p>
      </div>
    )
  }

  return (
    <div className="order-page">
      <div className="container">
        <h2>Your Order</h2>
        
        <div className="order-content">
          <div className="cart-items">
            <h3>Cart Items</h3>
            {cart.items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-price">${item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <div className="cart-total">
              <h3>Total: ${getTotal().toFixed(2)}</h3>
            </div>
          </div>

          <div className="customer-form">
            <h3>Customer Information</h3>
            <form onSubmit={handlePlaceOrder}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>
              
              <button type="submit" className="place-order-btn">
                Place Order - ${getTotal().toFixed(2)}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Order
