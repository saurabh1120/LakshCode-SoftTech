// import axios from 'axios'

// const API = axios.create({
//   baseURL: 'http://localhost:8080/api',
// })

// API.interceptors.request.use(
//   function(config) {
//     const token = localStorage.getItem('lakshcode_token')
//     if (token) {
//       config.headers['Authorization'] = 'Bearer ' + token
//     }
//     return config
//   },
//   function(error) {
//     return Promise.reject(error)
//   }
// )

// API.interceptors.response.use(
//   function(response) {
//     return response
//   },
//   function(error) {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem('lakshcode_token')
//       window.location.href = '/admin/login'
//     }
//     return Promise.reject(error)
//   }
// )

// export default API
import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
})

API.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('lakshcode_token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  function(response) { return response },
  function(error) {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('lakshcode_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export default API