// src/utils/axiosConfig.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api'
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance