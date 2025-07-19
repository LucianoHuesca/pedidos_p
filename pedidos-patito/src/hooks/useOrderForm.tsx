// src/hooks/useOrderForm.js
import { useState, useCallback } from 'react';
import { getProductByHawa } from '../api/productsApi';
import { createOrder } from '../api/ordersApi';

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
            const allSubmissionPromises = orderItems.map(async (item) => {
                const pedidoData = {
                    hawa: item.hawa,
                    tienda: formData.tienda,
                    cliente: formData.cliente,
                    vendedor: formData.vendedor,
                    descuento: item.descuento || parseFloat(formData.descuento) || 0
                };
                return createOrder(pedidoData);
            });

            await Promise.all(allSubmissionPromises);

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
            console.error('Error al enviar el pedido(s):', err);
            setOrderSubmitError(err.message || 'Ocurrió un error inesperado al procesar el pedido(s).');
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