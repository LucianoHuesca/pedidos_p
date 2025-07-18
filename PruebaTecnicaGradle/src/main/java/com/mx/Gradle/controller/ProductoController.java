package com.mx.Gradle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.Gradle.dominio.Producto;
import com.mx.Gradle.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService service;

    @GetMapping("/{hawa}")
    public ResponseEntity<?> obtenerPorHawa(@PathVariable String hawa) {
        return service.obtenerPorHawa(hawa)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Producto> crearProducto(@RequestBody Producto producto) {
        Producto creado = service.guardarProducto(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }
    
    @GetMapping
    public ResponseEntity<?> listarProductos(){
    	return ResponseEntity.ok(service.listarProductos());
    }
}