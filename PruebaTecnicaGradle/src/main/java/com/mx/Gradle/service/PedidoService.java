package com.mx.Gradle.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mx.Gradle.dao.IPedidoDao;
import com.mx.Gradle.dao.IProductoDao;
import com.mx.Gradle.dominio.DetallePedido;
import com.mx.Gradle.dominio.EstatusPedido;
import com.mx.Gradle.dominio.Pedido;
import com.mx.Gradle.dominio.Producto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private IPedidoDao dao;
    
    @Autowired
    private IProductoDao daoProducto;
    
    public Pedido guardarPedidoConValidacion(Pedido pedido) throws IllegalArgumentException {
        for (DetallePedido detalle : pedido.getDetalles()) {
            Producto producto = daoProducto.findById(detalle.getProducto().getId())
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado: " + detalle.getProducto().getId()));

            if (producto.getExistencias() < detalle.getCantidad()) {
                throw new IllegalArgumentException("Producto " + producto.getHawa() + " sin existencias suficientes.");
            }
        }

        // Descontar existencias (opcional: para bonus puedes hacerlo solo cuando se confirme el pedido)
        for (DetallePedido detalle : pedido.getDetalles()) {
            Producto producto = daoProducto.findById(detalle.getProducto().getId()).get();
            producto.setExistencias(producto.getExistencias() - detalle.getCantidad());
            daoProducto.save(producto);

            detalle.setPedido(pedido);
            detalle.setPrecioUnitario(producto.getPrecioLista());
            detalle.setDescuento(producto.getDescuento() != null ? producto.getDescuento() : 0.0);
        }

        pedido.setFechaCreacion(LocalDateTime.now());
        pedido.setEstatus(EstatusPedido.PENDIENTE);

        // Guardar pedido junto con detalles (Cascade ALL)
        return dao.save(pedido);
    }
//    public Pedido guardar(Pedido pedido) {
//        pedido.setFechaCreacion(LocalDateTime.now());
//        pedido.setEstatus(pedido.getEstatus() != null ? pedido.getEstatus() : EstatusPedido.PENDIENTE);
//        return dao.save(pedido);
//    }

    public List<Pedido> listarTodos() {
        return dao.findAll();
    }

    public Optional<Pedido> buscarPorId(Long id) {
        return dao.findById(id);
    }

    public Pedido actualizarEstatus(Long id, String nuevoEstatus) {
        Pedido pedido = dao.findById(id).orElseThrow();
        pedido.setEstatus(EstatusPedido.valueOf(nuevoEstatus));
        return dao.save(pedido);
    }
}

