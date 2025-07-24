package com.mx.Gradle.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.Gradle.dominio.Pedido;

public interface IPedidoDao extends JpaRepository<Pedido, Long> {


}