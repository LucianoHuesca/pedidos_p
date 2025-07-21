// src/pages/ListadoPedidos.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Button, Spinner, Alert, Card } from 'react-bootstrap';

import { fetchOrders, updateOrderStatus, deleteOrder } from '../api/ordersApi.js';

function ListadoPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState(null);
    const [feedbackVariant, setFeedbackVariant] = useState(null);

    const loadPedidosFromBackend = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setFeedbackMessage(null);
        try {
            const data = await fetchOrders();
            setPedidos(data);
        } catch (err) {
            console.error("Error al cargar los pedidos:", err);
            setError(new Error(err.message || 'No se pudieron cargar los pedidos. Por favor, intente de nuevo.'));
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadPedidosFromBackend();
    }, [loadPedidosFromBackend]);

    const handleVerDetalle = (id) => {
        alert(`Ver Detalle del Pedido: ${id}`);
    };

    const handleActualizarEstatus = async (id, newStatus) => {
        if (!window.confirm(`¿Estás seguro de marcar el pedido ${id} como ${newStatus.toUpperCase()}?`)) {
            return;
        }

        setFeedbackMessage(null);
        try {
            const updatedPedido = await updateOrderStatus(id, newStatus.toUpperCase());

            setPedidos(pedidos.map(p => p.id === id ? updatedPedido : p));
            setFeedbackMessage(`Pedido ${id} actualizado a ${newStatus.toUpperCase()} con éxito.`);
            setFeedbackVariant('success');
        } catch (err) {
            console.error(`Error al actualizar pedido ${id} a ${newStatus}:`, err);
            setFeedbackMessage(err.message || `Error al actualizar el pedido ${id} a ${newStatus}.`);
            setFeedbackVariant('danger');
        }
    };

    const handleDeleteOrder = async (id) => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar el pedido con ID ${id}?`)) {
            return;
        }

        setFeedbackMessage(null);
        try {
            await deleteOrder(id);
            setFeedbackMessage(`Pedido con ID ${id} eliminado con éxito.`);
            setFeedbackVariant('success');
            setPedidos(pedidos.filter(pedido => pedido.id !== id));
        } catch (err) {
            setFeedbackMessage(err.message || `Error al eliminar el pedido con ID ${id}.`);
            setFeedbackVariant('danger');
        }
    };

    return (
        <Container className="my-5">
            <Card className="shadow-lg">
                <Card.Header as="h2" className="text-center bg-info text-white py-3">
                    Listado de Pedidos
                </Card.Header>
                <Card.Body className="p-4">
                    {feedbackMessage && <Alert variant={feedbackVariant} className="mb-3 text-center">{feedbackMessage}</Alert>}

                    {isLoading && (
                        <div className="text-center my-4">
                            <Spinner animation="border" role="status" className="me-2" />
                            <span>Cargando pedidos...</span>
                        </div>
                    )}

                    {error && (
                        <Alert variant="danger" className="my-4 text-center">
                            <strong>Error:</strong> {error.message}
                            <Button variant="danger" className="ms-3" onClick={loadPedidosFromBackend}>Reintentar</Button>
                        </Alert>
                    )}

                    {!isLoading && !error && pedidos.length === 0 && (
                        <Alert variant="info" className="my-4 text-center">
                            No hay pedidos registrados aún. ¡Anímate a crear uno!
                        </Alert>
                    )}

                    {!isLoading && !error && pedidos.length > 0 && (
                        <div className="table-responsive">
                            <Table striped bordered hover className="align-middle text-center">
                                <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>HAWA(s)</th>
                                    <th>Tienda</th>
                                    <th>Cliente</th>
                                    <th>Vendedor</th>

                                    <th>Estatus</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pedidos.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>
                                            {p.detalles && p.detalles.length > 0 ? (
                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                    {p.detalles.map(d => (
                                                        <li key={d.id || d.hawa}>
                                                            {d.hawa} ({d.cantidad})
                                                            {d.producto && d.producto.nombre ? ` - ${d.producto.nombre}` : ''}
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : 'N/A'}
                                        </td>
                                        <td>{p.idTienda}</td>
                                        <td>{p.cliente && p.cliente.nombre ? p.cliente.nombre : 'N/A'}</td>
                                        <td>{p.nombreVendedor}</td>

                                        <td>
                                                <span className={`badge ${p.estatus === 'ENTREGADO' ? 'bg-success' : p.estatus === 'PENDIENTE' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                                                    {p.estatus.toUpperCase()}
                                                </span>
                                        </td>
                                        <td className="d-flex flex-column align-items-center justify-content-center h-100">
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="mb-2"
                                                onClick={() => handleVerDetalle(p.id)}
                                            >
                                                Ver Detalle
                                            </Button>
                                            {p.estatus === 'PENDIENTE' && (
                                                <>
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        className="mb-2"
                                                        onClick={() => handleActualizarEstatus(p.id, 'ENTREGADO')}
                                                    >
                                                        Marcar Entregado
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="mb-2"
                                                        onClick={() => handleActualizarEstatus(p.id, 'CANCELADO')}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ListadoPedidos;