package com.mx.Gradle.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mx.Gradle.dao.IClienteDao;
import com.mx.Gradle.dominio.Cliente;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private IClienteDao dao;

    public Cliente guardar(Cliente cliente) {
        return dao.save(cliente);
    }

    public List<Cliente> listarTodos() {
        return dao.findAll();
    }

    public Optional<Cliente> buscarPorId(Long id) {
        return dao.findById(id);
    }
}

