import React from 'react';
import { Container, Carousel } from 'react-bootstrap';

function Inicio() {
    return (
        <Container className="my-5 text-center">
            <h1 className="display-4 fw-bold text-primary mb-3">
                Bienvenido al Sistema de Pedidos más Patito
            </h1>
            <p className="lead text-muted mb-5">
                Que nuestro nombre no te engañe, best cuacklity ever.
            </p>
            <Carousel className="shadow-lg rounded mx-auto" style={{ maxWidth: '1000px' }}>

                <Carousel.Item>
                    <div className="d-flex justify-content-center align-items-center bg-light" style={{height: '700px', overflow: 'hidden'}}>
                        <img
                            className="d-block w-100 h-100 rounded object-fit-cover"
                            src="https://www.romacarabs.com/wp-content/uploads/2023/07/ford-ranger-raptor-curiosidades.jpg"
                            alt="Ford Ranger Raptor"
                        />
                    </div>
                    <Carousel.Caption className="bg-dark bg-opacity-75 p-2 rounded">
                        <h3>La Ford Raptor</h3>
                        <p>Fuerza y diseño inigualables.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="d-flex justify-content-center align-items-center bg-light" style={{height: '700px', overflow: 'hidden'}}>
                        <img
                            className="d-block w-100 h-100 rounded object-fit-cover"
                            src="https://cdn.autobild.es/sites/navi.axelspringer.es/public/bdc/dc/fotos/Jeep_Wrangler_2024_01.jpg?tf=3840x"
                            alt="Jeep Wrangler 2025"
                        />
                    </div>
                    <Carousel.Caption className="bg-dark bg-opacity-75 p-2 rounded">
                        <h3>Jeep Wrangler</h3>
                        <p>Conquista cualquier terreno.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <div className="d-flex justify-content-center align-items-center bg-light" style={{height: '700px', overflow: 'hidden'}}>
                        <img
                            className="d-block w-100 h-100 rounded object-fit-cover"
                            src="https://cdn.topgear.es/sites/navi.axelspringer.es/public/media/image/2022/07/apg-ford-bronco-prorunner-2768621.jpg?tf=1200x"
                            alt="Ford Bronco 2025"
                        />
                    </div>
                    <Carousel.Caption className="bg-dark bg-opacity-75 p-2 rounded">
                        <h3>Ford Bronco</h3>
                        <p>Potencia para tu día a día.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}

export default Inicio;