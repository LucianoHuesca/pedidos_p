import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';

import { useOrderForm } from '../hooks/useOrderForm.jsx';

function PedidoForm() {
    const {
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
    } = useOrderForm();

    const onHawaSearchSubmit = (e) => {
        e.preventDefault();
        handleSearchProduct();
    };

    const onFinalOrderSubmit = (e) => {
        e.preventDefault();
        submitOrder();
    };

    return (
        <Container className="d-flex align-items-center justify-content-center my-5">
            <Card className="shadow-lg rounded-5" style={{ width: '100%', maxWidth: '800px' }}>
                <Card.Header as="h2" className="text-center bg-primary text-white py-3 rounded-top-5">
                    Registrar Nuevo Pedido
                </Card.Header>
                <Card.Body className="p-4">
                    {orderSubmitSuccess && <Alert variant="success" className="mb-4 text-center">¡Pedido(s) registrado(s) con éxito!</Alert>}
                    {orderSubmitError && <Alert variant="danger" className="mb-4 text-center">{orderSubmitError}</Alert>}

                    <Card className="mb-4 bg-light shadow-sm">
                        <Card.Body>
                            <h4 className="mb-3 text-primary">1. Buscar y Agregar Productos</h4>
                            <Form onSubmit={onHawaSearchSubmit} className="mb-3">
                                <Row className="g-2">
                                    <Col md>
                                        <FloatingLabel controlId="floatingHawaSearch" label="Buscar HAWA">
                                            <Form.Control
                                                type="text"
                                                placeholder="HAWA del Producto"
                                                value={hawaSearch}
                                                onChange={handleHawaSearchChange}
                                                required
                                                disabled={isSearchingProduct}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                    <Col xs="auto" className="d-flex align-items-center">
                                        <Button
                                            variant="secondary"
                                            type="submit"
                                            disabled={isSearchingProduct || !hawaSearch.trim()}
                                        >
                                            {isSearchingProduct ? (
                                                <Spinner animation="border" size="sm" className="me-2" />
                                            ) : (
                                                'Buscar Producto'
                                            )}
                                        </Button>
                                    </Col>
                                </Row>
                                {productSearchError && <Alert variant="danger" className="mt-3">{productSearchError}</Alert>}
                            </Form>

                            {searchedProduct && (
                                <Alert variant="info" className="p-3">
                                    <h5>Producto Encontrado: <span className="text-primary">{searchedProduct.hawa}</span></h5>
                                    <p className="mb-1">Precio: ${searchedProduct.precioLista ? searchedProduct.precioLista.toFixed(2) : 'N/A'}</p>
                                    <p className="mb-1">Descuento Base: {searchedProduct.descuento ? `${searchedProduct.descuento}%` : '0%'}</p>
                                    <p className="mb-3 fw-bold">Existencias: <span className={searchedProduct.existencias > 0 ? 'text-success' : 'text-danger'}>{searchedProduct.existencias}</span></p>
                                    <Button
                                        variant="success"
                                        onClick={addProductToOrder}
                                        disabled={searchedProduct.existencias <= 0}
                                    >
                                        {searchedProduct.existencias > 0 ? 'Agregar al Pedido' : 'Sin Existencias'}
                                    </Button>
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>

                    <h4 className="mb-3 text-primary">2. Productos en el Pedido ({orderItems.length})</h4>
                    {orderItems.length === 0 ? (
                        <Alert variant="warning" className="text-center">Aún no has agregado productos al pedido.</Alert>
                    ) : (
                        <ListGroup className="mb-4 shadow-sm">
                            {orderItems.map((item) => (
                                <ListGroup.Item key={item.hawa} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>HAWA: {item.hawa}</strong> - Precio: ${item.precioLista ? item.precioLista.toFixed(2) : 'N/A'} - Desc.: {item.descuento ? `${item.descuento}%` : '0%'}
                                    </div>
                                    <Button variant="outline-danger" size="sm" onClick={() => removeProductFromOrder(item.hawa)}>
                                        Quitar
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                    <h4 className="mb-3 text-primary">3. Datos del Cliente y Vendedor</h4>
                    <Form onSubmit={onFinalOrderSubmit}>
                        <FloatingLabel controlId="floatingTienda" label="ID de Tienda" className="mb-3">
                            <Form.Control
                                type="text"
                                name="tienda"
                                placeholder="ID de Tienda"
                                value={formData.tienda}
                                onChange={handleFormChange}
                                required
                                disabled={isSubmittingOrder}
                            />
                        </FloatingLabel>

                        <Row className="g-2 mb-3">
                            <Col md>
                                <FloatingLabel controlId="floatingCliente" label="Nombre del Cliente">
                                    <Form.Control
                                        type="text"
                                        name="cliente"
                                        placeholder="Nombre del Cliente"
                                        value={formData.cliente}
                                        onChange={handleFormChange}
                                        required
                                        disabled={isSubmittingOrder}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingVendedor" label="Nombre del Vendedor">
                                    <Form.Control
                                        type="text"
                                        name="vendedor"
                                        placeholder="Nombre del Vendedor"
                                        value={formData.vendedor}
                                        onChange={handleFormChange}
                                        required
                                        disabled={isSubmittingOrder}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <FloatingLabel controlId="floatingDescuento" label="Descuento (%)" className="mb-4">
                            <Form.Control
                                type="number"
                                name="descuento"
                                placeholder="Descuento (%)"
                                value={formData.descuento}
                                onChange={handleFormChange}
                                min="0"
                                max="100"
                                disabled={isSubmittingOrder}
                            />
                        </FloatingLabel>

                        <div className="d-grid">
                            <Button
                                variant="primary"
                                type="submit"
                                size="lg"
                                disabled={isSubmittingOrder || orderItems.length === 0}
                            >
                                {isSubmittingOrder ? (
                                    <Spinner animation="border" size="sm" className="me-2" />
                                ) : null}
                                {isSubmittingOrder ? 'Generando Pedido(s)...' : 'Generar Pedido(s) Completo'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PedidoForm;