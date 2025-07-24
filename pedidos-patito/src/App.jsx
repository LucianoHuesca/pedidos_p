import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar.jsx';
import Inicio from './pages/Inicio.jsx';
import RegistrarPedido from './pages/RegistrarPedido.jsx';
import ListadoPagina from './pages/ListadoPagina.jsx';
//import {useState} from "react";

function App() {

    return (
        <>
            <NavBar />
            <div style={{ padding: '2rem' }}>
                <Routes>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/nuevo-pedido" element={<RegistrarPedido />} />
                    <Route path="/listado-pedidos" element={<ListadoPagina />} />
                </Routes>
            </div>
        </>
    );
}

export default App;