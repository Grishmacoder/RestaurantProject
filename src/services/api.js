import axios from 'axios'
const API_BASE_URL = 'http://localhost:8080'

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  axios.post(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
 
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// Menu API calls
export const menuAPI = {
  getAll: () => apiCall('/menu'),
  getById: (id) => apiCall(`/menu/${id}`),
  // create: (menuItem) => apiCall('/menu', {
  //   method: 'POST',
  //   body: JSON.stringify(menuItem),
  // }),
  // update: (id, menuItem) => apiCall(`/menu/${id}`, {
  //   method: 'PUT',
  //   body: JSON.stringify(menuItem),
  // }),
  delete: (id) => apiCall(`/menu/${id}`, {
    method: 'DELETE',
  }),
}

// Orders API calls
// export const orderAPI = {
//   create: (order) => apiCall('/orders', {
//     method: 'POST',
//     body: JSON.stringify(order),
//   }),
//   getAll: () => apiCall('/orders'),
//   getById: (id) => apiCall(`/orders/${id}`),
//   updateStatus: (id, status) => apiCall(`/orders/${id}/status`, {
//     method: 'PATCH',
//     body: JSON.stringify({ status }),
//   }),
// }

