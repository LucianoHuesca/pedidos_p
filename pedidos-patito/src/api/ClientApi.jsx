import axiosClient from './axiosClient.jsx';

export const searchClientsByName = async (nombre) => {
    try {
        const response = await axiosClient.get(`/clientes/buscar`, { params: { nombre } });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return [];
        }
        console.error('Error al buscar cliente por nombre:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'Error al buscar cliente por nombre. Inténtalo de nuevo.');
    }
};

export const createClient = async (clientData) => {
    try {
        const response = await axiosClient.post('/clientes', clientData);
        return response.data;
    } catch (error) {
        console.error('Error al crear cliente:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'Error al crear cliente. Inténtalo de nuevo.');
    }
};