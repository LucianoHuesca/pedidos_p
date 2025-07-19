import axiosClient from './axiosClient';

// GET http://localhost:8090/api/productos/hawa/{hawa}
export const getProductByHawa = async (hawa) => {
    try {
        const response = await axiosClient.get(`/productos/hawa/${hawa}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('Producto no encontrado. Verifica el HAWA.');
        }
        console.error("Error al consultar el producto:", error);
        throw new Error(error.response?.data?.message || 'Error al consultar el producto. Inténtalo de nuevo.');
    }
};