package com.mx.Gradle.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mx.Gradle.dao.IProductoDao;
import com.mx.Gradle.dominio.Producto;

@Service
public class ProductoService {
	
	@Autowired
	private IProductoDao dao;
	
	public Optional<Producto> obtenerPorHawa(String hawa) {
        return dao.findByHawa(hawa);
    }
	
	public Producto guardarProducto(Producto producto) {
        return dao.save(producto);
    }
	
	public List<Producto> listarProductos(){
		return dao.findAll();
	}

}
