import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import PatitoLogo from '../assets/images/patito_logo.png';

function NavBar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand to="/" className="d-flex align-items-center">
                    <img
                        src={PatitoLogo}
                        alt="Logo de Patito"
                        height="80"
                        className="me-2"
                    />
                    <span className="fw-bold fs-4">Patito Express</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link
                            as={NavLink}
                            to="/"
                            end
                            className={({ isActive }) => isActive ? 'text-info' : 'text-white'}
                            style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                        >
                            Inicio
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/nuevo-pedido"
                            className={({ isActive }) => isActive ? 'text-info' : 'text-white'}
                            style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                        >
                            Nuevo Pedido
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/listado-pedidos"
                            className={({ isActive }) => isActive ? 'text-info' : 'text-white'}
                            style={{ margin: '0 0.5rem', fontWeight: 'bold' }}
                        >
                            Listado de Pedidos
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;