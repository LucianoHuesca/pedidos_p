// src/pages/ListadoPedidos.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Spinner, Alert, Card } from 'react-bootstrap';


function ListadoPedidos() {
    // Simulamos un estado de carga, error y datos
    // En un caso real, esto vendría de un hook como useOrders()
    const [pedidos, setPedidos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simula la carga de datos desde una API
        const fetchPedidos = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Aquí harías tu llamada a la API real, por ejemplo:
                // const response = await fetch('/api/pedidos');
                // const data = await response.json();
                const mockData = [
                    { id: '001', hawa: 'HAWA123', tienda: 'T001', cliente: 'Juan Pérez', vendedor: 'Ana Gómez', estatus: 'pendiente', descuento: 10 },
                    { id: '002', hawa: 'HAWA456', tienda: 'T002', cliente: 'María López', vendedor: 'Carlos Ruiz', estatus: 'entregado', descuento: 0 },
                    { id: '003', hawa: 'HAWA789', tienda: 'T001', cliente: 'Pedro García', vendedor: 'Ana Gómez', estatus: 'cancelado', descuento: 5 },
                    { id: '004', hawa: 'HAWA101', tienda: 'T003', cliente: 'Luisa Fernández', vendedor: 'Pedro Márquez', estatus: 'pendiente', descuento: 15 },
                ];
                setPedidos(mockData);
            } catch (err) {
                setError(new Error('No se pudieron cargar los pedidos. Inténtalo de nuevo.'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    const handleVerDetalle = (id) => {
        alert(`Ver Detalle del Pedido: ${id}`);

    };

    const handleMarcarEntregado = (id) => {
        if (window.confirm(`¿Estás seguro de marcar el pedido ${id} como ENTREGADO?`)) {
            alert(`Pedido ${id} marcado como ENTREGADO`);
            setPedidos(pedidos.map(p => p.id === id ? { ...p, estatus: 'entregado' } : p));
        }
    };
    return (
        <Container className="my-5">
            <Card className="shadow-lg">
                <Card.Header as="h2" className="text-center bg-info text-white py-3">
                    Listado de Pedidos
                </Card.Header>
                <Card.Body className="p-4">

                    {isLoading && (
                        <div className="text-center my-4">
                            <Spinner animation="border" role="status" className="me-2" />
                            <span>Cargando pedidos...</span>
                        </div>
                    )}

                    {error && (
                        <Alert variant="danger" className="my-4">
                            <strong>Error:</strong> {error.message}
                        </Alert>
                    )}

                    {!isLoading && !error && pedidos.length === 0 && (
                        <Alert variant="info" className="my-4">
                            No hay pedidos registrados aún. ¡Anímate a crear uno!
                        </Alert>
                    )}

                    {!isLoading && !error && pedidos.length > 0 && (
                        <div className="table-responsive">
                            <Table striped bordered hover className="align-middle text-center">
                                <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>HAWA</th>
                                    <th>Tienda</th>
                                    <th>Cliente</th>
                                    <th>Vendedor</th>
                                    <th>Descuento</th>
                                    <th>Estatus</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pedidos.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>{p.hawa}</td>
                                        <td>{p.tienda}</td>
                                        <td>{p.cliente}</td>
                                        <td>{p.vendedor}</td>
                                        <td>{p.descuento}%</td>
                                        <td>

                                            <span className={`badge ${p.estatus === 'entregado' ? 'bg-success' : p.estatus === 'pendiente' ? 'bg-warning text-dark' : 'bg-danger'}`}>
                                                    {p.estatus.toUpperCase()}
                                                </span>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleVerDetalle(p.id)}
                                            >
                                                Ver Detalle
                                            </Button>
                                            {p.estatus === 'pendiente' && (
                                                <Button
                                                    variant="success"
                                                    size="sm"
                                                    onClick={() => handleMarcarEntregado(p.id)}
                                                >
                                                    Marcar Entregado
                                                </Button>
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