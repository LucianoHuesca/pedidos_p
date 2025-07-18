import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar.jsx';
import LandingPage from './pages/LandingPage';
import NuevoPedido from './pages/NuevoPedido.jsx';
import ListadoPedidos from './pages/ListadoPedidos.jsx';
import {useState} from "react";

function App() {

    const [pedidos, setPedidos] = useState([]);

    const agregarPedido = (pedido) => {
        setPedidos(prev => [...prev, pedido]);
    };


    return (
        <>
            <NavBar />
            <div style={{ padding: '2rem' }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/nuevo-pedido" element={<NuevoPedido />} />
                    <Route path="/listado-pedidos" element={<ListadoPedidos />} />
                </Routes>
            </div>
        </>
    );
}

export default App;