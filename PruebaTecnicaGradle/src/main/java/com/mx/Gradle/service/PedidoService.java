package com.mx.Gradle.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mx.Gradle.dao.IPedidoDao;
import com.mx.Gradle.dao.IProductoDao;
import com.mx.Gradle.dominio.DetallePedido;
import com.mx.Gradle.dominio.EstatusPedido;
import com.mx.Gradle.dominio.Pedido;
import com.mx.Gradle.dominio.Producto;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    @Autowired
    private IPedidoDao dao;

    @Autowired
    private IProductoDao daoProducto;

    @Autowired(required = false)
    private HttpServletRequest request;

    @Transactional
    public Pedido guardarPedidoConValidacion(Pedido pedido) throws IllegalArgumentException {
        if (pedido.getDetalles() == null || pedido.getDetalles().isEmpty()) {
            throw new IllegalArgumentException("El pedido debe contener al menos un producto.");
        }

        for (DetallePedido detalle : pedido.getDetalles()) {
            detalle.setPedido(pedido);
        }

        for (DetallePedido detalle : pedido.getDetalles()) {
            Optional<Producto> optionalProducto = daoProducto.findByHawa(detalle.getHawa());

            if (!optionalProducto.isPresent()) {
                throw new IllegalArgumentException("Producto no encontrado para HAWA: " + detalle.getHawa());
            }
            Producto productoEnBD = optionalProducto.get();

            if (productoEnBD.getExistencias() < detalle.getCantidad()) {
                throw new IllegalArgumentException("Producto " + productoEnBD.getHawa() + " sin existencias suficientes.");
            }

            detalle.setProducto(productoEnBD);

            detalle.setPrecioUnitario(productoEnBD.getPrecioLista());
            detalle.setDescuento(productoEnBD.getDescuento() != null ? productoEnBD.getDescuento() : 0.0);

            productoEnBD.setExistencias(productoEnBD.getExistencias() - detalle.getCantidad());
            daoProducto.save(productoEnBD);
        }

        pedido.setFechaCreacion(LocalDateTime.now());
        pedido.setEstatus(EstatusPedido.PENDIENTE);

        if (request != null) {
            pedido.setIpUsuario(request.getRemoteAddr());
        } else {
            pedido.setIpUsuario("UNKNOWN_IP");
        }

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

