import React from 'react';
import { Table, Button } from 'react-bootstrap';

function ListadoForm({ pedidos, handleVerDetalle, handleMarcarEntregado }) {
    return (
        <div className="table-responsive">
            <Table striped bordered hover className="align-middle text-center">
                <thead className="table-dark">
                <tr>
                    <th>ID Pedido</th>
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
                                <span className={`badge ${
                                    p.estatus === 'entregado' ? 'bg-success' :
                                        p.estatus === 'pendiente' ? 'bg-warning text-dark' :
                                            'bg-danger'
                                }`}>
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
    );
}

export default ListadoForm;
