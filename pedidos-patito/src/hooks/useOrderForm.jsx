import { useState, useCallback } from 'react';
import { getProductByHawa } from '../api/productsApi';
import { createOrder } from '../api/ordersApi';
import { searchClientsByName, createClient } from '../api/clientApi';

export const useOrderForm = () => {
    const [formData, setFormData] = useState({
        tienda: '',
        cliente: '',
        vendedor: '',
        descuento: ''
    });

    const [hawaSearch, setHawaSearch] = useState('');
    const [searchedProduct, setSearchedProduct] = useState(null);
    const [isSearchingProduct, setIsSearchingProduct] = useState(false);
    const [productSearchError, setProductSearchError] = useState(null);

    const [orderItems, setOrderItems] = useState([]);

    const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
    const [orderSubmitError, setOrderSubmitError] = useState(null);
    const [orderSubmitSuccess, setOrderSubmitSuccess] = useState(false);


    const handleFormChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleHawaSearchChange = useCallback((e) => {
        setHawaSearch(e.target.value);
        setSearchedProduct(null);
        setProductSearchError(null);
        setOrderSubmitSuccess(false);
    }, []);

    // @ts-ignore
    const handleSearchProduct = useCallback(async () => {
        if (!hawaSearch.trim()) {
            setProductSearchError('Por favor, ingresa un HAWA para buscar.');
            return;
        }

        setIsSearchingProduct(true);
        setProductSearchError(null);
        setSearchedProduct(null);

        try {
            const product = await getProductByHawa(hawaSearch.trim());
            setSearchedProduct(product);
        } catch (err) {
            setProductSearchError(err.message || 'Error desconocido al buscar el producto.');
        } finally {
            setIsSearchingProduct(false);
        }
    }, [hawaSearch]);

    const addProductToOrder = useCallback(() => {
        if (searchedProduct && searchedProduct.existencias > 0) {
            const isAlreadyAdded = orderItems.some(item => item.hawa === searchedProduct.hawa);
            if (isAlreadyAdded) {
                setProductSearchError('Este producto ya fue agregado al pedido.');
                return;
            }

            setOrderItems(prevItems => [
                ...prevItems,
                { ...searchedProduct, cantidad: 1 }
            ]);
            setHawaSearch('');
            setSearchedProduct(null);
            setProductSearchError(null);
        } else if (searchedProduct && searchedProduct.existencias <= 0) {
            setProductSearchError('Este producto no tiene existencias para ser agregado.');
        }
    }, [searchedProduct, orderItems]);

    const removeProductFromOrder = useCallback((hawaToRemove) => {
        setOrderItems(prevItems => prevItems.filter(item => item.hawa !== hawaToRemove));
    }, []);

    const submitOrder = useCallback(async () => {
        if (orderItems.length === 0) {
            setOrderSubmitError('El pedido debe contener al menos un producto.');
            return;
        }
        if (!formData.tienda.trim() || !formData.cliente.trim() || !formData.vendedor.trim()) {
            setOrderSubmitError('Por favor, completa todos los datos del cliente, vendedor y tienda.');
            return;
        }

        setIsSubmittingOrder(true);
        setOrderSubmitError(null);
        setOrderSubmitSuccess(false);

        try {
            let clienteId;
            const clientName = formData.cliente.trim();

            const existingClients = await searchClientsByName(clientName);

            if (existingClients && existingClients.length > 0) {
                clienteId = existingClients[0].id;
            } else {
                const newClientData = {
                    nombre: clientName,
                    email: `${clientName.toLowerCase().replace(/\s/g, '')}@example.com`,
                    telefono: 'N/A'
                };
                const createdClient = await createClient(newClientData);
                clienteId = createdClient.id;
            }

            const finalPedidoData = {
                idTienda: formData.tienda,
                nombreVendedor: formData.vendedor,
                descuento: formData.descuento === '' ? null : parseFloat(formData.descuento),

                cliente: { id: clienteId },

                detalles: orderItems.map(item => ({
                    hawa: item.hawa,
                    cantidad: item.cantidad || 1,
                    precioUnitario: item.precioLista,
                    descuento: item.descuento
                }))
            };

            await createOrder(finalPedidoData);

            // Si todo es exitoso, reinicia los estados del formulario
            setOrderSubmitSuccess(true);
            setOrderItems([]);
            setHawaSearch('');
            setSearchedProduct(null);
            setFormData({
                tienda: '',
                cliente: '',
                vendedor: '',
                descuento: ''
            });
        } catch (err) {
            console.error('Error al enviar el pedido:', err);
            setOrderSubmitError(err.message || 'Ocurrió un error inesperado al procesar el pedido.');
        } finally {
            setIsSubmittingOrder(false);
        }
    }, [formData, orderItems]);

    return {
        formData,
        handleFormChange,

        hawaSearch,
        handleHawaSearchChange,
        searchedProduct,
        isSearchingProduct,
        productSearchError,
        handleSearchProduct,

        orderItems,
        addProductToOrder,
        removeProductFromOrder,

        isSubmittingOrder,
        orderSubmitError,
        orderSubmitSuccess,
        submitOrder,
    };
};