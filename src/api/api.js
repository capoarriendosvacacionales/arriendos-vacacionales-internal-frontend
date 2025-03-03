import axios from 'axios'
import router from '../router/index'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

// Interceptor para añadir el token en cada request
api.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor de respuesta: si se recibe un error 401, redirige a la ruta de login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirige a la ruta de login
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  },
)

export default api
