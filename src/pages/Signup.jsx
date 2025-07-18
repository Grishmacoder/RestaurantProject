import { useState } from 'react'
import '../style/Signup.css'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    // lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          // phone: formData.phone
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create account')
      }

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        // phone: ''
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="signup-container">
        <div className="signup-form">
          <div className="success-message">
            <h2>Account Created Successfully!</h2>
            <p>Welcome to Delicious Bites. Your account has been created.</p>
            <button 
              onClick={() => setSuccess(false)} 
              className="signup-button"
            >
              Create Another Account
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Join Delicious Bites</h2>
        <p className="signup-subtitle">Create your account today</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full name"
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Last name"
              />
            </div> */}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup