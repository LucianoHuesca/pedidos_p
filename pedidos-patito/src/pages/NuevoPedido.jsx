import PedidoForm from '../components/PedidosForm.jsx';

function NuevoPedido({onAgregar}) {
    return (
        <div style={{ padding: '2rem' }}>
            <PedidoForm onAgregar={onAgregar} />
        </div>
    );

}
export default NuevoPedido;