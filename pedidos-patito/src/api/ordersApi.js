import axiosClient from './axiosClient.jsx';

export const createOrder = async (orderData) => {
    try {
        const response = await axiosClient.post('/pedidos', orderData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el pedido:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'Error al registrar el pedido. Verifica los datos.');
    }
};

export const fetchOrders = async () => {
    try {
        const response = await axiosClient.get('/pedidos');
        return response.data;
    } catch (error) {
        console.error('Error al cargar los pedidos:', error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || 'No se pudieron cargar los pedidos. Inténtalo de nuevo.');
    }
};
/*
export const getOrderById = async (id) => {
    try {
        const response = await axiosClient.get(`/pedidos/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error(`Pedido con ID ${id} no encontrado.`);
        }
        console.error(`Error al obtener pedido ${id}:`, error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || `Error al obtener pedido ${id}.`);
    }
};*/

export const updateOrderStatus = async (id, newStatus) => {
    try {
        const response = await axiosClient.put(`/pedidos/${id}/estatus`, { estatus: newStatus });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        }
        console.error(`Error al actualizar el estado del pedido ${id}:`, error.response ? error.response.data : error.message);
        throw new Error(error.response?.data?.message || `Error al actualizar el estado del pedido ${id}.`);
    }
};
