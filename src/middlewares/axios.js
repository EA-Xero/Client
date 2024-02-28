import axios from 'axios';
axios.defaults.timeout = 60000;
// Crear una instancia de Axios con una configuración base
const axiosInstance = axios.create({
  baseURL: 'https://host-4dxa.onrender.com', // URL base de tu API
});

// Interceptar las solicitudes salientes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adjuntar el token como encabezado de autorización
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
