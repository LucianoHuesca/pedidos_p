import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PedidoForm({ onAgregar }) {
    const [formData, setFormData] = useState({
        hawa: '',
        tienda: '',
        cliente: '',
        vendedor: '',
        descuento: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
        onAgregar(formData);
        setFormData({
            hawa: '', tienda: '', cliente: '', vendedor: '', descuento: '',
        });
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <Card className="shadow-lg rounded-50" style={{ width: '100%', maxWidth: '600px' }}>
                <Card.Header as="h2" className="text-center bg-primary text-white">
                    Registrar Nuevo Pedido
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId="floatingHawa" label="HAWA del Producto" className="mb-3">
                            <Form.Control type="text" name="hawa" placeholder="HAWA del Producto" value={formData.hawa} onChange={handleChange} required />
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingTienda" label="ID de Tienda" className="mb-3">
                            <Form.Control type="text" name="tienda" placeholder="ID de Tienda" value={formData.tienda} onChange={handleChange} required />
                        </FloatingLabel>

                        <Row className="g-2 mb-3">
                            <Col md>
                                <FloatingLabel controlId="floatingCliente" label="Nombre del Cliente">
                                    <Form.Control type="text" name="cliente" placeholder="Nombre del Cliente" value={formData.cliente} onChange={handleChange} required />
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel controlId="floatingVendedor" label="Nombre del Vendedor">
                                    <Form.Control type="text" name="vendedor" placeholder="Nombre del Vendedor" value={formData.vendedor} onChange={handleChange} required />
                                </FloatingLabel>
                            </Col>
                        </Row>

                        <FloatingLabel controlId="floatingDescuento" label="Descuento (%)" className="mb-4">
                            <Form.Control type="number" name="descuento" placeholder="Descuento (%)" value={formData.descuento} onChange={handleChange} min="0" max="100" />
                        </FloatingLabel>

                        <div className="d-grid">
                            <Button variant="primary" type="submit" size="lg">
                                Confirmar Pedido
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PedidoForm;