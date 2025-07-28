package com.mx.Gradle.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.Gradle.dominio.Cliente;

import java.util.List;

public interface IClienteDao extends JpaRepository<Cliente, Long>{
    List<Cliente> findByNombre(String nombre);
}
