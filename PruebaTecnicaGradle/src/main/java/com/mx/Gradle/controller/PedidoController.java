package com.mx.Gradle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mx.Gradle.dominio.Pedido;
import com.mx.Gradle.service.PedidoService;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody Pedido pedido) {
        try {
            Pedido pedidoGuardado = pedidoService.guardarPedidoConValidacion(pedido);
            return ResponseEntity.ok(pedidoGuardado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> listar() {
        return ResponseEntity.ok(pedidoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtener(@PathVariable Long id) {
        return pedidoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/estatus")
    public ResponseEntity<Pedido> actualizarEstatus(@PathVariable("id") Long id, @RequestParam("estatus") String estatus) {
        return ResponseEntity.ok(pedidoService.actualizarEstatus(id, estatus.toUpperCase()));
    }
}
