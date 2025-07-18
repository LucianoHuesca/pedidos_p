package com.mx.Gradle.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.Gradle.dominio.DetallePedido;

public interface IDetallePedidoDao extends JpaRepository<DetallePedido, Long> {
    List<DetallePedido> findByPedidoId(Long pedidoId);
}
