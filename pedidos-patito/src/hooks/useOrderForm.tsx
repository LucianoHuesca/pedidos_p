import axiosClient from './axiosClient';

export const getProductByHawa = async (hawa) => {
    try
        const response = await axiosClient.get(`/productos/hawa/${hawa}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error('Producto no encontrado. Verifica el HAWA.');
        }
        console.error("Error al consultar el producto:", error);
        throw new Error('Error al consultar el producto. Inténtalo de nuevo.');
    }
};

// Puedes añadir más funciones para otras operaciones de productos si es necesario