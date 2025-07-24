import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8090/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout: 10000,
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('Error en interceptor de petición:', error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            console.error('Error en interceptor de respuesta (HTTP):', status, data);
        } else if (error.request) {
            console.error('Error en interceptor de respuesta (sin respuesta del servidor):', error.message);
        } else {
            console.error('Error en interceptor de respuesta (error de configuración):', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosClient;