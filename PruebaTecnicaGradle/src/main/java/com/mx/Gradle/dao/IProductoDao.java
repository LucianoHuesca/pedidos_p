package com.mx.Gradle.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.Gradle.dominio.Producto;

import java.util.Optional;

public interface IProductoDao extends JpaRepository<Producto, Long> {
    Optional<Producto> findByHawa(String hawa);
}
