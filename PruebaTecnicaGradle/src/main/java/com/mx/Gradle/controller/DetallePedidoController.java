package com.mx.Gradle.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mx.Gradle.dominio.DetallePedido;
import com.mx.Gradle.service.DetallePedidoService;

@RestController
@RequestMapping("/api/detalle-pedidos")
public class DetallePedidoController {

    @Autowired
    private DetallePedidoService detallePedidoService;

    @GetMapping
    public List<DetallePedido> listarTodos() {
        return detallePedidoService.listarTodos();
    }

    @GetMapping("/pedido/{pedidoId}")
    public List<DetallePedido> listarPorPedido(@PathVariable Long pedidoId) {
        return detallePedidoService.listarPorPedido(pedidoId);
    }

    @PostMapping
    public ResponseEntity<DetallePedido> guardar(@RequestBody DetallePedido detalle) {
        DetallePedido guardado = detallePedidoService.guardar(detalle);
        return ResponseEntity.ok(guardado);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DetallePedido> obtenerPorId(@PathVariable Long id) {
        DetallePedido detalle = detallePedidoService.obtenerPorId(id);
        if (detalle == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(detalle);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        detallePedidoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

