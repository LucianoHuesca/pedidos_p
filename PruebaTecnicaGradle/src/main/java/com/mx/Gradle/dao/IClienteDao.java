package com.mx.Gradle.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mx.Gradle.dominio.Cliente;

public interface IClienteDao extends JpaRepository<Cliente, Long>{

}
