import axios from 'axios'

// Create an instance of Axios
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1', // Laravel API base URL
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// Add a request interceptor to add the Authorization header
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
