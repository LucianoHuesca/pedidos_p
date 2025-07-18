package com.mx.Gradle.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mx.Gradle.dao.IDetallePedidoDao;
import com.mx.Gradle.dominio.DetallePedido;

@Service
public class DetallePedidoService {

    @Autowired
    private IDetallePedidoDao dao;

    public List<DetallePedido> listarTodos() {
        return dao.findAll();
    }

    public List<DetallePedido> listarPorPedido(Long pedidoId) {
        return dao.findByPedidoId(pedidoId);
    }

    public DetallePedido guardar(DetallePedido detallePedido) {
        return dao.save(detallePedido);
    }

    public DetallePedido obtenerPorId(Long id) {
        return dao.findById(id).orElse(null);
    }

    public void eliminar(Long id) {
    	dao.deleteById(id);
    }
}

